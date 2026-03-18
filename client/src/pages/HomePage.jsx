import { useState } from 'react';
import usePosts from '../hooks/usePosts';
import PostList from '../components/PostList';
import CategoryList from '../components/CategoryList';
import Pagination from '../components/Pagination';

const HomePage = () => {
    const [page, setPage] = useState(1);
    const { posts, meta, loading, error } = usePosts(page, 9);

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-[var(--color-primary-900)]">
            <title>Selvedge — The Archive</title>

            {/* Hero Section */}
            <section className="border-b-4 border-primary-900 pb-12 mb-12 flex flex-col md:flex-row items-end justify-between">
                <div className="max-w-3xl">
                    <span className="font-mono text-xs font-bold text-[var(--color-accent)] tracking-widest uppercase mb-4 block">
                        /// Issue 01 — Volume {new Date().getFullYear()}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-black text-primary-900 leading-none tracking-tight uppercase mb-6">
                        The Master <br /> Archive.
                    </h1>
                    <p className="text-xl text-primary-800 font-sans max-w-xl border-l-2 border-[var(--color-accent)] pl-4">
                        Documenting heritage goods, raw selvedge denim, and the utilitarian craftsmanship of yesteryear.
                    </p>
                </div>
                <div className="mt-8 md:mt-0 text-right hidden md:block">
                    <p className="font-mono text-sm font-bold text-primary-900">UPDATED WEEKLY</p>
                    <p className="font-mono text-xs text-primary-600">EST. {new Date().getFullYear()}</p>
                </div>
            </section>

            {/* Content Grid */}
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Main Articles */}
                <main className="lg:w-3/4">
                    <div className="flex items-center justify-between border-b-2 border-primary-900 pb-2 mb-8 mt-2">
                        <h2 className="text-2xl font-serif font-bold text-primary-900 uppercase tracking-wide">Latest Entries</h2>
                        <span className="font-mono text-xs font-bold text-primary-600 uppercase tracking-widest">Page {page}</span>
                    </div>
                    
                    <PostList posts={posts} loading={loading} error={error} />
                    
                    <div className="mt-12 pt-8 border-t-2 border-primary-900 flex justify-center">
                        <Pagination meta={meta} onPageChange={setPage} />
                    </div>
                </main>

                {/* Sidebar */}
                <aside className="lg:w-1/4">
                    <div className="border-2 border-primary-900 bg-white p-6 sticky top-28 shadow-[4px_4px_0_0_var(--color-primary-900)]">
                        <h2 className="font-serif font-bold text-xl text-primary-900 uppercase border-b-2 border-primary-900 pb-2 mb-6">
                            Index
                        </h2>
                        <CategoryList />
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default HomePage;
