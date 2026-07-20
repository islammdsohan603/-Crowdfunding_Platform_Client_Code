'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiBell, FiMenu, FiUser, FiX } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { authClient, useSession } from '@/lib/auth-client';
import { apiRequest, clearAccessToken, createAccessToken } from '@/lib/api';

const developerRepo =
  'https://github.com/islammdsohan603/-Crowdfunding_Platform_Client_Code.git';

const Navbar = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      if (!session?.user?.email) {
        setProfile(null);
        return;
      }

      try {
        await createAccessToken(session.user.email);
        await apiRequest('/api/users/register', {
          method: 'POST',
          body: JSON.stringify({
            displayName: session.user.name,
            email: session.user.email,
            photoURL: session.user.image,
            role: 'Supporter',
          }),
        });
        const result = await apiRequest('/api/users/me');
        setProfile(result.data);
      } catch (error) {
        setProfile(null);
      }
    };

    loadProfile();
  }, [session?.user?.email, session?.user?.image, session?.user?.name]);

  const handleLogout = async () => {
    clearAccessToken();
    await authClient.signOut();
    toast.success('Logged out successfully!');
    router.push('/login');
  };

  const closeMenu = () => setIsMobileMenuOpen(false);
  const isLoggedIn = Boolean(session?.user);

  const links = isLoggedIn
    ? [{ href: '/dashboard', label: 'Dashboard' }]
    : [
        { href: '/explors', label: 'Explore Campaigns' },
        { href: '/login', label: 'Login' },
        { href: '/signup', label: 'Register' },
      ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 font-sans transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0f162e]/80 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3)] border-b border-gray-800 py-2'
          : 'bg-[#0f162e] border-b border-gray-800 py-4'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between relative z-50">
        <Link href="/" className="text-2xl md:text-3xl font-extrabold text-[#0B57D0] tracking-tight">
          Momentum
        </Link>

        <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-gray-200">
          {links.map(link => (
            <Link key={link.href} href={link.href} className="hover:text-blue-400 pb-1 transition-colors">
              {link.label}
            </Link>
          ))}
          <a
            href={developerRepo}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
          >
            Join as Developer
          </a>
        </div>

        <div className="flex items-center space-x-4 md:space-x-5">
          {isLoggedIn && (
            <Link
              href="/dashboard/purchase-credit"
              className="hidden sm:block bg-[#0B57D0] hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 lg:px-5 rounded-lg transition-colors whitespace-nowrap shadow-lg shadow-blue-500/20"
            >
              {profile?.credits ?? 0} Credits
            </Link>
          )}

          {isLoggedIn && (
            <Link href="/dashboard" className="text-gray-200 hover:text-blue-400 transition-colors">
              <FiBell size={20} />
            </Link>
          )}

          <div className="flex items-center justify-center">
            {session?.user?.image ? (
              <Link href="/dashboard/profile">
                <Image
                  src={session.user.image}
                  alt="User Profile"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-transparent hover:border-blue-500 transition-all object-cover"
                />
              </Link>
            ) : (
              <Link href="/signup" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FiUser size={22} />
              </Link>
            )}
          </div>

          {isLoggedIn && (
            <button onClick={handleLogout} className="hidden sm:block text-sm text-red-300 hover:text-red-200">
              Logout
            </button>
          )}

          <button
            className="lg:hidden text-gray-200 hover:text-blue-400 cursor-pointer transition-colors ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.div animate={{ rotate: isMobileMenuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden absolute top-full left-0 w-full bg-[#0b0f1a]/95 backdrop-blur-xl border-b border-gray-800 px-6 py-5 shadow-2xl flex flex-col space-y-4 -z-10"
          >
            {links.map(link => (
              <Link key={link.href} href={link.href} className="text-gray-200 hover:text-blue-400" onClick={closeMenu}>
                {link.label}
              </Link>
            ))}
            <a href={developerRepo} target="_blank" rel="noreferrer" className="text-blue-400" onClick={closeMenu}>
              Join as Developer
            </a>
            {isLoggedIn && (
              <>
                <Link href="/dashboard/purchase-credit" className="text-gray-200" onClick={closeMenu}>
                  Available Credits: {profile?.credits ?? 0}
                </Link>
                <button onClick={handleLogout} className="text-left text-red-300">
                  Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
