import PostCard from './PostCard';

const PostList = ({ posts, loading, error }) => {
    if (loading) {
        return (
            <div className="flex flex-col gap-16">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-64 border border-black bg-gray-100 flex items-center justify-center opacity-50">
                        <span className="font-mono text-xs uppercase tracking-[0.2em]">[ LOADING_DATA ]</span>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 border border-[var(--color-accent)] bg-black text-white text-center">
                <p className="font-mono text-[var(--color-accent)] font-bold uppercase tracking-widest text-[10px] mb-2">[ERR.SYS]</p>
                <p className="mt-2 font-mono uppercase">{error}</p>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="p-16 border-2 border-black border-dashed text-center">
                <p className="font-mono font-bold uppercase tracking-[0.3em] text-[10px]">/// NULL_SET ///</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-24 md:gap-32 w-full max-w-7xl mx-auto">
            {posts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
            ))}
        </div>
    );
};

export default PostList;
