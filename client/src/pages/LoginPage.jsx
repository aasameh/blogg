import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error?.message || 'Access Denied: Invalid Credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 px-4">
            <title>Restricted Access — Selvedge Archive</title>

            <Link
                to="/"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-primary-600 hover:text-[var(--color-accent)] mb-8 transition-colors group"
            >
                <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
                Return to Index
            </Link>

            <div className="bg-white border-4 border-primary-900 shadow-[8px_8px_0_0_var(--color-primary-900)] p-8">
                <div className="border-b-2 border-primary-900 pb-4 mb-6">
                    <span className="font-mono text-[10px] tracking-widest text-[var(--color-accent)] uppercase font-bold block mb-2">
                        /// Security Level 1
                    </span>
                    <h1 className="text-3xl font-serif font-black text-primary-900 uppercase">Author Access</h1>
                </div>

                <p className="text-primary-800 font-sans text-sm mb-8 leading-relaxed">
                    Verify credentials to access the{' '}
                    <a
                        href={`${import.meta.env.VITE_DIRECTUS_URL || 'http://localhost:8055'}/admin`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[var(--color-accent)] font-bold underline underline-offset-4 hover:text-primary-900"
                    >
                        Directus Control Panel
                    </a>.
                </p>

                {error && (
                    <div className="mb-6 p-4 border-2 border-[var(--color-accent)] bg-white text-[var(--color-accent)] font-mono text-xs font-bold tracking-widest uppercase">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-xs font-mono font-bold text-primary-900 mb-2 uppercase tracking-widest">
                            Email Identifier
                        </label>
                        <div className="relative">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-900" size={18} />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="AUTHOR@ARCHIVE.COM"
                                className="w-full pl-12 pr-4 py-3 bg-[var(--color-beige-bg)] border-2 border-primary-900 font-mono text-sm uppercase
                                focus:outline-none focus:ring-0 focus:border-[var(--color-accent)] focus:bg-white
                                placeholder-primary-300 transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-xs font-mono font-bold text-primary-900 mb-2 uppercase tracking-widest">
                            Passcode
                        </label>
                        <div className="relative">
                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-900" size={18} />
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="********"
                                className="w-full pl-12 pr-4 py-3 bg-[var(--color-beige-bg)] border-2 border-primary-900 font-mono text-sm
                                focus:outline-none focus:ring-0 focus:border-[var(--color-accent)] focus:bg-white
                                placeholder-primary-300 transition-colors"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 py-4 bg-primary-900 text-white font-mono font-bold text-lg uppercase tracking-widest border-2 border-primary-900
                        hover:bg-white hover:text-primary-900 focus:outline-none 
                        disabled:opacity-50 disabled:hover:bg-primary-900 disabled:hover:text-white disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Authenticating...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
