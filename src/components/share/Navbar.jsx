'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiBell, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useSession } from '@/lib/auth-client';

import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 font-sans transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0f162e]/80 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3)] border-b border-gray-800 py-1'
          : 'bg-[#0f162e] border-b border-gray-800 py-3'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between relative z-50">
        {/* === Left Side: Logo === */}
        <Link
          href="/"
          className="text-2xl md:text-3xl font-extrabold text-[#0B57D0] tracking-tight"
        >
          Momentum
        </Link>

        {/* === Middle Side: Desktop Navigation === */}
        <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-gray-200">
          <Link
            href="/explors"
            className="text-[#0B57D0] border-b-2 border-[#0B57D0] pb-1"
          >
            Explore
          </Link>
          <Link
            href="/dashboard"
            className="hover:text-gray-400 pb-1 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/join"
            className="hover:text-gray-400 pb-1 transition-colors"
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
              className="bg-[#1a2340] text-sm text-gray-200 placeholder-gray-400 rounded-full pl-4 pr-10 py-2 w-56 lg:w-64 focus:outline-none focus:ring-1 focus:ring-[#0B57D0] transition-all border border-gray-700/50"
            />
            <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-blue-400 transition-colors" />
          </div>

          <button className="hidden sm:block bg-[#0B57D0] hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 lg:px-5 rounded-lg transition-colors whitespace-nowrap shadow-lg shadow-blue-500/20">
            Purchase Credit
          </button>

          <button className="text-gray-200 hover:text-blue-400 transition-colors">
            <FiBell size={20} />
          </button>

          {/* Auth Profile */}
          <div className="flex items-center justify-center cursor-pointer">
            {session?.user?.image ? (
              <Link href={'dashboard/profile'}>
                <Image
                  src={session.user.image}
                  alt="User Profile"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-transparent hover:border-blue-500 transition-all object-cover"
                />
              </Link>
            ) : (
              <Link href={'/signup'}>
                <button className="text-gray-400 hover:text-blue-400 transition-colors">
                  <FiUser size={22} />
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden text-gray-200 hover:text-blue-400 cursor-pointer transition-colors ml-2"
            onClick={toggleMenu}
          >
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
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden absolute top-full left-0 w-full bg-[#0b0f1a]/95 backdrop-blur-xl border-b border-gray-800 px-6 py-5 shadow-2xl flex flex-col space-y-4 -z-10"
          >
            <div className="relative w-full md:hidden">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full bg-[#1a2340] text-sm text-gray-200 placeholder-gray-400 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#0B57D0] transition-all border border-gray-700/50"
              />
              <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex flex-col space-y-4 text-sm font-medium text-gray-200 pt-2">
              <Link
                href="/explors"
                className="text-[#0B57D0]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore
              </Link>
              <Link
                href="/dashboard"
                className="hover:text-blue-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/join"
                className="hover:text-blue-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join Developer
              </Link>
            </div>

            <button className="sm:hidden w-full bg-[#0B57D0] hover:bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg transition-colors mt-4 shadow-lg shadow-blue-500/20">
              Purchase Credit
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
