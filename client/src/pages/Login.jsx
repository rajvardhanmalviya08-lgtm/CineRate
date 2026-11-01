import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Film, Eye, EyeOff, Lock, Mail, ShieldAlert, Sparkles } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await login(email, password);
    setSubmitting(false);
    if (res.success) {
      navigate(from, { replace: true });
    }
  };

  const handleAutofill = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen bg-cine-bg flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-amber-500 p-0.5 shadow-glow-purple">
              <div className="w-full h-full bg-cine-darker rounded-[14px] flex items-center justify-center">
                <Film className="w-6 h-6 text-cine-gold" />
              </div>
            </div>
            <span className="text-3xl font-black text-white">
              Cine<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400">Rate</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-white mt-4">Welcome Back</h2>
          <p className="text-sm text-gray-400 mt-1">Sign in to rate, review and build your watchlist</p>
        </div>

        {/* Card */}
        <div className="glass-panel p-8 rounded-2xl border border-cine-border shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  required
                  className="w-full bg-cine-darker border border-cine-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
                <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-cine-darker border border-cine-border rounded-xl pl-10 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
                <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-glow-purple transition-all duration-200 mt-2 disabled:opacity-50"
            >
              {submitting ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="mt-6 pt-5 border-t border-cine-border">
            <p className="text-xs text-gray-400 mb-2 font-semibold text-center">
              Quick Test Accounts (Click to Fill):
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleAutofill('admin@cinerate.com', 'Admin@123456')}
                className="px-3 py-1.5 rounded-lg bg-cine-darker border border-amber-500/40 text-amber-400 hover:bg-amber-500/10 text-xs font-semibold transition-colors text-center"
              >
                Admin Demo
              </button>
              <button
                type="button"
                onClick={() => handleAutofill('user@cinerate.com', 'User@123456')}
                className="px-3 py-1.5 rounded-lg bg-cine-darker border border-purple-500/40 text-purple-300 hover:bg-purple-500/10 text-xs font-semibold transition-colors text-center"
              >
                User Demo
              </button>
            </div>
          </div>

          <div className="text-center mt-6 text-xs text-gray-400">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-purple-400 hover:text-purple-300 font-semibold underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

