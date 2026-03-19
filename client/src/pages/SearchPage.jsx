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
        <div className="min-h-screen pt-32 pb-24 px-4 sm:px-8 max-w-[1400px] mx-auto grid grid-cols-12 gap-y-12 sm:gap-4 md:gap-8 transition-colors duration-500">
            <title>SEARCH // thrds</title>

            <header className="col-span-12 md:col-span-10 border-b border-black pb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
                    <div className="flex-1 w-full">
                        <span className="font-mono text-[10px] font-bold text-[var(--color-accent)] tracking-widest uppercase mb-4 block">
                            SYS.QUERY_DATABASE
                        </span>
                        <h1 className="text-6xl md:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase mix-blend-difference text-white mb-8 block">
                            SEARCH.
                        </h1>
                        
                        <div className="relative w-full md:w-3/4">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setPage(1);
                                }}
                                placeholder="ENTER_TERM..."
                                className="w-full py-4 px-4 pl-12 bg-white border border-black font-mono text-sm text-black uppercase tracking-widest
                                focus:outline-none focus:ring-0 focus:border-[var(--color-accent)] 
                                placeholder:text-black/30 transition-all rounded-none"
                                autoFocus
                            />
                            <svg
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-black mix-blend-difference"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                        </div>
                    </div>

                    <div className="font-mono font-bold text-black border-l border-black pl-4">
                        <p className="text-[10px] tracking-widest mb-1 opacity-50">HITS</p>
                        <p className="text-4xl text-[var(--color-accent)]">
                            {query.trim() && !loading ? meta.totalCount.toString().padStart(3, '0') : '000'}
                        </p>
                    </div>
                </div>
            </header>

            <main className="col-span-12">
                <div className="flex items-center justify-between border-b border-black pb-2 mb-12 font-mono text-[10px] uppercase tracking-widest">
                    <span className="flex items-center gap-4">
                        RESULTS
                        {loading && (
                            <span className="text-[var(--color-accent)] animate-pulse">
                                [SCANNING...]
                            </span>
                        )}
                    </span>
                    {query.trim() && (
                        <span>
                            {meta.totalCount} MATCHES "{query.trim()}"
                        </span>
                    )}
                </div>

                {!query.trim() ? (
                    <div className="p-16 border border-black border-dashed flex items-center justify-center">
                        <p className="font-mono text-black/50 font-bold uppercase tracking-widest text-[10px]">AWAITING_INPUT</p>
                    </div>
                ) : (
                    <PostList posts={results} loading={loading} error={error} />
                )}

                {results.length > 0 && !loading && meta.totalPages > 1 && (
                    <div className="mt-12 pt-8 flex justify-center">
                        <Pagination meta={meta} onPageChange={setPage} />
                    </div>
                )}
            </main>
        </div>
    );
};

export default SearchPage;
