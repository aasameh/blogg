import { Router } from 'express';
import directus, { assetUrl } from '../services/directus.js';

const router = Router();

// Transform a Directus post into a clean blog post object
const transformPost = (post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    featuredImage: assetUrl(
        typeof post.featured_image === 'object'
            ? post.featured_image?.id
            : post.featured_image,
        { width: 800, quality: 80 }
    ),
    status: post.status,
    datePublished: post.date_published,
    dateCreated: post.date_created,
    dateUpdated: post.date_updated,
    author: post.author
        ? {
            id: post.author.id,
            firstName: post.author.first_name,
            lastName: post.author.last_name,
            avatar: assetUrl(post.author.avatar, { width: 100, quality: 80 }),
        }
        : null,
    categories: (post.categories || []).map((c) => {
        const cat = c.categories_id;
        return cat ? { id: cat.id, name: cat.name, slug: cat.slug } : null;
    }).filter(Boolean),
    tags: (post.tags || []).map((t) => {
        const tag = t.tags_id;
        return tag ? { id: tag.id, name: tag.name, slug: tag.slug } : null;
    }).filter(Boolean),
});

// GET /api/posts — list published posts (paginated)
router.get('/', async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

        const { data } = await directus.get('/items/posts', {
            params: {
                filter: { status: { _eq: 'published' } },
                sort: ['-date_published'],
                limit: parseInt(limit, 10),
                offset,
                fields: [
                    '*',
                    'author.id', 'author.first_name', 'author.last_name', 'author.avatar',
                    'categories.categories_id.id', 'categories.categories_id.name', 'categories.categories_id.slug',
                    'tags.tags_id.id', 'tags.tags_id.name', 'tags.tags_id.slug',
                ].join(','),
                meta: 'total_count,filter_count',
            },
        });

        const posts = (data.data || []).map(transformPost);
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

// GET /api/posts/:slug — single post by slug
router.get('/:slug', async (req, res, next) => {
    try {
        const { data } = await directus.get('/items/posts', {
            params: {
                filter: {
                    slug: { _eq: req.params.slug },
                    status: { _eq: 'published' },
                },
                limit: 1,
                fields: [
                    '*',
                    'author.id', 'author.first_name', 'author.last_name', 'author.avatar',
                    'categories.categories_id.id', 'categories.categories_id.name', 'categories.categories_id.slug',
                    'tags.tags_id.id', 'tags.tags_id.name', 'tags.tags_id.slug',
                ].join(','),
            },
        });

        const posts = data.data || [];
        if (posts.length === 0) {
            return res.status(404).json({ error: { message: 'Post not found' } });
        }

        res.json({ post: transformPost(posts[0]) });
    } catch (err) {
        next(err);
    }
});

export default router;
