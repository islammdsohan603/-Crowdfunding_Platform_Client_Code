'use client';

import { useSession } from '@/lib/auth-client';
import React from 'react';

const DashBoardPage = () => {
  const { data: session, isPending } = useSession();

  const user = session?.user;

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#0b0f1a] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a] py-20 px-6 font-sans">
      <div className=" w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-14 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400 mb-4">
            Welcome, {user?.name ? user.name.toUpperCase() : 'USER'}! 👋
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your profile and account details here.
          </p>
        </div>

        {/* 3 Animated Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Profile Info */}
          <div className="bg-[#12141d] border border-gray-800 p-8 rounded-3xl shadow-lg transform transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_15px_40px_rgba(37,99,235,0.15)] hover:border-blue-500/40 group cursor-pointer">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
              <span className="text-3xl">👤</span>
            </div>
            <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-2 font-medium">
              Full Name
            </h3>
            <p className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {user?.name || 'Not Provided'}
            </p>
          </div>

          {/* Card 2: Contact Info */}
          <div className="bg-[#12141d] border border-gray-800 p-8 rounded-3xl shadow-lg transform transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_15px_40px_rgba(16,185,129,0.15)] hover:border-emerald-500/40 group cursor-pointer delay-75">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
              <span className="text-3xl">📧</span>
            </div>
            <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-2 font-medium">
              Email Address
            </h3>
            <p className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
              {user?.email || 'Not Provided'}
            </p>
          </div>

          {/* Card 3: Account Status */}
          <div className="bg-[#12141d] border border-gray-800 p-8 rounded-3xl shadow-lg transform transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_15px_40px_rgba(168,85,247,0.15)] hover:border-purple-500/40 group cursor-pointer delay-150">
            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
              <span className="text-3xl">🛡️</span>
            </div>
            <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-2 font-medium">
              Account Status
            </h3>
            <div className="flex items-center gap-3 mt-1">
              {/* Pulsing Dot */}
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
              </span>
              <p className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                Active
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
