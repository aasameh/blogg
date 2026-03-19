import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <>
            {/* FLOATING CORNER ELEMENTS */}
            
            {/* Top Left: Menu / Index */}
            <div className="fixed top-4 left-4 z-50 mix-blend-difference text-white">
                <div className="font-mono text-[9px] tracking-[0.2em] mb-1 opacity-70">[SYS.NAV.01]</div>
                <button 
                    onClick={() => setIsMenuOpen(true)}
                    className="font-sans font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black px-2 py-1 -mx-2 transition-colors text-left"
                >
                    INPUT // MENU
                </button>
            </div>

            {/* Top Right: Search */}
            <div className="fixed top-4 right-4 z-50 mix-blend-difference text-white text-right">
                <div className="font-mono text-[9px] tracking-[0.2em] mb-1 opacity-70">[OP.SEARCH]</div>
                <button 
                    onClick={() => setIsMenuOpen(true)}
                    className="font-sans font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black px-2 py-1 -mx-2 transition-colors"
                >
                    QUERY
                </button>
            </div>

            {/* Bottom Right: Floating Branding */}
            <div className="fixed bottom-4 right-4 z-50 mix-blend-difference text-white text-right pointer-events-none hidden md:block">
                <div className="font-serif font-black text-4xl leading-none tracking-widest transform scale-x-125 origin-right">
                    t h r d s
                </div>
                <div className="font-mono text-[9px] tracking-[0.3em] mt-2 opacity-50">v.0.0.1_BETA</div>
            </div>


            {/* CHAOTIC OVERLAY MENU */}
            <div
                className={`fixed inset-0 bg-[#0a0a0a] text-white z-[60] transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
                {/* Background Grid Lines for Menu */}
                <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent calc(100vw / 12 - 1px), #ffffff calc(100vw / 12 - 1px), #ffffff calc(100vw / 12))' }} />

                <div className="absolute top-4 right-4 z-50">
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="font-mono text-sm tracking-widest hover:text-[var(--color-accent)] text-white"
                    >
                        [CLOSE_X]
                    </button>
                </div>

                <div className="h-full w-full flex flex-col md:flex-row p-4 md:p-12 items-center justify-center relative">
                    
                    {/* Giant background text */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif font-black text-[#1a1a1a] whitespace-nowrap pointer-events-none z-0">
                        DIRECTORY
                    </div>

                    <div className="w-full md:w-1/2 z-10 p-4">
                        <div className="font-mono text-[10px] tracking-[0.2em] mb-4 text-[#888888]">[EXEC.SEARCH]</div>
                        <form onSubmit={handleSearchSubmit} className="flex border-b-2 border-white pb-2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="ENTER QUERY..."
                                className="w-full bg-transparent font-sans text-2xl font-bold uppercase placeholder:text-[#444444] focus:outline-none focus:text-[var(--color-accent)]"
                                autoFocus={isMenuOpen}
                            />
                            <button type="submit" className="text-white hover:text-[var(--color-accent)]">
                                <FiSearch size={24} />
                            </button>
                        </form>
                    </div>

                    <div className="w-full md:w-1/2 z-10 p-4 md:pl-24 mt-12 md:mt-0 flex flex-col gap-6">
                        <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-accent)]">[NAV_LINKS]</div>
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className="font-serif text-5xl font-black uppercase hover:italic hover:text-[var(--color-accent)] transition-all">INDEX</Link>
                        <Link to="/search" onClick={() => setIsMenuOpen(false)} className="font-serif text-5xl font-black uppercase hover:italic hover:text-[var(--color-accent)] transition-all">SEARCH</Link>
                        
                        <div className="mt-8 pt-8 border-t border-[#333333] flex flex-col gap-2">
                            {user ? (
                                <>
                                    <div className="font-mono text-xs">LOGGED_IN: {user.username}</div>
                                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-left font-mono text-xs hover:text-[var(--color-accent)]">[LOGOUT]</button>
                                </>
                            ) : (
                                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="font-mono text-xs hover:text-[var(--color-accent)]">[AUTH.LOGIN]</Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
