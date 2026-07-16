"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
// react-icons থেকে আইকন ইমপোর্ট করা হচ্ছে
import { FiSearch, FiBell, FiUser } from "react-icons/fi";
import { useSession } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="w-full bg-[#F8FAFC] py-3 px-6 md:px-10 flex items-center justify-between border-b border-gray-200 font-sans">
      {/* === Left Side: Logo === */}
      <Link
        href="/"
        className="text-3xl font-extrabold text-[#0B57D0] tracking-tight"
      >
        Momentum
      </Link>

      {/* === Middle Side: Navigation Links === */}
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

      {/* === Right Side: Actions & Auth === */}
      <div className="flex items-center space-x-5">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search projects..."
            className="bg-[#E8EEF6] text-sm text-gray-700 placeholder-gray-500 rounded-full pl-4 pr-10 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-[#0B57D0] transition-all"
          />
          <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Purchase Button */}
        <button className="bg-[#0B57D0] hover:bg-blue-700 text-white text-sm font-medium py-2 px-5 rounded-lg transition-colors">
          Purchase Credit
        </button>

        {/* Notification Icon */}
        <button className="text-gray-600 hover:text-gray-900 transition-colors">
          <FiBell size={20} />
        </button>

        {/* Auth / User Profile Image */}
        <div className="flex items-center justify-center cursor-pointer">
          {session?.user?.image ? (
            // ইউজার লগ ইন থাকলে তার ছবি দেখাবে
            <Image
              src={session.user.image}
              alt="User Profile"
              width={32}
              height={32}
              className="rounded-full border border-gray-300 object-cover"
            />
          ) : (
            // ইউজার লগ ইন না থাকলে ডিফল্ট আইকন দেখাবে
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              <FiUser size={22} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
