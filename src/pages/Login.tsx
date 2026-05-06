import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success('Log in successful');
      navigate('/');
    } catch (error) {
      toast.error('Google login failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl shadow-[#4A3322]/5 border border-[#E8E0D5]"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#4A3322]">Welcome Back</h2>
          <p className="mt-2 text-sm text-[#6D4C3D]">Enter your details to access your account</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A3322] uppercase tracking-wider mb-1 px-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D4C3D]" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border border-[#E8E0D5] rounded-xl py-3 pl-10 pr-4 text-sm text-[#4A3322] focus:outline-none focus:border-[#4A3322] transition-colors placeholder:text-[#E8E0D5]"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A3322] uppercase tracking-wider mb-1 px-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D4C3D]" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border border-[#E8E0D5] rounded-xl py-3 pl-10 pr-4 text-sm text-[#4A3322] focus:outline-none focus:border-[#4A3322] transition-colors placeholder:text-gray-200"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs px-1">
            <div className="flex items-center">
              <input type="checkbox" className="rounded border-[#E8E0D5] text-[#6D4C3D] focus:ring-[#6D4C3D]" />
              <label className="ml-2 text-[#6D4C3D]">Remember me</label>
            </div>
            <a href="#" className="text-[#6D4C3D] hover:text-[#4A3322] font-medium transition-colors">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6D4C3D] text-[#F7F4EF] py-4 rounded-full font-medium hover:bg-[#4A3322] transition-colors flex items-center justify-center gap-2"
          >
            {loading ? 'Logging in...' : 'Sign In'}
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="h-px bg-[#E8E0D5] flex-grow"></div>
          <span className="text-[10px] uppercase font-bold text-[#6D4C3D] tracking-widest">or</span>
          <div className="h-px bg-[#E8E0D5] flex-grow"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="mt-6 w-full bg-white border border-[#E8E0D5] text-[#4A3322] py-4 rounded-full font-medium hover:bg-[#F7F4EF] transition-colors flex items-center justify-center gap-3 shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Log in with Google
        </button>

        <p className="mt-8 text-center text-sm text-[#6D4C3D]">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#4A3322] font-bold hover:underline">Register Now</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
