import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
                        ? 'Classification not found in archive.'
                        : 'System error: Could not retrieve classification.'
                );
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, [slug, page]);

    if (error) {
        return (
            <div className="max-w-2xl mx-auto py-24 px-4 text-center">
                <div className="border-4 border-[var(--color-accent)] p-8 shadow-[8px_8px_0_0_var(--color-accent)]">
                    <p className="font-mono text-[var(--color-accent)] font-bold text-xl uppercase tracking-widest mb-6">
                        {error}
                    </p>
                    <Link to="/" className="inline-block px-6 py-3 bg-[var(--color-beige-bg)] border-2 border-primary-900 text-primary-900 font-bold font-mono uppercase tracking-widest hover:bg-primary-900 hover:text-white transition-colors">
                        Return to Index
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-[var(--color-primary-900)]">
            <title>{category ? `${category.name} — Selvedge Archive` : 'Index — Selvedge'}</title>

            {/* Header Section */}
            <header className="mb-12 border-b-4 border-primary-900 pb-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-primary-600 hover:text-[var(--color-accent)] mb-8 transition-colors group"
                >
                    <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
                    Back to Master Index
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <span className="font-mono text-xs font-bold text-[var(--color-accent)] tracking-widest uppercase mb-4 block">
                            /// Classification Type
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif font-black text-primary-900 leading-none tracking-tight uppercase">
                            {category ? category.name : (loading ? 'Loading...' : 'Archive')}
                        </h1>
                    </div>
                    {category && (
                        <div className="text-right font-mono font-bold text-primary-900 bg-white border-2 border-primary-900 p-4 shadow-[4px_4px_0_0_var(--color-primary-900)] min-w-[200px]">
                            <p className="text-[10px] tracking-widest text-primary-600 mb-1">TOTAL ENTRIES</p>
                            <p className="text-3xl">{meta.totalCount.toString().padStart(3, '0')}</p>
                        </div>
                    )}
                </div>
                
                {category?.description && (
                    <p className="mt-8 text-xl text-primary-800 font-sans max-w-2xl border-l-2 border-[var(--color-accent)] pl-4">
                        {category.description}
                    </p>
                )}
            </header>

            {/* List Section */}
            <main>
                <div className="flex items-center justify-between border-b-2 border-primary-900 pb-2 mb-8">
                    <h2 className="text-2xl font-serif font-bold text-primary-900 uppercase tracking-wide">
                        Filed Documents
                    </h2>
                    <span className="font-mono text-xs font-bold text-primary-600 uppercase tracking-widest">
                        Page {page} of {meta.totalPages || 1}
                    </span>
                </div>

                <PostList posts={posts} loading={loading} error={error} />
                
                {!loading && meta.totalPages > 1 && (
                    <div className="mt-12 pt-8 border-t-2 border-primary-900 flex justify-center">
                        <Pagination meta={meta} onPageChange={setPage} />
                    </div>
                )}
            </main>
        </div>
    );
};

export default CategoryPage;
