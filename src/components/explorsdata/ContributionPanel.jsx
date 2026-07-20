'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { apiRequest } from '@/lib/api';

const ContributionPanel = ({ campaign }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [reason, setReason] = useState('');

  const contribute = async e => {
    e.preventDefault();
    try {
      await apiRequest('/api/contributions', {
        method: 'POST',
        body: JSON.stringify({
          campaignId: campaign._id,
          contributionAmount: Number(amount),
          message,
        }),
      });
      toast.success('Contribution submitted for creator review.');
      setAmount('');
      setMessage('');
    } catch (error) {
      toast.error(error.message || 'Contribution failed');
    }
  };

  const report = async e => {
    e.preventDefault();
    try {
      await apiRequest('/api/reports', {
        method: 'POST',
        body: JSON.stringify({ campaignId: campaign._id, reason }),
      });
      toast.success('Report submitted.');
      setReason('');
    } catch (error) {
      toast.error(error.message || 'Report failed');
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={contribute} className="space-y-4">
        <input
          required
          type="number"
          min={campaign.minimumContribution || 1}
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Contribution amount"
          className="w-full rounded-xl border border-gray-700 bg-[#0B0F19] p-3 text-white"
        />
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Optional message"
          rows={3}
          className="w-full rounded-xl border border-gray-700 bg-[#0B0F19] p-3 text-white"
        />
        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
          Contribute Now
        </button>
      </form>

      <form onSubmit={report} className="border-t border-gray-800 pt-5">
        <textarea
          required
          value={reason}
          onChange={e => setReason(e.target.value)}
          placeholder="Report suspicious or fraudulent campaign"
          rows={3}
          className="w-full rounded-xl border border-gray-700 bg-[#0B0F19] p-3 text-white"
        />
        <button className="mt-3 w-full rounded-xl border border-red-500/30 py-3 font-semibold text-red-300 hover:bg-red-500/10">
          Report Campaign
        </button>
      </form>
    </div>
  );
};

export default ContributionPanel;
