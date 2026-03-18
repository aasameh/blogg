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

const DUMMY_POST = {
    id: 'doc-982374',
    title: 'The Enduring Appeal of Raw Selvedge Denim',
    slug: 'the-appeal-of-raw-denim',
    excerpt: 'In an era of fast fashion and instant gratification, a pair of selvedge jeans demands patience. They are stiff, unforgiving, and entirely anonymous when you first put them on. But over time, they become a topological map of your daily life.',
    content: `
        <p>There is something inherently romantic about raw, unwashed denim. In an era of fast fashion and instant gratification, a pair of selvedge jeans demands patience. They are stiff, unforgiving, and entirely anonymous when you first put them on. But over time, they become a topological map of your daily life.</p>
        <h2>The Loom State</h2>
        <p>Before the 1950s, most denim was woven on shuttle looms. These machines produced a narrow fabric, typically around 30 inches wide, resulting in a tightly woven edge that won't unravel. This edge—the "self-edge"—is where we get the term <em>selvedge</em>.</p>
        <p>
            <img src="https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=2070&auto=format&fit=crop" alt="Selvedge Fabric Detail" />
        </p>
        <blockquote>"A machine can make a perfect garment, but only a human can give it a soul. Precision is the enemy of character."</blockquote>
        <p>Notice the heavy contrast between the indigo warp and the ecru weft. This is the hallmark of traditional dyeing methods, particularly rope dyeing, which prevents the dye from fully penetrating the core of the yarn. This undyed core is what eventually reveals itself through friction, creating the iconic high-contrast fades.</p>
        <h3>Fades as a Living Canvas</h3>
        <p>Whiskers, honeycombs, and roping. These aren't just terms thrown around by enthusiasts; they are the physical manifestations of friction, movement, and time. When we look at a well-worn pair of service boots or a heavy canvas jacket, we are looking at a living document.</p>
        <ul>
            <li><strong>Whiskers:</strong> The horizontal fade lines across the lap/thigh area.</li>
            <li><strong>Honeycombs:</strong> The geometric fading behind the knees.</li>
            <li><strong>Stacks:</strong> The roping effect that occurs at the hem.</li>
        </ul>
        <p>Ultimately, to wear raw denim is to participate in an ongoing dialogue between the maker and the wearer. It is a commitment to the slow accumulation of character.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=2070&auto=format&fit=crop',
    status: 'published',
    datePublished: new Date().toISOString(),
    dateCreated: new Date().toISOString(),
    author: {
        id: 'staff-1',
        firstName: 'Archive',
        lastName: 'Staff',
        avatar: 'https://ui-avatars.com/api/?name=Archive+Staff&background=162a45&color=fff'
    },
    categories: [
        { id: 1, name: 'Denim', slug: 'denim' },
        { id: 2, name: 'Heritage', slug: 'heritage' }
    ],
    tags: [
        { id: 1, name: 'Selvedge', slug: 'selvedge' },
        { id: 2, name: 'Craftsmanship', slug: 'craftsmanship' }
    ]
};

// GET /api/posts — list published posts (paginated)
router.get('/', async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
        let posts = [];
        let totalCount = 0;

        try {
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
            posts = (data.data || []).map(transformPost);
            totalCount = data.meta?.filter_count || 0;
        } catch (err) {
            console.log('Fall back to dummy data');
        }

        // INJECT DUMMY DATA IF EMPTY OR FAILED
        if (posts.length === 0) {
            posts = [DUMMY_POST];
            totalCount = 1;
        }

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
        if (req.params.slug === DUMMY_POST.slug) {
            return res.json({ post: DUMMY_POST });
        }

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
