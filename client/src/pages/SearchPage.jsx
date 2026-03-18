import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSearch from '../hooks/useSearch';
import PostList from '../components/PostList';
import Pagination from '../components/Pagination';

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState(initialQuery);
    const [page, setPage] = useState(1);
    const { results, meta, loading, error, search } = useSearch();

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim()) {
                search(query, page);
                setSearchParams({ q: query.trim() });
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query, page, search, setSearchParams]);

    // Sync URL query param on mount
    useEffect(() => {
        const q = searchParams.get('q');
        if (q && q !== query) {
            setQuery(q);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-[var(--color-primary-900)]">
            <title>Search Archive — Selvedge</title>

            <header className="mb-12 border-b-4 border-primary-900 pb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="flex-1 max-w-2xl">
                    <span className="font-mono text-xs font-bold text-[var(--color-accent)] tracking-widest uppercase mb-4 block">
                        /// Query Database
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-black text-primary-900 leading-none tracking-tight uppercase mb-8">
                        Search Archive.
                    </h1>
                    
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setPage(1);
                            }}
                            placeholder="ENTER SEARCH TERM..."
                            className="w-full py-4 px-6 pl-14 bg-white border-2 border-primary-900 font-mono text-lg text-primary-900 uppercase tracking-wide
                            focus:outline-none focus:ring-0 focus:border-[var(--color-accent)] shadow-[4px_4px_0_0_var(--color-primary-900)]
                            placeholder:text-primary-300 transition-colors"
                            autoFocus
                        />
                        <svg
                            className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-900"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                    </div>
                </div>

                <div className="text-right font-mono font-bold text-primary-900 bg-white border-2 border-primary-900 p-4 shadow-[4px_4px_0_0_var(--color-primary-900)] min-w-[200px] hidden md:block">
                    <p className="text-[10px] tracking-widest text-primary-600 mb-1">FOUND DOCUMENTS</p>
                    <p className="text-3xl text-[var(--color-accent)]">
                        {query.trim() && !loading ? meta.totalCount.toString().padStart(3, '0') : '000'}
                    </p>
                </div>
            </header>

            <main>
                <div className="flex items-center justify-between border-b-2 border-primary-900 pb-2 mb-8">
                    <h2 className="text-2xl font-serif font-bold text-primary-900 uppercase tracking-wide flex items-center gap-3">
                        Results
                        {loading && (
                            <span className="text-[10px] font-mono tracking-widest text-[var(--color-accent)] animate-pulse">
                                [SCANNING...]
                            </span>
                        )}
                    </h2>
                    {query.trim() && (
                        <span className="font-mono text-xs font-bold text-primary-600 uppercase tracking-widest">
                            {meta.totalCount} matches for &quot;{query.trim()}&quot;
                        </span>
                    )}
                </div>

                {!query.trim() ? (
                    <div className="p-16 border-2 border-primary-900 border-dashed text-center bg-white/50">
                        <p className="font-mono text-primary-600 font-bold uppercase tracking-widest">Awaiting search parameters.</p>
                    </div>
                ) : (
                    <PostList posts={results} loading={loading} error={error} />
                )}

                {results.length > 0 && !loading && meta.totalPages > 1 && (
                    <div className="mt-12 pt-8 border-t-2 border-primary-900 flex justify-center">
                        <Pagination meta={meta} onPageChange={setPage} />
                    </div>
                )}
            </main>
        </div>
    );
};

export default SearchPage;
