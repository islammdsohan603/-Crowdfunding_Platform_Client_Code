"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  FiEye,
  FiEyeOff,
  FiLoader,
  FiUser,
  FiMail,
  FiLock,
  FiImage,
} from "react-icons/fi";

const SignUpPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUpForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const users = Object.fromEntries(formData.entries());

    if (users.password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name: users.name,
        email: users.email,
        password: users.password,
        image: users.image,
      });

      console.log(data);

      if (error) {
        toast.error(error.message || "Failed to create account");
      } else {
        toast.success("Account Created Successfully!");
        router.push("/login");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-[#1F2937] text-white pl-10 pr-4 py-3 rounded-xl border border-white/10 focus:border-blue-500 outline-none transition-all";

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#111827] p-8 rounded-3xl border border-white/5 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-tight">
          Create Account
        </h2>

        <form onSubmit={handleSignUpForm} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <FiUser className="absolute left-3 top-3.5 text-gray-400" />
            <input
              required
              type="text"
              name="name"
              placeholder="Full Name"
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-3 top-3.5 text-gray-400" />
            <input
              required
              type="email"
              name="email"
              placeholder="Email Address"
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute left-3 top-3.5 text-gray-400" />
            <input
              required
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password (min 6 chars)"
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

          {/* Image */}
          <div className="relative">
            <FiImage className="absolute left-3 top-3.5 text-gray-400" />
            <input
              required
              type="url"
              name="image"
              placeholder="Photo URL"
              className={inputClass}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2"
          >
            {loading ? <FiLoader className="animate-spin" /> : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-400 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
