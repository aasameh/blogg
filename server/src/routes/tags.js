import { Router } from 'express';
import directus from '../services/directus.js';

const router = Router();

// GET /api/tags — list all tags
router.get('/', async (_req, res, next) => {
    try {
        const { data } = await directus.get('/items/tags', {
            params: {
                sort: ['name'],
                fields: 'id,name,slug',
            },
        });

        res.json({ tags: data.data || [] });
    } catch (err) {
        next(err);
    }
});

export default router;
