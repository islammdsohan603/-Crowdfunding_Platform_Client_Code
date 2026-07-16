"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiBell, FiUser, FiMenu, FiX } from "react-icons/fi";
import { useSession } from "@/lib/auth-client";

import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="w-full bg-[#F8FAFC] border-b border-gray-200 font-sans relative z-50">
      <div className="py-3 px-6 md:px-10 flex items-center justify-between relative z-50 bg-[#F8FAFC]">
        {/* === Left Side: Logo === */}
        <Link
          href="/"
          className="text-2xl md:text-3xl font-extrabold text-[#0B57D0] tracking-tight"
        >
          Momentum
        </Link>

        {/* === Middle Side: Desktop Navigation === */}
        <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-gray-600">
          <Link
            href="/explore"
            className="text-[#0B57D0] border-b-2 border-[#0B57D0] pb-1"
          >
            Explore
          </Link>
          <Link
            href="/dashboard"
            className="hover:text-gray-900 pb-1 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/join"
            className="hover:text-gray-900 pb-1 transition-colors"
          >
            Join Developer
          </Link>
        </div>

        {/* === Right Side: Actions === */}
        <div className="flex items-center space-x-4 md:space-x-5">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search projects..."
              className="bg-[#E8EEF6] text-sm text-gray-700 placeholder-gray-500 rounded-full pl-4 pr-10 py-2 w-56 lg:w-64 focus:outline-none focus:ring-1 focus:ring-[#0B57D0] transition-all"
            />
            <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
          </div>

          <button className="hidden sm:block bg-[#0B57D0] hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 lg:px-5 rounded-lg transition-colors whitespace-nowrap">
            Purchase Credit
          </button>

          <button className="text-gray-600 hover:text-gray-900 transition-colors">
            <FiBell size={20} />
          </button>

          {/* Auth Profile */}
          <div className="flex items-center justify-center cursor-pointer">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt="User Profile"
                width={32}
                height={32}
                className="rounded-full border border-gray-300 object-cover"
              />
            ) : (
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                <FiUser size={22} />
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden text-gray-600 hover:text-gray-900 cursor-pointer transition-colors ml-2"
            onClick={toggleMenu}
          >
            {/* আইকনেও হালকা অ্যানিমেশন দেওয়া হলো */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* === Mobile Dropdown Menu with Framer Motion === */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden absolute top-full left-0 w-full bg-[#F8FAFC] border-b border-gray-200 px-6 py-5 shadow-xl flex flex-col space-y-4 -z-10"
          >
            <div className="relative w-full md:hidden">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full bg-[#E8EEF6] text-sm text-gray-700 placeholder-gray-500 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#0B57D0] transition-all"
              />
              <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex flex-col space-y-4 text-sm font-medium text-gray-600 pt-2">
              <Link
                href="/explore"
                className="text-[#0B57D0]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore
              </Link>
              <Link
                href="/dashboard"
                className="hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/join"
                className="hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join Developer
              </Link>
            </div>

            <button className="sm:hidden w-full bg-[#0B57D0] hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors mt-4 shadow-md">
              Purchase Credit
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
