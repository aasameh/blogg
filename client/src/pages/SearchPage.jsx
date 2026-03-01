import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSearch from '../hooks/useSearch';
import SearchBar from '../components/SearchBar';
import PostList from '../components/PostList';
import Pagination from '../components/Pagination';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState(initialQuery);
    const [page, setPage] = useState(1);
    const { results, meta, loading, error, search } = useSearch();

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim()) {
                search(query, page);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query, page, search]);

    // Sync URL query param on mount
    useEffect(() => {
        const q = searchParams.get('q');
        if (q) {
            setQuery(q);
        }
    }, [searchParams]);

    return (
        <>
            <title>Search — Blogg</title>

            <section className="max-w-2xl mx-auto mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Search Posts
                </h1>
                <div className="mb-2">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setPage(1);
                            }}
                            placeholder="Type to search posts..."
                            className="w-full py-3 px-5 pl-12 bg-white border border-gray-300 rounded-xl text-lg
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                placeholder-gray-400 shadow-sm"
                            autoFocus
                        />
                        <svg
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                    </div>
                    {query.trim() && !loading && (
                        <p className="text-sm text-gray-500 mt-2">
                            {meta.totalCount} {meta.totalCount === 1 ? 'result' : 'results'} for &ldquo;{query.trim()}&rdquo;
                        </p>
                    )}
                </div>
            </section>

            <PostList posts={results} loading={loading} error={error} />
            {results.length > 0 && (
                <Pagination meta={meta} onPageChange={setPage} />
            )}
        </>
    );
};

export default SearchPage;
