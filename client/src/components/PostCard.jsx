import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
    const formattedDate = post.datePublished
        ? new Date(post.datePublished).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).replace(/\//g, '.') // Formats to MM.DD.YYYY
        : null;

    return (
        <article className="bg-white border-2 border-primary-900 flex flex-col h-full hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-primary-900)] transition-all duration-200 group">
            {/* Featured Image */}
            {post.featuredImage && (
                <Link to={`/post/${post.slug}`} className="block border-b-2 border-primary-900 overflow-hidden bg-primary-50">
                    <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-56 object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                    />
                </Link>
            )}

            <div className="p-6 flex flex-col flex-1">
                {/* Categories */}
                {post.categories?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.categories.map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/category/${cat.slug}`}
                                className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-accent)] hover:text-primary-900 transition-colors"
                            >
                                [{cat.name}]
                            </Link>
                        ))}
                    </div>
                )}

                {/* Title */}
                <h2 className="text-2xl font-serif font-black text-primary-900 leading-tight mb-4 uppercase">
                    <Link
                        to={`/post/${post.slug}`}
                        className="hover:text-[var(--color-accent)] transition-colors decoration-2 underline-offset-4"
                    >
                        {post.title}
                    </Link>
                </h2>

                {/* Excerpt */}
                {post.excerpt && (
                    <p className="text-primary-800 text-sm font-sans leading-relaxed mb-8 flex-1">
                        {post.excerpt}
                    </p>
                )}

                {/* Meta Footer */}
                <div className="mt-auto pt-4 border-t-2 border-primary-100 flex items-center justify-between text-[11px] font-mono text-primary-600">
                    <div className="flex items-center gap-2">
                        {post.author && (
                            <span className="uppercase tracking-widest font-bold text-primary-900">
                                BY {post.author.firstName} {post.author.lastName}
                            </span>
                        )}
                    </div>
                    {formattedDate && <time className="tracking-widest font-semibold">{formattedDate}</time>}
                </div>
            </div>
        </article>
    );
};

export default PostCard;
