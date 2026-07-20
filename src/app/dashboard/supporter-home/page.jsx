'use client';

import React, { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';

const SupporterHomePage = () => {
  const [stats, setStats] = useState({});
  const [approved, setApproved] = useState([]);

  useEffect(() => {
    Promise.all([
      apiRequest('/api/stats'),
      apiRequest('/api/contributions?status=approved&limit=100'),
    ]).then(([statsResult, contributionsResult]) => {
      setStats(statsResult.data || {});
      setApproved(contributionsResult.data || []);
    }).catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          ['Total Contributions', stats.contributionCount || 0],
          ['Pending Contributions', stats.pendingContributions || 0],
          ['Approved Amount', `${stats.approvedAmount || 0} credits`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-gray-800 bg-[#12141d] p-6">
            <p className="text-sm text-gray-400">{label}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-800 bg-[#12141d] p-6">
        <h1 className="text-2xl font-bold">Approved Contributions</h1>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-gray-400">
              <tr>
                <th className="p-3">Campaign</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Creator</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {approved.map(item => (
                <tr key={item._id} className="border-t border-gray-800">
                  <td className="p-3">{item.campaignTitle}</td>
                  <td className="p-3">{item.contributionAmount}</td>
                  <td className="p-3">{item.creatorName}</td>
                  <td className="p-3 capitalize text-emerald-400">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupporterHomePage;
