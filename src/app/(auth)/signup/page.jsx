'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';
import { apiRequest, createAccessToken, uploadToImgBB } from '@/lib/api';
import {
  FiEye,
  FiEyeOff,
  FiImage,
  FiLoader,
  FiLock,
  FiMail,
  FiUser,
} from 'react-icons/fi';

const SignUpPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
    });
  };

  const handleSignUpForm = async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const users = Object.fromEntries(formData.entries());

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(users.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(users.password)) {
      toast.error('Password must be 6+ characters and include a number.');
      return;
    }

    setLoading(true);

    try {
      const uploadedImage = users.imageFile?.size
        ? await uploadToImgBB(users.imageFile)
        : '';
      const photoURL = uploadedImage || users.image;

      const { error } = await authClient.signUp.email({
        name: users.name,
        email: users.email,
        password: users.password,
        image: photoURL,
      });

      if (error) {
        toast.error(error.message || 'Failed to create account');
        return;
      }

      await createAccessToken(users.email);
      await apiRequest('/api/users/register', {
        method: 'POST',
        body: JSON.stringify({
          displayName: users.name,
          email: users.email,
          photoURL,
          role: users.role,
        }),
      });

      toast.success('Account created successfully!');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-[#1F2937] text-white pl-10 pr-4 py-3 rounded-xl border border-white/10 focus:border-blue-500 outline-none transition-all';

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-6 pt-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#111827] p-8 rounded-3xl border border-white/5 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-tight">
          Create Account
        </h2>

        <form onSubmit={handleSignUpForm} className="space-y-5">
          <div className="relative">
            <FiUser className="absolute left-3 top-3.5 text-gray-400" />
            <input required type="text" name="name" placeholder="Full Name" className={inputClass} />
          </div>

          <div className="relative">
            <FiMail className="absolute left-3 top-3.5 text-gray-400" />
            <input required type="email" name="email" placeholder="Email Address" className={inputClass} />
          </div>

          <select
            required
            name="role"
            defaultValue="Supporter"
            className="w-full bg-[#1F2937] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-blue-500 outline-none transition-all"
          >
            <option value="Supporter">Supporter - starts with 50 credits</option>
            <option value="Creator">Creator - starts with 20 credits</option>
          </select>

          <div className="relative">
            <FiLock className="absolute left-3 top-3.5 text-gray-400" />
            <input
              required
              type={showPass ? 'text' : 'password'}
              name="password"
              placeholder="Password with letters and numbers"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3.5 text-gray-400"
            >
              {showPass ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className="relative">
            <FiImage className="absolute left-3 top-3.5 text-gray-400" />
            <input type="url" name="image" placeholder="Photo URL" className={inputClass} />
          </div>

          <input
            type="file"
            name="imageFile"
            accept="image/*"
            className="w-full text-sm text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white"
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2"
          >
            {loading ? <FiLoader className="animate-spin" /> : 'Sign Up'}
          </motion.button>
        </form>

        <button
          onClick={handleGoogleSignUp}
          className="mt-4 w-full rounded-xl border border-gray-700 py-3 font-semibold text-gray-200 hover:bg-gray-800"
        >
          Continue with Google
        </button>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 font-medium hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
