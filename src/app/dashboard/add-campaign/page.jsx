'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { apiRequest, uploadToImgBB } from '@/lib/api';

const fields = [
  ['campaignTitle', 'Campaign Title', 'text'],
  ['campaignStory', 'Campaign Story', 'textarea'],
  ['category', 'Category', 'text'],
  ['fundingGoal', 'Funding Goal', 'number'],
  ['minimumContribution', 'Minimum Contribution', 'number'],
  ['deadline', 'Deadline', 'date'],
  ['rewardInfo', 'Reward Info', 'textarea'],
  ['campaignImage', 'Campaign Image URL', 'url'],
];

const AddCampaignPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      if (payload.imageFile?.size) {
        payload.campaignImage = await uploadToImgBB(payload.imageFile);
      }
      delete payload.imageFile;

      await apiRequest('/api/campaigns', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      toast.success('Campaign submitted for admin approval.');
      e.currentTarget.reset();
    } catch (error) {
      toast.error(error.message || 'Failed to add campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#12141d] p-6">
      <h1 className="text-3xl font-bold">Add New Campaign</h1>
      <p className="mt-2 text-gray-400">New campaigns stay pending until an admin approves them.</p>
      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {fields.map(([name, label, type]) => (
          <label key={name} className={type === 'textarea' ? 'md:col-span-2' : ''}>
            <span className="mb-2 block text-sm text-gray-300">{label}</span>
            {type === 'textarea' ? (
              <textarea
                required
                name={name}
                rows={4}
                className="w-full rounded-xl border border-gray-700 bg-[#0B0F19] p-3 text-white outline-none focus:border-blue-500"
              />
            ) : (
              <input
                required={name !== 'campaignImage'}
                name={name}
                type={type}
                className="w-full rounded-xl border border-gray-700 bg-[#0B0F19] p-3 text-white outline-none focus:border-blue-500"
              />
            )}
          </label>
        ))}
        <label className="md:col-span-2">
          <span className="mb-2 block text-sm text-gray-300">Upload Campaign Image</span>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            className="w-full text-sm text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white"
          />
        </label>
        <button
          disabled={loading}
          className="md:col-span-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-500 disabled:opacity-60"
        >
          {loading ? 'Submitting...' : 'Add Campaign'}
        </button>
      </form>
    </div>
  );
};

export default AddCampaignPage;
