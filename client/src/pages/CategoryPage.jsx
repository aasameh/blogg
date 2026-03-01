import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../services/api';
import PostList from '../components/PostList';
import Pagination from '../components/Pagination';

const CategoryPage = () => {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [posts, setPosts] = useState([]);
    const [meta, setMeta] = useState({ page: 1, totalPages: 0, totalCount: 0 });
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await api.get(`/categories/${slug}`, {
                    params: { page, limit: 9 },
                });
                setCategory(data.category);
                setPosts(data.posts);
                setMeta(data.meta);
            } catch (err) {
                setError(
                    err.response?.status === 404
                        ? 'Category not found'
                        : 'Failed to load category'
                );
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, [slug, page]);

    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 text-xl mb-4">{error}</p>
                <Link to="/" className="text-primary-600 hover:underline">
                    &larr; Back to home
                </Link>
            </div>
        );
    }

    return (
        <>
            <title>{category ? `${category.name} — Blogg` : 'Category — Blogg'}</title>

            <Link
                to="/"
                className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 mb-6 transition-colors"
            >
                <FiArrowLeft size={14} />
                Back to posts
            </Link>

            {category && (
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
                    {category.description && (
                        <p className="text-gray-600">{category.description}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                        {meta.totalCount} {meta.totalCount === 1 ? 'post' : 'posts'}
                    </p>
                </div>
            )}

            <PostList posts={posts} loading={loading} error={error} />
            <Pagination meta={meta} onPageChange={setPage} />
        </>
    );
};

export default CategoryPage;
