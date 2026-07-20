'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { apiRequest } from '@/lib/api';

const packages = [
  { credits: 100, price: 10 },
  { credits: 300, price: 25 },
  { credits: 800, price: 60 },
  { credits: 1500, price: 110 },
];

const PurchaseCreditPage = () => {
  const [loading, setLoading] = useState(null);

  const buyPackage = async pack => {
    setLoading(pack.credits);
    try {
      await apiRequest('/api/payments/create-intent', {
        method: 'POST',
        body: JSON.stringify(pack),
      });
      await apiRequest('/api/payments/confirm', {
        method: 'POST',
        body: JSON.stringify({ ...pack, transactionId: `local-${Date.now()}` }),
      });
      toast.success(`${pack.credits} credits added successfully.`);
    } catch (error) {
      toast.error(error.message || 'Payment failed');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#12141d] p-6">
      <h1 className="text-3xl font-bold">Purchase Credit</h1>
      <p className="mt-2 text-gray-400">Stripe intent is requested when configured; local fallback confirms a dummy payment.</p>
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {packages.map(pack => (
          <button
            key={pack.credits}
            onClick={() => buyPackage(pack)}
            className="rounded-2xl border border-gray-800 bg-[#0B0F19] p-6 text-left transition hover:-translate-y-1 hover:border-blue-500/50"
          >
            <p className="text-3xl font-bold text-emerald-400">{pack.credits}</p>
            <p className="mt-1 text-gray-400">credits</p>
            <p className="mt-5 text-2xl font-bold">${pack.price}</p>
            <span className="mt-5 inline-block rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold">
              {loading === pack.credits ? 'Processing...' : 'Buy Package'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PurchaseCreditPage;
