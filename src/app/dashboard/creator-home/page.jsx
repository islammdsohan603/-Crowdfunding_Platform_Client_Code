'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { apiRequest } from '@/lib/api';

const CreatorHomePage = () => {
  const [stats, setStats] = useState({});
  const [contributions, setContributions] = useState([]);

  const loadData = async () => {
    const [statsResult, contributionsResult] = await Promise.all([
      apiRequest('/api/stats'),
      apiRequest('/api/contributions?status=pending&limit=100'),
    ]);
    setStats(statsResult.data || {});
    setContributions(contributionsResult.data || []);
  };

  useEffect(() => {
    loadData().catch(() => {});
  }, []);

  const updateStatus = async (id, status) => {
    await apiRequest(`/api/contributions/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    toast.success(`Contribution ${status}.`);
    loadData();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          ['Total Campaigns', stats.campaignCount || 0],
          ['Active Campaigns', stats.activeCampaigns || 0],
          ['Total Raised', `${stats.totalRaised || 0} credits`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-gray-800 bg-[#12141d] p-6">
            <p className="text-sm text-gray-400">{label}</p>
            <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-800 bg-[#12141d] p-6">
        <h1 className="text-2xl font-bold">Contributions To Review</h1>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-gray-400">
              <tr>
                <th className="p-3">Supporter</th>
                <th className="p-3">Campaign</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Message</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contributions.map(item => (
                <tr key={item._id} className="border-t border-gray-800">
                  <td className="p-3">{item.supporterName}</td>
                  <td className="p-3">{item.campaignTitle}</td>
                  <td className="p-3">{item.contributionAmount}</td>
                  <td className="p-3">{item.message || 'No message'}</td>
                  <td className="p-3">
                    <button onClick={() => updateStatus(item._id, 'approved')} className="mr-2 rounded-lg bg-emerald-600 px-3 py-2">
                      Approve
                    </button>
                    <button onClick={() => updateStatus(item._id, 'rejected')} className="rounded-lg bg-red-600 px-3 py-2">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
              {contributions.length === 0 && (
                <tr>
                  <td className="p-3 text-gray-400" colSpan={5}>No pending contributions.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreatorHomePage;
