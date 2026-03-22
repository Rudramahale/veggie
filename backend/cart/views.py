from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem, Product
from django.db import transaction

def get_or_create_cart(request):
    if not request.session.session_key:
        request.session.create()
    
    # Store a dummy value in the session to ensure Django saves it and sends the session cookie
    request.session['has_cart'] = True
    
    cart, created = Cart.objects.get_or_create(session_id=request.session.session_key)
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
