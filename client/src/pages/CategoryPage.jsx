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
        window.scrollTo(0, 0);
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
                        ? 'ERR: 404_NOT_FOUND'
                        : 'ERR: SYSTEM_FAULT'
                );
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, [slug, page]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="border border-black bg-white p-8 max-w-lg w-full">
                    <p className="font-mono text-black font-bold text-xl uppercase tracking-widest mb-6">
                        {error}
                    </p>
                    <Link to="/" className="inline-block px-6 py-3 bg-black text-white text-[10px] font-bold font-mono uppercase tracking-[0.2em] hover:bg-[var(--color-accent)] transition-colors">
                        [RETURN_HOME]
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 sm:px-8 max-w-[1400px] mx-auto grid grid-cols-12 gap-y-12 sm:gap-4 md:gap-8">
            <title>{category ? `${category.name} // thrds` : 'INDEX // thrds'}</title>

            {/* Header Section */}
            <header className="col-span-12 md:col-span-10 border-b border-black pb-8">
                <Link
                    to="/"
                    className="inline-block hover:text-[var(--color-accent)] hover:bg-black hover:text-white px-2 py-1 border border-black transition-colors font-mono text-[10px] uppercase tracking-widest mb-12"
                >
                    [BACK_TO_ROOT]
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    <div>
                        <span className="font-mono text-[10px] text-[var(--color-accent)] font-bold tracking-widest uppercase mb-4 block">
                            DIR: /category/{slug}
                        </span>
                        <h1 className="text-6xl md:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase mix-blend-difference text-white break-words">
                            {category ? category.name : (loading ? 'LOADING...' : 'INDEX')}
                        </h1>
                    </div>
                    {category && (
                        <div className="font-mono font-bold text-black border-l border-black pl-4">
                            <p className="text-[10px] tracking-widest mb-1 opacity-50">ENTRIES_FOUND</p>
                            <p className="text-4xl">{meta.totalCount.toString().padStart(3, '0')}</p>
                        </div>
                    )}
                </div>
                
                {category?.description && (
                    <p className="mt-8 text-sm md:text-base font-mono uppercase max-w-xl text-black/70 border-l border-[var(--color-accent)] pl-4">
                        {category.description}
                    </p>
                )}
            </header>

            {/* List Section */}
            <main className="col-span-12">
                <div className="flex items-center justify-between border-b border-black pb-2 mb-12 font-mono text-[10px] uppercase tracking-widest">
                    <span>QUERY_RESULTS</span>
                    <span>
                        PG: {page} / {meta.totalPages || 1}
                    </span>
                </div>

                <PostList posts={posts} loading={loading} error={error} />
                
                {!loading && meta.totalPages > 1 && (
                    <div className="mt-12 pt-8 flex justify-center">
                        <Pagination meta={meta} onPageChange={setPage} />
                    </div>
                )}
            </main>
        </div>
    );
};

export default CategoryPage;
