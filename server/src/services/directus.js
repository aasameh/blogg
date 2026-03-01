import axios from 'axios';

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_TOKEN = process.env.DIRECTUS_STATIC_TOKEN || '';

const directus = axios.create({
    baseURL: DIRECTUS_URL,
    headers: {
        'Content-Type': 'application/json',
        ...(DIRECTUS_TOKEN && { Authorization: `Bearer ${DIRECTUS_TOKEN}` }),
    },
});

// Helper to build image URL from Directus asset ID
export const assetUrl = (id, params = {}) => {
    if (!id) return null;
    const query = new URLSearchParams(params).toString();
    return `${DIRECTUS_URL}/assets/${id}${query ? `?${query}` : ''}`;
};

export default directus;
