from decimal import Decimal
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.paginator import Paginator
from django.db import transaction
from django.db.models import Q

from .models import (
    UserProfile, CategoryGroup, Category, Product,
    CartItem, Order, OrderItem, Transaction
)
from .forms import SignUpForm


def login_view(request):
    if request.user.is_authenticated:
        return redirect('home')
    if request.method == 'POST':
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Invalid username or password.')
    return render(request, 'shop/login.html')


def signup_view(request):
    if request.user.is_authenticated:
        return redirect('home')
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            UserProfile.objects.create(user=user)
            login(request, user)
            return redirect('home')
    else:
        form = SignUpForm()
    return render(request, 'shop/signup.html', {'form': form})


def logout_view(request):
    logout(request)
    return redirect('login')


@login_required
def home_view(request):
    if not hasattr(request.user, 'profile'):
        UserProfile.objects.create(user=request.user)
    featured_products = Product.objects.filter(is_available=True).order_by('-created_at')[:8]
    return render(request, 'shop/home.html', {
        'featured_products': featured_products,
    })


@login_required
def categories_view(request):
    if not hasattr(request.user, 'profile'):
        UserProfile.objects.create(user=request.user)
    query = request.GET.get('q', '')
    group_slug = request.GET.get('group', '')
    groups = CategoryGroup.objects.prefetch_related('categories').all()
    if group_slug:
        groups = groups.filter(slug=group_slug)
    if query:
        groups = groups.filter(categories__name__icontains=query).distinct()
    return render(request, 'shop/categories.html', {
        'groups': groups,
        'query': query,
        'selected_group': group_slug,
    })


@login_required
def category_detail_view(request, category_id):
    if not hasattr(request.user, 'profile'):
        UserProfile.objects.create(user=request.user)
    category = get_object_or_404(Category, id=category_id)
    products = category.products.filter(is_available=True)
    return render(request, 'shop/category_detail.html', {
        'category': category,
        'products': products,
    })


@login_required
def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id, is_available=True)
    CartItem.objects.get_or_create(user=request.user, product=product)
    messages.success(request, f'Added "{product.name}" to cart.')
    return redirect('category_detail', category_id=product.category.id)


@login_required
def remove_from_cart(request, item_id):
    cart_item = get_object_or_404(CartItem, id=item_id, user=request.user)
    cart_item.delete()
    messages.success(request, 'Item removed from cart.')
    return redirect('cart')


@login_required
def cart_view(request):
    if not hasattr(request.user, 'profile'):
        UserProfile.objects.create(user=request.user)
    cart_items = CartItem.objects.filter(user=request.user).select_related('product', 'product__category')
    total_price = sum(item.product.price for item in cart_items)
    return render(request, 'shop/cart.html', {
        'cart_items': cart_items,
        'total_price': total_price,
    })


@login_required
@transaction.atomic
def checkout_view(request):
    if request.method != 'POST':
        return redirect('cart')

    profile = request.user.profile
    cart_items = CartItem.objects.filter(user=request.user).select_related('product', 'product__category')

    if not cart_items.exists():
        messages.error(request, 'Your cart is empty.')
        return redirect('cart')

    total_price = sum(item.product.price for item in cart_items)

    if profile.balance < total_price:
        messages.error(request, 'Insufficient balance. Please top up your account.')
        return redirect('cart')

    order = Order.objects.create(
        user=request.user,
        total_price=total_price,
        quantity=cart_items.count(),
    )

    for cart_item in cart_items:
        OrderItem.objects.create(
            order=order,
            product_name=cart_item.product.name,
            product_description=cart_item.product.description,
            category_name=cart_item.product.category.name,
            price=cart_item.product.price,
        )
        cart_item.product.is_available = False
        cart_item.product.save()

    profile.balance -= total_price
    profile.save()

    Transaction.objects.create(
        user=request.user,
        amount=total_price,
        transaction_type='purchase',
        status='completed',
    )

    cart_items.delete()
    messages.success(request, f'Order placed successfully! Total: ${total_price}')
    return redirect('my_orders')


@login_required
def my_orders_view(request):
    if not hasattr(request.user, 'profile'):
        UserProfile.objects.create(user=request.user)
    orders_list = Order.objects.filter(user=request.user)
    paginator = Paginator(orders_list, 20)
    page_number = request.GET.get('page')
    orders = paginator.get_page(page_number)
    return render(request, 'shop/my_orders.html', {'orders': orders})


@login_required
def order_detail_view(request, order_id):
    order = get_object_or_404(Order, id=order_id, user=request.user)
    return render(request, 'shop/order_detail.html', {'order': order})


@login_required
def transactions_view(request):
    if not hasattr(request.user, 'profile'):
        UserProfile.objects.create(user=request.user)
    transactions_list = Transaction.objects.filter(user=request.user)
    paginator = Paginator(transactions_list, 20)
    page_number = request.GET.get('page')
    transactions = paginator.get_page(page_number)
    return render(request, 'shop/transactions.html', {'transactions': transactions})


@login_required
def topup_view(request):
    if not hasattr(request.user, 'profile'):
        UserProfile.objects.create(user=request.user)
    if request.method == 'POST':
        try:
            amount = Decimal(request.POST.get('amount', '0'))
            if amount <= 0:
                messages.error(request, 'Please enter a valid amount.')
                return redirect('topup')
            if amount > 10000:
                messages.error(request, 'Maximum top-up amount is $10,000.')
                return redirect('topup')

            profile = request.user.profile
            profile.balance += amount
            profile.save()

            Transaction.objects.create(
                user=request.user,
                amount=amount,
                transaction_type='topup',
                status='completed',
            )

            messages.success(request, f'Successfully topped up ${amount}!')
            return redirect('topup')
        except (ValueError, TypeError):
            messages.error(request, 'Please enter a valid amount.')

    return render(request, 'shop/topup.html')


@login_required
def product_detail_view(request, product_id):
    if not hasattr(request.user, 'profile'):
        UserProfile.objects.create(user=request.user)
    product = get_object_or_404(Product, id=product_id)
    in_cart = CartItem.objects.filter(user=request.user, product=product).exists()
    return render(request, 'shop/product_detail.html', {
        'product': product,
        'in_cart': in_cart,
    })


@login_required
def profile_view(request):
    if not hasattr(request.user, 'profile'):
        UserProfile.objects.create(user=request.user)
    profile = request.user.profile
    total_orders = Order.objects.filter(user=request.user).count()
    total_spent = sum(
        order.total_price for order in Order.objects.filter(user=request.user)
    )
    return render(request, 'shop/profile.html', {
        'profile': profile,
        'total_orders': total_orders,
        'total_spent': total_spent,
    })


@login_required
def search_view(request):
    if not hasattr(request.user, 'profile'):
        UserProfile.objects.create(user=request.user)
    query = request.GET.get('q', '')
    products = Product.objects.none()
    if query:
        products = Product.objects.filter(
            Q(name__icontains=query) | Q(description__icontains=query),
            is_available=True,
        ).select_related('category')
    return render(request, 'shop/search.html', {
        'query': query,
        'products': products,
    })
