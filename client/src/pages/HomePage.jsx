import { useState } from 'react';
import usePosts from '../hooks/usePosts';
import PostList from '../components/PostList';
import CategoryList from '../components/CategoryList';
import Pagination from '../components/Pagination';

const HomePage = () => {
    const [page, setPage] = useState(1);
    const { posts, meta, loading, error } = usePosts(page, 9);

    return (
        <>
            <title>Blogg — Home</title>

            {/* Hero Section */}
            <section className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Welcome to <span className="text-primary-600">Blogg</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover stories, insights, and ideas from our community of writers.
                </p>
            </section>

            {/* Categories */}
            <section className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Browse by Category</h2>
                <CategoryList />
            </section>

            {/* Posts Grid */}
            <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Latest Posts</h2>
                <PostList posts={posts} loading={loading} error={error} />
                <Pagination meta={meta} onPageChange={setPage} />
            </section>
        </>
    );
};

export default HomePage;
