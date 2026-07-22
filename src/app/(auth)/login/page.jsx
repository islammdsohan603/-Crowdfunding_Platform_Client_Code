'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';
import { apiRequest, createAccessToken } from '@/lib/api';
import { FiLoader } from 'react-icons/fi'; // Loader Import করা হলো

const LogInPage = () => {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false); // Google Loading State
  const router = useRouter();

  const ensureServerUser = async user => {
    await createAccessToken(user.email);
    await apiRequest('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({
        displayName: user.name,
        email: user.email,
        photoURL: user.image,
        role: 'Supporter',
      }),
    });
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true); // লোডিং শুরু
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
      });
      // রিডাইরেক্ট হওয়ার কারণে আর false করার দরকার নেই
    } catch (error) {
      toast.error('Google Login failed!');
      setGoogleLoading(false); // ফেইল করলে লোডিং বন্ধ হবে
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: '/dashboard',
      });

      if (error) {
        toast.error(error.message || 'Invalid credentials');
      } else {
        await ensureServerUser(data.user);
        toast.success('Login Successful!');
        router.push('/dashboard');
      }
    } catch (err) {
      toast.error(err.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-6 pt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#111827] p-8 rounded-2xl border border-white/10 shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full bg-[#1F2937] text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full bg-[#1F2937] text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            disabled={loading || googleLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" /> Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Google Auth Button with Loading */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
          className="mt-4 w-full rounded-xl border border-gray-700 py-3 font-semibold text-gray-200 hover:bg-gray-800 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {googleLoading ? (
            <>
              <FiLoader className="animate-spin text-lg" /> Redirecting...
            </>
          ) : (
            'Continue with Google'
          )}
        </button>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LogInPage;
