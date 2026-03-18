import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
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
                        ? 'Record not found in archive.'
                        : 'System error: Could not retrieve document.'
                );
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="h-8 bg-primary-200 border-2 border-primary-900 w-3/4 mb-12" />
                <div className="h-96 bg-[var(--color-primary-50)] border-b-4 border-primary-900 mb-12" />
                <div className="space-y-6">
                    <div className="h-4 bg-primary-100 w-full" />
                    <div className="h-4 bg-primary-100 w-full" />
                    <div className="h-4 bg-primary-100 w-5/6" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto py-24 px-4 text-center">
                <div className="border-4 border-[var(--color-accent)] p-8 shadow-[8px_8px_0_0_var(--color-accent)]">
                    <p className="font-mono text-[var(--color-accent)] font-bold text-xl uppercase tracking-widest mb-6">
                        {error}
                    </p>
                    <Link to="/" className="inline-block px-6 py-3 bg-[var(--color-beige-bg)] border-2 border-primary-900 text-primary-900 font-bold font-mono uppercase tracking-widest hover:bg-primary-900 hover:text-white transition-colors">
                        Return to Index
                    </Link>
                </div>
            </div>
        );
    }

    if (!post) return null;

    const formattedDate = post.datePublished
        ? new Date(post.datePublished).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).replace(/\//g, '.')
        : null;

    return (
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-[var(--color-primary-900)]">
            <title>{`${post.title} — Selvedge Archive`}</title>

            <header className="mb-12 border-b-4 border-primary-900 pb-8">
                {/* Back Nav */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-primary-600 hover:text-[var(--color-accent)] mb-8 transition-colors group"
                >
                    <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
                    Back to Master Index
                </Link>

                {/* Classification */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="font-mono text-[10px] font-bold text-[var(--color-accent)] bg-white border border-[var(--color-accent)] px-2 py-1 uppercase tracking-widest">
                        Document / {post.id?.substring(0, 8) || '0000'}
                    </span>
                    {post.categories?.length > 0 && post.categories.map((cat) => (
                        <Link
                            key={cat.id}
                            to={`/category/${cat.slug}`}
                            className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary-600 hover:text-primary-900 transition-colors"
                        >
                            [{cat.name}]
                        </Link>
                    ))}
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-7xl font-serif font-black text-primary-900 leading-none tracking-tight uppercase mb-8">
                    {post.title}
                </h1>

                {/* Metadata Row */}
                <div className="flex flex-wrap border-t-2 border-primary-100 pt-4 items-center justify-between text-xs font-mono font-bold tracking-widest uppercase">
                    <div className="flex items-center gap-4">
                        {post.author ? (
                            <span>By: {post.author.firstName} {post.author.lastName}</span>
                        ) : (
                            <span>By: Staff</span>
                        )}
                        <span className="text-primary-300">|</span>
                        <span>Location: Local Archive</span>
                    </div>
                    {formattedDate && (
                        <time className="text-[var(--color-accent)]">D: {formattedDate}</time>
                    )}
                </div>
            </header>

            {/* Featured Image */}
            {post.featuredImage && (
                <figure className="mb-16 border-2 border-primary-900 bg-white p-2 shadow-[8px_8px_0_0_var(--color-primary-900)]">
                    <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-auto object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                    />
                    <figcaption className="text-[10px] font-mono tracking-widest uppercase text-right mt-2 text-primary-600">
                        FIG. 01 — {post.title}
                    </figcaption>
                </figure>
            )}

            {/* Main Content Body */}
            <div
                className="prose prose-lg max-w-none font-sans text-primary-900 leading-relaxed
                prose-headings:font-serif prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-primary-900
                prose-h2:text-4xl prose-h2:border-b-2 prose-h2:border-primary-900 prose-h2:pb-2 prose-h2:mt-12
                prose-h3:text-2xl 
                prose-p:mb-8 prose-p:text-lg
                prose-a:text-[var(--color-accent)] prose-a:font-bold prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-primary-900
                prose-blockquote:border-l-4 prose-blockquote:border-[var(--color-accent)] prose-blockquote:bg-white prose-blockquote:p-6 prose-blockquote:shadow-[4px_4px_0_0_var(--color-accent)]
                prose-blockquote:font-serif prose-blockquote:text-2xl prose-blockquote:italic prose-blockquote:text-primary-900
                prose-img:border-2 prose-img:border-primary-900 prose-img:shadow-[4px_4px_0_0_var(--color-primary-900)]
                prose-ul:list-square prose-ul:pl-0 
                prose-li:marker:text-[var(--color-accent)]
                /* Magazine Drop Cap for first paragraph */
                prose-p:first-of-type:first-letter:text-7xl prose-p:first-of-type:first-letter:font-serif prose-p:first-of-type:first-letter:font-black prose-p:first-of-type:first-letter:float-left prose-p:first-of-type:first-letter:pr-4 prose-p:first-of-type:first-letter:text-primary-900 prose-p:first-of-type:first-letter:leading-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Footer Metadata / Tags */}
            <footer className="mt-20 pt-8 border-t-4 border-primary-900 border-double flex flex-col gap-4">
                <span className="font-mono text-xs font-bold text-primary-900 uppercase tracking-widest">
                    /// Indexed Tags
                </span>
                {post.tags?.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                        {post.tags.map((tag) => (
                            <TagBadge key={tag.id} tag={tag} />
                        ))}
                    </div>
                ) : (
                    <span className="font-mono text-xs text-primary-500 uppercase tracking-widest">None filed.</span>
                )}
            </footer>
        </article>
    );
};

export default PostPage;
