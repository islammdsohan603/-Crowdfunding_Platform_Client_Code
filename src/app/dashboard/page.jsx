'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiRequest } from '@/lib/api';

const roleHome = {
  Supporter: '/dashboard/supporter-home',
  Creator: '/dashboard/creator-home',
  Admin: '/dashboard/admin-home',
};

const DashboardPage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    apiRequest('/api/users/me').then(result => setProfile(result.data)).catch(() => {});
  }, []);

  if (!profile) {
    return <div className="rounded-2xl border border-gray-800 bg-[#12141d] p-8">Loading dashboard...</div>;
  }

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#12141d] p-8">
      <h1 className="text-3xl font-bold text-white">Welcome, {profile.displayName}</h1>
      <p className="mt-3 text-gray-400">
        You are signed in as a {profile.role}. Use your role dashboard to manage your Momentum activity.
      </p>
      <Link
        href={roleHome[profile.role] || '/dashboard/supporter-home'}
        className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
      >
        Open {profile.role} Home
      </Link>
    </div>
  );
};

export default DashboardPage;
