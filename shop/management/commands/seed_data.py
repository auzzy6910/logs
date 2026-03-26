from django.core.management.base import BaseCommand
from shop.models import CategoryGroup, Category, Product
import random


class Command(BaseCommand):
    help = 'Seed the database with sample digital products'

    def handle(self, *args, **options):
        # Create category groups
        groups_data = [
            {'name': 'SOFTWARE', 'slug': 'software', 'order': 1},
            {'name': 'GAMING', 'slug': 'gaming', 'order': 2},
            {'name': 'EDUCATION', 'slug': 'education', 'order': 3},
            {'name': 'MEDIA', 'slug': 'media', 'order': 4},
        ]

        for gd in groups_data:
            group, created = CategoryGroup.objects.get_or_create(
                slug=gd['slug'],
                defaults={'name': gd['name'], 'order': gd['order']}
            )
            if created:
                self.stdout.write(f'Created group: {gd["name"]}')

        # Create categories
        software = CategoryGroup.objects.get(slug='software')
        gaming = CategoryGroup.objects.get(slug='gaming')
        education = CategoryGroup.objects.get(slug='education')
        media = CategoryGroup.objects.get(slug='media')

        categories_data = [
            # Software
            {'name': 'Productivity Tools', 'group': software},
            {'name': 'Design Software', 'group': software},
            {'name': 'Developer Tools', 'group': software},
            {'name': 'Security Software', 'group': software},
            {'name': 'Cloud Services', 'group': software},
            # Gaming
            {'name': 'PC Games', 'group': gaming},
            {'name': 'Console Games', 'group': gaming},
            {'name': 'Mobile Games', 'group': gaming},
            {'name': 'Game Credits', 'group': gaming},
            {'name': 'Gaming Subscriptions', 'group': gaming},
            # Education
            {'name': 'Online Courses', 'group': education},
            {'name': 'E-Books', 'group': education},
            {'name': 'Tutorial Packs', 'group': education},
            {'name': 'Certification Vouchers', 'group': education},
            # Media
            {'name': 'Stock Photos', 'group': media},
            {'name': 'Music Licenses', 'group': media},
            {'name': 'Video Templates', 'group': media},
            {'name': 'Font Packs', 'group': media},
        ]

        created_categories = []
        for cd in categories_data:
            cat, created = Category.objects.get_or_create(
                name=cd['name'],
                group=cd['group'],
            )
            created_categories.append(cat)
            if created:
                self.stdout.write(f'Created category: {cd["name"]}')

        # Create products
        products_data = {
            'Productivity Tools': [
                ('Office Suite Pro', 'Full office suite with word processor, spreadsheet, and presentation tools', 49.99),
                ('Project Manager Plus', 'Advanced project management software with Gantt charts and team collaboration', 79.99),
                ('Note-Taking Ultimate', 'Cross-platform note-taking app with cloud sync and OCR', 29.99),
                ('Time Tracker Pro', 'Automated time tracking and invoicing software', 39.99),
                ('File Organizer X', 'AI-powered file organization and search tool', 24.99),
            ],
            'Design Software': [
                ('Vector Studio', 'Professional vector graphics editor', 99.99),
                ('Photo Editor Pro', 'Advanced photo editing with AI-powered tools', 69.99),
                ('UI Kit Builder', 'Complete UI design toolkit with 500+ components', 44.99),
                ('3D Modeler Lite', 'Entry-level 3D modeling software', 59.99),
                ('Color Palette Generator', 'AI-powered color scheme generator for designers', 19.99),
            ],
            'Developer Tools': [
                ('Code Editor Premium', 'Feature-rich code editor with AI code completion', 89.99),
                ('API Testing Suite', 'Comprehensive API testing and documentation tool', 54.99),
                ('Database Manager Pro', 'Multi-database management and query tool', 64.99),
                ('Git GUI Client', 'Visual Git client with merge conflict resolver', 34.99),
                ('Docker Dashboard', 'Container management and monitoring dashboard', 44.99),
            ],
            'Security Software': [
                ('VPN Premium 1-Year', 'High-speed VPN with 100+ server locations', 59.99),
                ('Password Manager Pro', 'Encrypted password manager with breach alerts', 29.99),
                ('Antivirus Ultimate', 'Real-time protection with ransomware shield', 49.99),
                ('Firewall Plus', 'Advanced firewall with intrusion detection', 39.99),
            ],
            'Cloud Services': [
                ('Cloud Storage 1TB', '1TB cloud storage with file versioning', 99.99),
                ('Email Hosting Pro', 'Professional email hosting for businesses', 49.99),
                ('CDN Service Plan', 'Global content delivery network subscription', 79.99),
            ],
            'PC Games': [
                ('Space Explorer Deluxe', 'Open-world space exploration RPG', 59.99),
                ('Racing Thunder 2026', 'High-octane racing simulator', 49.99),
                ('Strategy Empire', 'Turn-based strategy game with 200+ missions', 39.99),
                ('Puzzle Master Collection', 'Collection of 500 puzzle games', 19.99),
                ('FPS Arena Gold', 'Competitive first-person shooter', 44.99),
                ('City Builder Pro', 'Detailed city simulation game', 34.99),
            ],
            'Console Games': [
                ('Adventure Quest HD', 'Action-adventure game remastered', 54.99),
                ('Sports League 2026', 'Multi-sport simulation game', 59.99),
                ('Horror Mansion VR', 'Virtual reality horror experience', 39.99),
                ('Platformer Legends', 'Classic platformer with modern graphics', 29.99),
            ],
            'Mobile Games': [
                ('Casual Puzzle Pack', 'Bundle of 10 casual puzzle games', 9.99),
                ('RPG Heroes Mobile', 'Full RPG experience on mobile', 14.99),
                ('Tower Defense Elite', 'Strategic tower defense game', 7.99),
            ],
            'Game Credits': [
                ('Game Store $25 Gift Card', 'Digital gift card for game purchases', 25.00),
                ('Game Store $50 Gift Card', 'Digital gift card for game purchases', 50.00),
                ('Game Store $100 Gift Card', 'Digital gift card for game purchases', 100.00),
                ('In-Game Currency 1000 Coins', 'Virtual currency for popular games', 9.99),
                ('In-Game Currency 5000 Coins', 'Virtual currency for popular games', 44.99),
            ],
            'Gaming Subscriptions': [
                ('Gaming Pass Monthly', 'Access to 100+ games for one month', 14.99),
                ('Gaming Pass Annual', 'Access to 100+ games for one year', 149.99),
                ('Online Multiplayer 3-Month', '3-month online multiplayer subscription', 24.99),
            ],
            'Online Courses': [
                ('Python Masterclass', 'Complete Python programming course with projects', 89.99),
                ('Web Development Bootcamp', 'Full-stack web development course', 129.99),
                ('Data Science Fundamentals', 'Introduction to data science and machine learning', 99.99),
                ('Digital Marketing Pro', 'Complete digital marketing certification course', 79.99),
                ('UI/UX Design Course', 'Learn UI/UX design from scratch', 69.99),
            ],
            'E-Books': [
                ('JavaScript: The Complete Guide', 'Comprehensive JavaScript reference book', 24.99),
                ('Clean Code Principles', 'Best practices for writing maintainable code', 19.99),
                ('System Design Handbook', 'Guide to designing scalable systems', 34.99),
                ('AI & Machine Learning Basics', 'Introduction to AI concepts', 29.99),
            ],
            'Tutorial Packs': [
                ('React Tutorial Bundle', '50+ React tutorials with source code', 39.99),
                ('DevOps Essentials Pack', 'Docker, Kubernetes, and CI/CD tutorials', 49.99),
                ('Mobile App Dev Kit', 'iOS and Android development tutorials', 54.99),
            ],
            'Certification Vouchers': [
                ('Cloud Architect Cert', 'Exam voucher for cloud architecture certification', 299.99),
                ('Security Professional Cert', 'Exam voucher for cybersecurity certification', 349.99),
                ('Data Engineer Cert', 'Exam voucher for data engineering certification', 249.99),
            ],
            'Stock Photos': [
                ('Nature Photo Pack (100)', '100 high-resolution nature photographs', 29.99),
                ('Business Photo Pack (50)', '50 professional business photographs', 24.99),
                ('Food Photography Bundle', '75 food and restaurant photographs', 19.99),
                ('Travel Photography Set', '100 travel destination photographs', 34.99),
            ],
            'Music Licenses': [
                ('Background Music Pack', '20 royalty-free background music tracks', 49.99),
                ('Sound Effects Bundle', '200 professional sound effects', 39.99),
                ('Podcast Intro Music', '10 podcast intro/outro music tracks', 19.99),
            ],
            'Video Templates': [
                ('Social Media Templates', '50 video templates for social media', 44.99),
                ('Corporate Video Pack', '25 professional corporate video templates', 59.99),
                ('Motion Graphics Kit', '100 motion graphics elements', 69.99),
            ],
            'Font Packs': [
                ('Modern Sans-Serif Collection', '25 modern sans-serif fonts', 29.99),
                ('Handwriting Font Bundle', '15 handwritten style fonts', 19.99),
                ('Display Font Pack', '20 decorative display fonts', 24.99),
            ],
        }

        for cat_name, products in products_data.items():
            try:
                category = Category.objects.get(name=cat_name)
                for name, desc, price in products:
                    product, created = Product.objects.get_or_create(
                        name=name,
                        category=category,
                        defaults={
                            'description': desc,
                            'price': price,
                        }
                    )
                    if created:
                        self.stdout.write(f'Created product: {name}')
            except Category.DoesNotExist:
                self.stdout.write(self.style.WARNING(f'Category not found: {cat_name}'))

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
