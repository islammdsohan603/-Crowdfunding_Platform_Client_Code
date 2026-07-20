'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { apiRequest } from '@/lib/api';
import { useSession } from '@/lib/auth-client';

const MyCampaignsPage = () => {
  const { data: session } = useSession();
  const [campaigns, setCampaigns] = useState([]);

  const loadCampaigns = async () => {
    if (!session?.user?.email) return;
    const result = await apiRequest(`/api/campaigns/creator/${session.user.email}`);
    setCampaigns(result.data || []);
  };

  useEffect(() => {
    loadCampaigns().catch(() => {});
  }, [session?.user?.email]);

  const handleUpdate = async campaign => {
    const campaignTitle = window.prompt('Campaign title', campaign.campaignTitle);
    if (!campaignTitle) return;
    const campaignStory = window.prompt('Campaign story', campaign.campaignStory);
    const rewardInfo = window.prompt('Reward info', campaign.rewardInfo);
    await apiRequest(`/api/campaigns/${campaign._id}`, {
      method: 'PATCH',
      body: JSON.stringify({ campaignTitle, campaignStory, rewardInfo }),
    });
    toast.success('Campaign updated.');
    loadCampaigns();
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this campaign and refund approved supporters?')) return;
    await apiRequest(`/api/campaigns/${id}`, { method: 'DELETE' });
    toast.success('Campaign deleted.');
    loadCampaigns();
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#12141d] p-6">
      <h1 className="text-3xl font-bold">My Campaigns</h1>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="text-gray-400">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Deadline</th>
              <th className="p-3">Goal</th>
              <th className="p-3">Raised</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(campaign => (
              <tr key={campaign._id} className="border-t border-gray-800">
                <td className="p-3 font-semibold">{campaign.campaignTitle}</td>
                <td className="p-3">{new Date(campaign.deadline).toLocaleDateString()}</td>
                <td className="p-3">{campaign.fundingGoal}</td>
                <td className="p-3">{campaign.amountRaised}</td>
                <td className="p-3 capitalize">{campaign.status}</td>
                <td className="p-3">
                  <button onClick={() => handleUpdate(campaign)} className="mr-2 rounded-lg bg-blue-600 px-3 py-2">
                    Update
                  </button>
                  <button onClick={() => handleDelete(campaign._id)} className="rounded-lg bg-red-600 px-3 py-2">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCampaignsPage;
