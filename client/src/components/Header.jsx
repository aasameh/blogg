import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary-600">Blogg</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            to="/"
                            className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            to="/search"
                            className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
                        >
                            <FiSearch className="inline mr-1" />
                            Search
                        </Link>
                    </nav>

                    {/* Search + Auth */}
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:block w-64">
                            <SearchBar compact />
                        </div>

                        {user ? (
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600">
                                    {user.firstName} {user.lastName}
                                </span>
                                <button
                                    onClick={logout}
                                    className="text-gray-500 hover:text-red-500 transition-colors"
                                    title="Logout"
                                >
                                    <FiLogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                            >
                                <FiUser size={16} />
                                <span className="hidden sm:inline">Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
