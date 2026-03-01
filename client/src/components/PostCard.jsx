import { Link } from 'react-router-dom';
import TagBadge from './TagBadge';

const PostCard = ({ post }) => {
    const formattedDate = post.datePublished
        ? new Date(post.datePublished).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : null;

    return (
        <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
            {/* Featured Image */}
            {post.featuredImage && (
                <Link to={`/post/${post.slug}`}>
                    <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                </Link>
            )}

            <div className="p-5">
                {/* Categories */}
                {post.categories?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/category/${cat.slug}`}
                                className="text-xs font-semibold uppercase tracking-wide text-primary-600 hover:text-primary-800"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                    <Link
                        to={`/post/${post.slug}`}
                        className="hover:text-primary-600 transition-colors"
                    >
                        {post.title}
                    </Link>
                </h2>

                {/* Excerpt */}
                {post.excerpt && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                    </p>
                )}

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        {post.author && (
                            <>
                                {post.author.avatar && (
                                    <img
                                        src={post.author.avatar}
                                        alt={`${post.author.firstName} ${post.author.lastName}`}
                                        className="w-6 h-6 rounded-full"
                                    />
                                )}
                                <span>
                                    {post.author.firstName} {post.author.lastName}
                                </span>
                            </>
                        )}
                    </div>
                    {formattedDate && <time>{formattedDate}</time>}
                </div>

                {/* Tags */}
                {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100">
                        {post.tags.map((tag) => (
                            <TagBadge key={tag.id} tag={tag} />
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
};

export default PostCard;
