import directus from '../services/directus.js';

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: { message: 'No token provided' } });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Validate token by calling Directus /users/me
        const { data } = await directus.get('/users/me', {
            headers: { Authorization: `Bearer ${token}` },
        });

        req.user = data.data;
        next();
    } catch {
        return res.status(401).json({ error: { message: 'Invalid or expired token' } });
    }
};

export default verifyToken;
