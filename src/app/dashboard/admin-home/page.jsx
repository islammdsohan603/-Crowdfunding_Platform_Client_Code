'use client';

import React, { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';

const AdminHomePage = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    apiRequest('/api/stats').then(result => setStats(result.data || {})).catch(() => {});
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {[
        ['Total Supporters', stats.supporters || 0],
        ['Total Creators', stats.creators || 0],
        ['Available Credits', stats.totalCredits || 0],
        ['Payments Processed', stats.payments || 0],
      ].map(([label, value]) => (
        <div key={label} className="rounded-2xl border border-gray-800 bg-[#12141d] p-6">
          <p className="text-sm text-gray-400">{label}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminHomePage;
