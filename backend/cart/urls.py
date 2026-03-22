from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_cart, name='get_cart'),
    path('add/', views.add_to_cart, name='add_to_cart'),
    path('update/', views.update_cart, name='update_cart'),
    path('auth/phone/', views.phone_login, name='phone_login'),
    path('auth/register/', views.complete_profile, name='complete_profile'),
]
