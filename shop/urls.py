from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('login/', views.login_view, name='login'),
    path('sign-up/', views.signup_view, name='signup'),
    path('logout/', views.logout_view, name='logout'),
    path('categories/', views.categories_view, name='categories'),
    path('categories/<uuid:category_id>/', views.category_detail_view, name='category_detail'),
    path('cart/', views.cart_view, name='cart'),
    path('cart/add/<uuid:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('cart/remove/<int:item_id>/', views.remove_from_cart, name='remove_from_cart'),
    path('checkout/', views.checkout_view, name='checkout'),
    path('my-orders/', views.my_orders_view, name='my_orders'),
    path('my-orders/<uuid:order_id>/', views.order_detail_view, name='order_detail'),
    path('transactions/', views.transactions_view, name='transactions'),
    path('top-up/', views.topup_view, name='topup'),
]
