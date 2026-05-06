import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    setLoading(true);
    try {
      await register(email, password);
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error('Registration failed');
    } finally {
      setLoading(false);
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
          <h2 className="text-3xl font-serif font-bold text-[#4A3322]">Create Account</h2>
          <p className="mt-2 text-sm text-[#6D4C3D]">Join our bakery community today</p>
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

            <div>
              <label className="block text-xs font-semibold text-[#4A3322] uppercase tracking-wider mb-1 px-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D4C3D]" size={18} />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent border border-[#E8E0D5] rounded-xl py-3 pl-10 pr-4 text-sm text-[#4A3322] focus:outline-none focus:border-[#4A3322] transition-colors placeholder:text-gray-200"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6D4C3D] text-[#F7F4EF] py-4 rounded-full font-medium hover:bg-[#4A3322] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#6D4C3D]/20 active:scale-[0.98]"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#6D4C3D]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#4A3322] font-bold hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
