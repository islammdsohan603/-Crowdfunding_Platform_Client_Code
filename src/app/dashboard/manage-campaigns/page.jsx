'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { apiRequest, serverUrl } from '@/lib/api';

const ManageCampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);

  const loadCampaigns = async () => {
    const token = localStorage.getItem('access-token');
    const res = await fetch(`${serverUrl}/api/campaigns?includeAll=true&limit=200`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await res.json();
    setCampaigns(result.data || []);
  };

  useEffect(() => {
    loadCampaigns().catch(() => {});
  }, []);

  const updateStatus = async (id, status) => {
    await apiRequest(`/api/campaigns/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
    toast.success(`Campaign ${status}.`);
    loadCampaigns();
  };

  const deleteCampaign = async id => {
    if (!window.confirm('Delete campaign?')) return;
    await apiRequest(`/api/campaigns/${id}`, { method: 'DELETE' });
    toast.success('Campaign deleted.');
    loadCampaigns();
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#12141d] p-6">
      <h1 className="text-3xl font-bold">Manage Campaigns</h1>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="text-gray-400"><tr><th className="p-3">Title</th><th className="p-3">Creator</th><th className="p-3">Goal</th><th className="p-3">Raised</th><th className="p-3">Status</th><th className="p-3">Actions</th></tr></thead>
          <tbody>
            {campaigns.map(campaign => (
              <tr key={campaign._id} className="border-t border-gray-800">
                <td className="p-3">{campaign.campaignTitle}</td><td className="p-3">{campaign.creatorEmail}</td><td className="p-3">{campaign.fundingGoal}</td><td className="p-3">{campaign.amountRaised}</td><td className="p-3 capitalize">{campaign.status}</td>
                <td className="p-3">
                  {campaign.status === 'pending' && (
                    <>
                      <button onClick={() => updateStatus(campaign._id, 'approved')} className="mr-2 rounded-lg bg-emerald-600 px-3 py-2">Approve</button>
                      <button onClick={() => updateStatus(campaign._id, 'rejected')} className="mr-2 rounded-lg bg-yellow-600 px-3 py-2">Reject</button>
                    </>
                  )}
                  <button onClick={() => deleteCampaign(campaign._id)} className="rounded-lg bg-red-600 px-3 py-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCampaignsPage;
