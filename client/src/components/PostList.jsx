import PostCard from './PostCard';

const PostList = ({ posts, loading, error }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-[var(--color-beige-bg)] border-2 border-primary-900 flex flex-col"
                    >
                        <div className="h-48 bg-primary-100 border-b-2 border-primary-900" />
                        <div className="p-6 space-y-4 flex-1 bg-white">
                            <div className="h-3 bg-primary-200 w-1/4" />
                            <div className="h-8 bg-primary-900 w-3/4" />
                            <div className="h-4 bg-primary-100 w-full mt-6" />
                            <div className="h-4 bg-primary-100 w-2/3" />
                            <div className="mt-8 pt-4 border-t-2 border-primary-100 flex justify-between">
                                <div className="h-3 bg-primary-300 w-1/3" />
                                <div className="h-3 bg-primary-200 w-1/4" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 border-2 border-[var(--color-accent)] bg-white text-center shadow-[4px_4px_0_0_var(--color-accent)]">
                <p className="font-mono text-[var(--color-accent)] font-bold uppercase tracking-widest text-lg">System Error</p>
                <p className="mt-2 text-primary-900 font-sans">{error}</p>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="p-16 border-2 border-primary-900 border-dashed text-center bg-white/50">
                <p className="font-mono text-primary-600 font-bold uppercase tracking-widest">No entries found in archive.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostList;
