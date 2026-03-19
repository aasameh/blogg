const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-black bg-white mt-auto select-none">
            <div className="w-full px-4 sm:px-8 py-8 md:py-12 mix-blend-difference text-white">
                <div className="flex flex-col md:flex-row items-baseline justify-between gap-8 font-mono text-[10px] uppercase tracking-[0.2em]">
                    <div className="flex flex-col gap-2">
                        <span className="text-4xl md:text-[6vw] font-black leading-none tracking-tighter block mb-4">thrds.</span>
                        <div className="flex gap-4 opacity-50">
                            <a href="#" className="hover:bg-white hover:text-black px-1 transition-colors">[INSTAGRAM]</a>
                            <a href="#" className="hover:bg-white hover:text-black px-1 transition-colors">[TWITTER]</a>
                            <a href="#" className="hover:bg-white hover:text-black px-1 transition-colors">[TIKTOK]</a>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-right max-w-sm">
                        <p className="font-bold">CHAOTIC GOOD // INTERNET NATIVE</p>
                        <p className="opacity-50 break-words mb-4">
                            NOTHING IS TRUE. EVERYTHING IS PERMITTED. FASHION ZINE TERMINAL.
                        </p>
                        <p>&copy; {currentYear} THRDS_SYS. ALL RIGHTS RESERVED.</p>
                    </div>
                </div>
            </div>
            
            {/* Massive scrolling footer marquee effect */}
            <div className="w-full overflow-hidden border-t border-black py-2 bg-black text-white">
                <div className="whitespace-nowrap font-mono text-[10px] tracking-widest flex items-center gap-4 animate-[scroll_20s_linear_infinite]">
                    <span>SYS_ONLINE</span>
                    <span className="text-[var(--color-accent)]">///</span>
                    <span>NO_SIGNAL</span>
                    <span className="text-[var(--color-accent)]">///</span>
                    <span>END_OF_DOCUMENT</span>
                    <span className="text-[var(--color-accent)]">///</span>
                    <span>SYS_ONLINE</span>
                    <span className="text-[var(--color-accent)]">///</span>
                    <span>NO_SIGNAL</span>
                    <span className="text-[var(--color-accent)]">///</span>
                    <span>END_OF_DOCUMENT</span>
                    <span className="text-[var(--color-accent)]">///</span>
                    <span>SYS_ONLINE</span>
                    <span className="text-[var(--color-accent)]">///</span>
                    <span>NO_SIGNAL</span>
                    <span className="text-[var(--color-accent)]">///</span>
                    <span>END_OF_DOCUMENT</span>
                    <span className="text-[var(--color-accent)]">///</span>
                    <span>SYS_ONLINE</span>
                    <span className="text-[var(--color-accent)]">///</span>
                    <span>NO_SIGNAL</span>
                    <span className="text-[var(--color-accent)]">///</span>
                    <span>END_OF_DOCUMENT</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
