import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const usePosts = (page = 1, limit = 10) => {
    const [posts, setPosts] = useState([]);
    const [meta, setMeta] = useState({ page: 1, totalPages: 0, totalCount: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.get('/posts', { params: { page, limit } });
            setPosts(data.posts);
            setMeta(data.meta);
        } catch (err) {
            setError(err.response?.data?.error?.message || 'Failed to load posts');
        } finally {
            setLoading(false);
        }
    }, [page, limit]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return { posts, meta, loading, error, refetch: fetchPosts };
};

export default usePosts;
