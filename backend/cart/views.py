from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem, Product, User
from django.db import transaction
from firebase_admin import auth as firebase_auth

def get_or_create_cart(request):
    if not request.session.session_key:
        request.session.create()
    
    # Store a dummy value in the session to ensure Django saves it and sends the session cookie
    request.session['has_cart'] = True
    
    session_key = request.session.session_key
    user_id = request.session.get('user_id')
    
    if user_id:
        user_cart = Cart.objects.filter(user_id=user_id).first()
        if user_cart:
            # User already has a cart. Remove any anonymous cart holding this session ID
            Cart.objects.filter(session_id=session_key).exclude(id=user_cart.id).delete()
            if user_cart.session_id != session_key:
                user_cart.session_id = session_key
                user_cart.save()
            return user_cart
        else:
            # User doesn't have a cart. See if there's an anon cart to claim
            anon_cart = Cart.objects.filter(session_id=session_key, user__isnull=True).first()
            if anon_cart:
                anon_cart.user_id = user_id
                anon_cart.save()
                return anon_cart
            else:
                cart = Cart.objects.create(user_id=user_id, session_id=session_key)
                return cart
    else:
        cart, created = Cart.objects.get_or_create(session_id=session_key, user__isnull=True)
        return cart

def get_product_image(product):
    images = product.images.all()
    if not images:
        return None
    primary = [img for img in images if img.is_primary]
    if primary:
        return primary[0].image_url
    return images[0].image_url

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_cart(request):
    try:
        cart = get_or_create_cart(request)
        items = cart.items.select_related('product')
        
        items_total = sum(float(item.product.price) * item.quantity for item in items)
        delivery_charge = 25 if items_total > 0 else 0
        handling_charge = 2 if items_total > 0 else 0
        small_cart_charge = 20 if 0 < items_total < 500 else 0
        grand_total = items_total + delivery_charge + handling_charge + small_cart_charge
        
        cart_data = {
            'items': [
                {
                    'id': item.id,
                    'product_id': item.product.id,
                    'name': item.product.name,
                    'price': float(item.product.price),
                    'quantity': item.quantity,
                    'stock_quantity': item.product.stock_quantity,
                    'image': get_product_image(item.product),
                } for item in items
            ],
            'bill_details': {
                'items_total': float(items_total),
                'delivery_charge': delivery_charge,
                'handling_charge': handling_charge,
                'small_cart_charge': small_cart_charge,
                'grand_total': float(grand_total)
            }
        }
        return Response(cart_data)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({'error': str(e)}, status=500)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
@transaction.atomic
def add_to_cart(request):
    try:
        cart = get_or_create_cart(request)
        product_id = request.data.get('product_id')
        
        if not product_id:
            return Response({'error': 'product_id is required'}, status=status.HTTP_400_BAD_REQUEST)
            
        product = get_object_or_404(Product, id=product_id)
        
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product, defaults={'quantity': 0})
        
        if cart_item.quantity + 1 > product.stock_quantity:
            return Response({'error': 'low product quantity'}, status=status.HTTP_400_BAD_REQUEST)
            
        cart_item.quantity += 1
        cart_item.save()
        
        return Response({'message': 'Product added to cart'})
    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({'error': str(e)}, status=500)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
@transaction.atomic
def update_cart(request):
    try:
        cart = get_or_create_cart(request)
        product_id = request.data.get('product_id')
        action = request.data.get('action')
        
        if not product_id or not action:
            return Response({'error': 'product_id and action are required'}, status=status.HTTP_400_BAD_REQUEST)
            
        cart_item = get_object_or_404(CartItem, cart=cart, product_id=product_id)
        product = cart_item.product
        
        if action == 'increment':
            if cart_item.quantity + 1 > product.stock_quantity:
                return Response({'error': 'low product quantity'}, status=status.HTTP_400_BAD_REQUEST)
            cart_item.quantity += 1
            cart_item.save()
        elif action == 'decrement':
            cart_item.quantity -= 1
            if cart_item.quantity <= 0:
                cart_item.delete()
            else:
                cart_item.save()
                
        return Response({'message': f'Cart updated ({action})'})
    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({'error': str(e)}, status=500)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def phone_login(request):
    try:
        id_token = request.data.get('idToken')
        if not id_token:
            return Response({'error': 'idToken is required'}, status=400)
            
        decoded_token = firebase_auth.verify_id_token(id_token, clock_skew_seconds=60)
        phone = decoded_token.get('phone_number')
        
        if not phone:
            return Response({'error': 'No phone number in token'}, status=400)
            
        try:
            user = User.objects.get(phone=phone)
            if not request.session.session_key:
                request.session.create()
            
            request.session['has_cart'] = True
            request.session['user_id'] = user.id
            
            cart = get_or_create_cart(request)
                
            return Response({'message': 'Login successful', 'user': {'name': user.name, 'phone': user.phone}})
        except User.DoesNotExist:
            return Response({'error': 'User not found, complete profile', 'status': 'needs_profile', 'phone': phone}, status=202)
            
    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({'error': str(e)}, status=500)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
@transaction.atomic
def complete_profile(request):
    try:
        id_token = request.data.get('idToken')
        name = request.data.get('name')
        email = request.data.get('email')
        
        if not all([id_token, name, email]):
            return Response({'error': 'idToken, name, and email are required'}, status=400)
            
        decoded_token = firebase_auth.verify_id_token(id_token, clock_skew_seconds=60)
        phone = decoded_token.get('phone_number')
        
        if User.objects.filter(phone=phone).exists():
            return Response({'error': 'User already exists'}, status=400)
            
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already in use'}, status=400)
            
        # Passing a dummy password to satisfy potential 'NOT NULL' database constraints
        user = User.objects.create(name=name, email=email, phone=phone, password="firebase_phone_auth")
        
        if not request.session.session_key:
            request.session.create()
        request.session['has_cart'] = True
        request.session['user_id'] = user.id
        
        cart = get_or_create_cart(request)
            
        return Response({'message': 'Profile created successfully', 'user': {'name': user.name, 'phone': user.phone}}, status=201)
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({'error': str(e)}, status=500)
