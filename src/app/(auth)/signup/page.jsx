'use client';

import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async e => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error('পাসওয়ার্ড অবশ্যই ৬ ক্যারেক্টারের হতে হবে!');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const users = Object.fromEntries(formData.entries());
      const { data, error } = await authClient.signUp.email({
        email: users.email,
        password: users.password,
        name: users.name,
      });

      setLoading(false);

      if (data) {
        toast.success('Account Created Successfully!');
        router.push('/login');
      }

      if (error) {
        toast.error(error.message || 'Failed to create account');
      }
    } catch (err) {
      toast.error(err.message || 'সাইন আপ করতে সমস্যা হয়েছে!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#111827] p-8 rounded-2xl border border-white/10 shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="w-full bg-[#1F2937] text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full bg-[#1F2937] text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password (min 6 chars)"
            className="w-full bg-[#1F2937] text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setPassword(e.target.value)}
            required
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Sign Up'
            )}
          </motion.button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
