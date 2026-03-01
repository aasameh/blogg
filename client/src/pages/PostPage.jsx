import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiUser } from 'react-icons/fi';
import api from '../services/api';
import TagBadge from '../components/TagBadge';

const PostPage = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await api.get(`/posts/${slug}`);
                setPost(data.post);
            } catch (err) {
                setError(
                    err.response?.status === 404
                        ? 'Post not found'
                        : 'Failed to load post'
                );
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-8" />
                <div className="h-64 bg-gray-200 rounded mb-8" />
                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                    <div className="h-4 bg-gray-200 rounded w-4/6" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 text-xl mb-4">{error}</p>
                <Link to="/" className="text-primary-600 hover:underline">
                    &larr; Back to home
                </Link>
            </div>
        );
    }

    if (!post) return null;

    const formattedDate = post.datePublished
        ? new Date(post.datePublished).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : null;

    return (
        <>
            <title>{`${post.title} — Blogg`}</title>

            <article className="max-w-3xl mx-auto">
                {/* Back link */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 mb-6 transition-colors"
                >
                    <FiArrowLeft size={14} />
                    Back to posts
                </Link>

                {/* Categories */}
                {post.categories?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.categories.map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/category/${cat.slug}`}
                                className="text-sm font-semibold uppercase tracking-wide text-primary-600 hover:text-primary-800"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {post.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
                    {post.author && (
                        <div className="flex items-center gap-2">
                            {post.author.avatar && (
                                <img
                                    src={post.author.avatar}
                                    alt={`${post.author.firstName} ${post.author.lastName}`}
                                    className="w-8 h-8 rounded-full"
                                />
                            )}
                            <FiUser size={14} />
                            <span>{post.author.firstName} {post.author.lastName}</span>
                        </div>
                    )}
                    {formattedDate && (
                        <div className="flex items-center gap-1">
                            <FiCalendar size={14} />
                            <time>{formattedDate}</time>
                        </div>
                    )}
                </div>

                {/* Featured Image */}
                {post.featuredImage && (
                    <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full rounded-xl mb-8 shadow-sm"
                    />
                )}

                {/* Content */}
                <div
                    className="prose prose-lg prose-primary max-w-none
            prose-headings:text-gray-900 prose-a:text-primary-600
            prose-img:rounded-lg prose-img:shadow-sm"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200">
                        {post.tags.map((tag) => (
                            <TagBadge key={tag.id} tag={tag} />
                        ))}
                    </div>
                )}
            </article>
        </>
    );
};

export default PostPage;
