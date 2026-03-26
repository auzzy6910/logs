from .models import CartItem, CategoryGroup


def cart_count(request):
    if request.user.is_authenticated:
        count = CartItem.objects.filter(user=request.user).count()
        balance = request.user.profile.balance if hasattr(request.user, 'profile') else 0
        groups = CategoryGroup.objects.all()
        return {
            'cart_item_count': count,
            'user_balance': balance,
            'sidebar_groups': groups,
        }
    return {
        'cart_item_count': 0,
        'user_balance': 0,
        'sidebar_groups': [],
    }
