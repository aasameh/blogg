# Directus CMS Configuration
# ==========================
# This folder will contain the Directus instance.
#
# Setup Instructions:
# 1. cd directus
# 2. npx create-directus-project .
#    - Choose PostgreSQL as the database
#    - Enter your database credentials from .env
# 3. After setup, configure collections via the Admin UI:
#
# Collections to create:
# ----------------------
# posts:
#   - id (auto UUID)
#   - title (string, required)
#   - slug (string, unique, required)
#   - content (WYSIWYG, required)
#   - excerpt (text)
#   - featured_image (file/image)
#   - status (dropdown: draft/published, default: draft)
#   - date_published (datetime)
#   - author (M2O -> directus_users)
#
# categories:
#   - id (auto UUID)
#   - name (string, required)
#   - slug (string, unique, required)
#   - description (text)
#
# tags:
#   - id (auto UUID)
#   - name (string, required)
#   - slug (string, unique, required)
#
# post_categories (junction):
#   - id (auto)
#   - posts_id (M2O -> posts)
#   - categories_id (M2O -> categories)
#
# post_tags (junction):
#   - id (auto)
#   - posts_id (M2O -> posts)
#   - tags_id (M2O -> tags)
#
# Roles:
# ------
# Admin    - Full access
# Author   - CRUD own posts
# Public   - Read published posts, categories, tags
