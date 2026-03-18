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
            <header className="sticky top-0 z-50 bg-[var(--color-beige-bg)] border-b-2 border-primary-900 shadow-sm relative pt-1 border-t-[6px] border-t-primary-900">
                {/* Thin internal redline accent under the main top border */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--color-accent)] opacity-90" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Left: Menu Button */}
                        <div className="w-1/3 flex justify-start">
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className="p-2 -ml-2 text-primary-900 hover:text-[var(--color-accent)] transition-colors focus:outline-none"
                                aria-label="Open menu"
                            >
                                <FiMenu size={28} strokeWidth={2.5} />
                            </button>
                        </div>

                        {/* Center: Logo */}
                        <div className="w-1/3 flex justify-center">
                            <Link to="/" className="flex items-center group">
                                <span className="text-4xl font-serif font-black text-primary-900 tracking-tight uppercase group-hover:text-[var(--color-accent)] transition-colors">
                                    Selvedge
                                </span>
                            </Link>
                        </div>

                        {/* Right: Search Button */}
                        <div className="w-1/3 flex justify-end">
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="p-2 -mr-2 text-primary-900 hover:text-[var(--color-accent)] transition-colors focus:outline-none"
                                aria-label="Toggle search"
                            >
                                {isSearchOpen ? <FiX size={26} strokeWidth={2.5} /> : <FiSearch size={26} strokeWidth={2.5} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Inline Search Bar (Expands downwards) */}
                {isSearchOpen && (
                    <div className="absolute top-full left-0 w-full bg-[var(--color-beige-bg)] border-b-2 border-primary-900 py-4 px-4 shadow-md z-40">
                        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative flex items-center">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="SEARCH ARCHIVE..."
                                className="w-full py-3 px-4 bg-white border-2 border-primary-900 font-mono text-sm placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-[var(--color-accent)] transition-colors rounded-none"
                                autoFocus
                            />
                            <button type="submit" className="absolute right-3 p-2 text-primary-900 hover:text-[var(--color-accent)]">
                                <FiSearch size={20} strokeWidth={3} />
                            </button>
                        </form>
                    </div>
                )}
            </header>

            {/* Sidebar Overlay */}
            <div
                className={`fixed inset-0 bg-[var(--color-primary-900)]/40 z-[60] transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Sidebar Menu */}
            <div
                className={`fixed inset-y-0 left-0 w-80 bg-[var(--color-beige-bg)] border-r-4 border-primary-900 z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="absolute right-[-4px] top-0 bottom-0 w-[2px] bg-[var(--color-accent)]" />

                <div className="p-6 border-b border-primary-200 bg-white flex justify-between items-center">
                    <span className="font-serif font-black text-2xl text-primary-900 uppercase tracking-tight">Index</span>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 -mr-2 text-primary-900 hover:text-[var(--color-accent)]"
                    >
                        <FiX size={26} strokeWidth={2.5} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-8 px-8">
                    <nav className="flex flex-col space-y-10">
                        <div>
                            <span className="text-xs font-mono text-gray-500 mb-5 block tracking-widest uppercase">/// Navigation</span>
                            <div className="flex flex-col space-y-4">
                                <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold font-serif text-primary-900 hover:text-[var(--color-accent)] transition-colors flex items-center gap-3">
                                    Front Page
                                </Link>
                                <Link to="/search" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold font-serif text-primary-900 hover:text-[var(--color-accent)] transition-colors flex items-center gap-3">
                                    Search Archive
                                </Link>
                            </div>
                        </div>

                        <div>
                            <span className="text-xs font-mono text-gray-500 mb-5 block tracking-widest uppercase">/// Common Threads</span>
                            <div className="flex flex-col space-y-4">
                                <Link to="/category/selvedge" onClick={() => setIsMenuOpen(false)} className="text-lg text-primary-800 hover:text-[var(--color-accent)] transition-colors">
                                    Selvedge Denim
                                </Link>
                                <Link to="/category/boots" onClick={() => setIsMenuOpen(false)} className="text-lg text-primary-800 hover:text-[var(--color-accent)] transition-colors">
                                    Service Boots
                                </Link>
                                <Link to="/category/leather" onClick={() => setIsMenuOpen(false)} className="text-lg text-primary-800 hover:text-[var(--color-accent)] transition-colors">
                                    Leather Goods
                                </Link>
                                <Link to="/category/heritage" onClick={() => setIsMenuOpen(false)} className="text-lg text-primary-800 hover:text-[var(--color-accent)] transition-colors">
                                    Heritage Style
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="p-6 border-t-2 border-primary-900 bg-white">
                    {user ? (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[var(--color-beige-bg)] border-2 border-primary-900 flex items-center justify-center">
                                    <FiUser strokeWidth={2.5} className="text-primary-900" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-primary-900 uppercase tracking-wide">{user.firstName}</p>
                                    <p className="text-[10px] font-mono text-[var(--color-accent)] tracking-widest font-bold">AUTHOR</p>
                                </div>
                            </div>
                            <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-primary-400 hover:text-[var(--color-accent)] transition-colors" title="Sign out">
                                <FiLogOut size={22} strokeWidth={2.5} />
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center justify-center gap-2 w-full py-3 border-2 border-primary-900 text-primary-900 font-bold hover:bg-primary-900 hover:text-white transition-colors uppercase tracking-widest text-sm font-mono"
                        >
                            <FiUser /> Contributor Login
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default Header;
