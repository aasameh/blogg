import { Link } from 'react-router-dom';

const PostCard = ({ post, index = 0 }) => {
    const formattedDate = post.datePublished
        ? new Date(post.datePublished).toLocaleDateString('en-US', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
        }).replace(/\//g, '.') // Formats to MM.DD.YY
        : 'XX.XX.XX';

    const layoutType = index % 3;

    // --- VARIANT 0: Massive Image Spread ---
    if (layoutType === 0) {
        return (
            <article className="grid grid-cols-12 gap-4 group mb-12">
                <div className="col-span-12 md:col-span-10 relative">
                    <Link to={`/post/${post.slug}`} className="block overflow-hidden border border-black bg-black">
                        {post.featuredImage ? (
                            <img
                                src={post.featuredImage}
                                alt={post.title}
                                className="w-full aspect-video object-cover grayscale contrast-125 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity"
                            />
                        ) : (
                            <div className="w-full aspect-video bg-[#1a1a1a]" />
                        )}
                    </Link>
                    {/* Overlapping Text Box */}
                    <div className="absolute -bottom-8 md:bottom-[-2rem] right-0 md:-right-16 w-[90%] md:w-[60%] bg-white border-2 border-black p-4 md:p-8 z-10 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2">
                        <div className="flex justify-between items-start border-b border-black pb-2 mb-4">
                            <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--color-accent)]">[VAR.00_L]</span>
                            <span className="font-mono text-[9px] tracking-[0.2em]">{formattedDate}</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif font-black uppercase leading-[0.85] tracking-tighter mb-4 hover:text-[var(--color-accent)] transition-colors">
                            <Link to={`/post/${post.slug}`}>{post.title}</Link>
                        </h2>
                        {post.excerpt && <p className="text-xs font-mono lowercase opacity-80 line-clamp-3">{post.excerpt}</p>}
                    </div>
                </div>
            </article>
        );
    }

    // --- VARIANT 1: Text Dominant & Split ---
    if (layoutType === 1) {
        return (
            <article className="grid grid-cols-12 gap-4 group border-y border-black py-8 relative">
                {/* Background scanning line effect on hover */}
                <div className="absolute inset-0 bg-[var(--color-accent)] opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" style={{ backgroundSize: '100% 4px', backgroundImage: 'linear-gradient(transparent 50%, rgba(0,0,0,0.5) 50%)' }}></div>
                
                <div className="col-span-12 md:col-span-6 flex flex-col justify-between order-2 md:order-1 pt-4 md:pt-0">
                    <div>
                        <div className="font-mono text-[9px] tracking-[0.3em] mb-4 opacity-50 block">:: ENTRY // {post.slug}</div>
                        <h2 className="text-4xl md:text-7xl font-sans font-black tracking-tighter uppercase leading-[0.8] mb-6 mix-blend-exclusion hover:text-[var(--color-accent)] transition-colors">
                            <Link to={`/post/${post.slug}`}>{post.title}</Link>
                        </h2>
                    </div>
                    <div>
                        {post.excerpt && <p className="font-sans text-sm md:text-md uppercase leading-none opacity-90 indent-12 max-w-sm mb-6">{post.excerpt}</p>}
                        <div className="flex items-center gap-4 border-t border-black pt-2 font-mono text-[10px] tracking-widest text-[var(--color-accent)]">
                            <span>{formattedDate}</span>
                            <span>{post.author ? `BY ${post.author.firstName}` : 'ANON'}</span>
                        </div>
                    </div>
                </div>
                
                <div className="col-span-12 md:col-span-4 md:col-start-8 border border-black p-2 bg-[#f0f0f0] order-1 md:order-2 self-start transform group-hover:rotate-2 transition-transform duration-300">
                    <Link to={`/post/${post.slug}`}>
                        {post.featuredImage ? (
                            <img src={post.featuredImage} alt={post.title} className="w-full aspect-[4/5] object-cover filter grayscale sepia-[0.3] contrast-150" />
                        ) : (
                            <div className="w-full aspect-[4/5] bg-black text-white flex items-center justify-center font-mono text-[10px]">NULL_IMG</div>
                        )}
                    </Link>
                </div>
            </article>
        );
    }

    // --- VARIANT 2: Inverted / Glitchy ---
    return (
        <article className="grid grid-cols-12 gap-0 group">
            <div className="col-span-12 md:col-span-8 md:col-start-3 bg-black text-white p-6 md:p-12 relative overflow-hidden transition-all duration-300 hover:bg-[var(--color-accent)]">
                {/* Weird floating borders */}
                <div className="absolute top-2 left-2 bottom-2 right-2 border-dashed border border-[#444] pointer-events-none group-hover:border-black"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="font-mono text-[10px] text-gray-500 tracking-[0.4em] mb-8 group-hover:text-black">[ SYS.INVERT ]</div>
                    
                    <h2 className="text-3xl md:text-5xl font-serif font-black uppercase italic leading-none mb-6">
                        <Link to={`/post/${post.slug}`} className="hover:line-through">{post.title}</Link>
                    </h2>
                    
                    {post.categories?.length > 0 && (
                        <div className="flex gap-4 font-mono text-[9px] tracking-widest border border-gray-700 px-4 py-1 group-hover:border-black group-hover:text-black text-gray-400 mt-4">
                            {post.categories.map(cat => <span key={cat.id}>#{cat.name.toUpperCase()}</span>)}
                        </div>
                    )}
                </div>

                {post.featuredImage && (
                    <img 
                        src={post.featuredImage} 
                        alt="bg" 
                        className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale invert blur-[1px] mix-blend-overlay group-hover:hidden" 
                    />
                )}
            </div>
        </article>
    );
};

export default PostCard;
