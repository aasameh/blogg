import { Router } from 'express';
import directus from '../services/directus.js';

const router = Router();

// POST /api/auth/login — proxy to Directus login
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: { message: 'Email and password are required' } });
        }

        const { data } = await directus.post('/auth/login', { email, password });

        res.json({
            accessToken: data.data.access_token,
            refreshToken: data.data.refresh_token,
            expires: data.data.expires,
        });
    } catch (err) {
        if (err.response?.status === 401) {
            return res.status(401).json({ error: { message: 'Invalid credentials' } });
        }
        next(err);
    }
});

// POST /api/auth/refresh — proxy to Directus token refresh
router.post('/refresh', async (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ error: { message: 'Refresh token is required' } });
        }

        const { data } = await directus.post('/auth/refresh', {
            refresh_token: refreshToken,
            mode: 'json',
        });

        res.json({
            accessToken: data.data.access_token,
            refreshToken: data.data.refresh_token,
            expires: data.data.expires,
        });
    } catch (err) {
        if (err.response?.status === 401) {
            return res.status(401).json({ error: { message: 'Invalid refresh token' } });
        }
        next(err);
    }
});

// GET /api/auth/me — get current user (requires auth header)
router.get('/me', async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: { message: 'Not authenticated' } });
        }

        const { data } = await directus.get('/users/me', {
            headers: { Authorization: authHeader },
            params: { fields: 'id,first_name,last_name,email,avatar' },
        });

        const user = data.data;
        res.json({
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                avatar: user.avatar,
            },
        });
    } catch (err) {
        if (err.response?.status === 401) {
            return res.status(401).json({ error: { message: 'Invalid or expired token' } });
        }
        next(err);
    }
});

export default router;
