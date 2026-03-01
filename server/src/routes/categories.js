import { Router } from 'express';
import directus from '../services/directus.js';

const router = Router();

// GET /api/categories — list all categories
router.get('/', async (_req, res, next) => {
    try {
        const { data } = await directus.get('/items/categories', {
            params: {
                sort: ['name'],
                fields: 'id,name,slug,description',
            },
        });

        res.json({ categories: data.data || [] });
    } catch (err) {
        next(err);
    }
});

// GET /api/categories/:slug — posts in a category
router.get('/:slug', async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

        // First, get the category
        const { data: catData } = await directus.get('/items/categories', {
            params: {
                filter: { slug: { _eq: req.params.slug } },
                limit: 1,
                fields: 'id,name,slug,description',
            },
        });

        const categories = catData.data || [];
        if (categories.length === 0) {
            return res.status(404).json({ error: { message: 'Category not found' } });
        }

        const category = categories[0];

        // Then get posts in this category
        const { data: postsData } = await directus.get('/items/posts', {
            params: {
                filter: {
                    status: { _eq: 'published' },
                    categories: { categories_id: { _eq: category.id } },
                },
                sort: ['-date_published'],
                limit: parseInt(limit, 10),
                offset,
                fields: [
                    'id', 'title', 'slug', 'excerpt', 'featured_image',
                    'date_published', 'author.id', 'author.first_name', 'author.last_name',
                ].join(','),
                meta: 'filter_count',
            },
        });

        const totalCount = postsData.meta?.filter_count || 0;

        res.json({
            category,
            posts: postsData.data || [],
            meta: {
                page: parseInt(page, 10),
                limit: parseInt(limit, 10),
                totalCount,
                totalPages: Math.ceil(totalCount / parseInt(limit, 10)),
            },
        });
    } catch (err) {
        next(err);
    }
});

export default router;
