import { Router } from 'express';
import directus, { assetUrl } from '../services/directus.js';

const router = Router();

// GET /api/search?q=keyword — search posts by title or content
router.get('/', async (req, res, next) => {
    try {
        const { q, page = 1, limit = 10 } = req.query;

        if (!q || q.trim().length === 0) {
            return res.json({ posts: [], meta: { page: 1, limit: 10, totalCount: 0, totalPages: 0 } });
        }

        const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

        const { data } = await directus.get('/items/posts', {
            params: {
                filter: {
                    _and: [
                        { status: { _eq: 'published' } },
                        {
                            _or: [
                                { title: { _icontains: q.trim() } },
                                { content: { _icontains: q.trim() } },
                                { excerpt: { _icontains: q.trim() } },
                            ],
                        },
                    ],
                },
                sort: ['-date_published'],
                limit: parseInt(limit, 10),
                offset,
                fields: [
                    'id', 'title', 'slug', 'excerpt', 'featured_image',
                    'date_published',
                    'author.id', 'author.first_name', 'author.last_name',
                    'categories.categories_id.id', 'categories.categories_id.name', 'categories.categories_id.slug',
                ].join(','),
                meta: 'filter_count',
            },
        });

        const posts = (data.data || []).map((post) => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            featuredImage: assetUrl(
                typeof post.featured_image === 'object'
                    ? post.featured_image?.id
                    : post.featured_image,
                { width: 400, quality: 75 }
            ),
            datePublished: post.date_published,
            author: post.author
                ? { id: post.author.id, firstName: post.author.first_name, lastName: post.author.last_name }
                : null,
            categories: (post.categories || []).map((c) => {
                const cat = c.categories_id;
                return cat ? { id: cat.id, name: cat.name, slug: cat.slug } : null;
            }).filter(Boolean),
        }));

        const totalCount = data.meta?.filter_count || 0;

        res.json({
            posts,
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
