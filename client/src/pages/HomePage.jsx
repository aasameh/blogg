import { useState } from 'react';
import usePosts from '../hooks/usePosts';
import PostList from '../components/PostList';
import Pagination from '../components/Pagination';

const HomePage = () => {
    const [page, setPage] = useState(1);
    const { posts, meta, loading, error } = usePosts(page, 9);

    return (
        <div className="w-full min-h-screen text-black bg-white overflow-hidden relative">
            <title>thrds /// index</title>
            
            {/* HERO SECTION - 12 Column Asymmetrical */}
            <section className="relative w-full pt-32 pb-24 px-4 sm:px-8 grid grid-cols-12 gap-4 items-center">
                {/* Massive Typography spanning columns */}
                <div className="col-span-12 md:col-span-9 md:col-start-1 z-10 relative">
                    <div className="absolute -top-12 left-2 text-[10px] font-mono text-[var(--color-accent)] tracking-[0.3em] font-normal">[HERO.BLOCK.01]</div>
                    <h1 className="text-[15vw] leading-[0.8] font-serif font-black uppercase tracking-tighter mix-blend-difference text-black">
                        t h <span className="italic text-[#00FFFF]">r</span> d s <br />
                        <span className="text-[8vw] leading-[0.8] block -mt-4">maga_zine</span>
                    </h1>
                </div>

                {/* Overlapping Image Container */}
                <div className="col-span-10 col-start-3 md:col-span-5 md:col-start-8 mt-[-15vw] md:mt-[-5vw] z-0 relative">
                    <div className="absolute -left-4 top-1/2 w-8 h-[1px] bg-[var(--color-accent)] z-20"></div>
                    <div className="absolute left-1/2 -top-4 h-8 w-[1px] bg-[var(--color-accent)] z-20"></div>
                    <div className="relative aspect-[3/4] border border-black overflow-hidden group mix-blend-darken">
                        <img 
                            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop" 
                            alt="Cairo Youth" 
                            className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-[1.2] transform scale-105 group-hover:scale-100 transition-transform duration-700"
                        />
                        <div className="absolute top-2 right-2 bg-black text-white text-[9px] font-mono px-1 py-0.5 z-10">[ IMG.A_RAW ]</div>
                    </div>
                </div>

                {/* Floating Context Block */}
                <div className="col-span-12 md:col-span-4 md:col-start-2 mt-12 md:mt-24 border-t border-black pt-4 relative">
                    <div className="absolute right-0 top-0 w-2 h-2 border-r border-t border-[var(--color-accent)]"></div>
                    <p className="font-mono text-[11px] uppercase tracking-wider leading-relaxed text-gray-800">
                        Documenting the fabric of Egypt.<br />
                        From traditional local craftsmanship to the forefront of contemporary Cairo style.<br />
                        <span className="text-[var(--color-accent)] block mt-4 font-bold tracking-[0.2em]">[ ANTI—POLISHED ]</span>
                    </p>
                </div>
            </section>

            {/* MARQUEE TENSION LINE */}
            <div className="w-full border-y border-black bg-[#1a1a1a] text-white py-1.5 overflow-hidden flex mt-8 mb-24 relative">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase whitespace-nowrap opacity-80">
                    / NO LUXURY / RAW STREET / EDITORIAL CHAOS / CAIRO YOUTH / LOCAL CRAFT / INTERNET NATIVE / THE UNDERGROUND OVERGROUND / NO LUXURY / RAW STREET / EDITORIAL CHAOS / CAIRO YOUTH / LOCAL CRAFT / INTERNET NATIVE / THE UNDERGROUND OVERGROUND 
                </div>
            </div>

            {/* CONTENT START */}
            <main className="w-full px-4 sm:px-8 mb-32 relative z-10">
                <div className="flex justify-between items-end border-b-[3px] border-black pb-2 mb-16">
                    <h2 className="font-serif text-4xl font-black uppercase tracking-tight transform scale-y-110 origin-bottom">
                        L A T E S T <span className="mx-4 text-gray-300">///</span>
                    </h2>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-accent)]">[PG.{page}]</span>
                </div>
                
                <PostList posts={posts} loading={loading} error={error} />
                
                <div className="mt-24 pt-6 border-t border-black">
                    <Pagination meta={meta} onPageChange={setPage} />
                </div>
            </main>
        </div>
    );
};

export default HomePage;
