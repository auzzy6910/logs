# DigitalShop

A digital goods marketplace built with Django and Bootstrap 5. Features an orange and white theme.

## Features

- **User Authentication**: Sign up, login, logout
- **Product Catalog**: Browse digital products organized by category groups (Software, Gaming, Education, Media)
- **Shopping Cart**: Add/remove products, view cart total
- **Checkout**: Purchase items using account balance
- **Balance System**: Top up account balance
- **Order History**: View past orders with details
- **Transaction Log**: Track all top-ups and purchases
- **Admin Panel**: Full Django admin for managing products, categories, users, and orders

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Seed sample data
python manage.py seed_data

# Create a superuser (optional, for admin access)
python manage.py createsuperuser

# Start the server
python manage.py runserver
```

Then visit http://localhost:8000/ to use the app.

## Admin

Access the Django admin at http://localhost:8000/admin/ to manage:
- Category Groups & Categories
- Products
- User Profiles & Balances
- Orders & Transactions
