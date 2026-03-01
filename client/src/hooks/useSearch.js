import { useState, useCallback } from 'react';
import api from '../services/api';

const useSearch = () => {
    const [results, setResults] = useState([]);
    const [meta, setMeta] = useState({ page: 1, totalPages: 0, totalCount: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const search = useCallback(async (query, page = 1, limit = 10) => {
        if (!query || query.trim().length === 0) {
            setResults([]);
            setMeta({ page: 1, totalPages: 0, totalCount: 0 });
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const { data } = await api.get('/search', {
                params: { q: query.trim(), page, limit },
            });
            setResults(data.posts);
            setMeta(data.meta);
        } catch (err) {
            setError(err.response?.data?.error?.message || 'Search failed');
        } finally {
            setLoading(false);
        }
    }, []);

    const clear = useCallback(() => {
        setResults([]);
        setMeta({ page: 1, totalPages: 0, totalCount: 0 });
        setError(null);
    }, []);

    return { results, meta, loading, error, search, clear };
};

export default useSearch;
