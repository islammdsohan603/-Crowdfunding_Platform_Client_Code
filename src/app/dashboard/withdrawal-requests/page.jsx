'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { apiRequest } from '@/lib/api';

const WithdrawalRequestsPage = () => {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const result = await apiRequest('/api/withdrawals?status=pending');
    setItems(result.data || []);
  };

  useEffect(() => {
    loadItems().catch(() => {});
  }, []);

  const approve = async id => {
    await apiRequest(`/api/withdrawals/${id}/approve`, { method: 'PATCH' });
    toast.success('Payment marked successful.');
    loadItems();
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#12141d] p-6">
      <h1 className="text-3xl font-bold">Withdrawal Requests</h1>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="text-gray-400"><tr><th className="p-3">Creator</th><th className="p-3">Credits</th><th className="p-3">Amount</th><th className="p-3">System</th><th className="p-3">Action</th></tr></thead>
          <tbody>
            {items.map(item => (
              <tr key={item._id} className="border-t border-gray-800">
                <td className="p-3">{item.creatorName}</td><td className="p-3">{item.withdrawalCredit}</td><td className="p-3">${item.withdrawalAmount}</td><td className="p-3">{item.paymentSystem}</td>
                <td className="p-3"><button onClick={() => approve(item._id)} className="rounded-lg bg-emerald-600 px-3 py-2">Payment Success</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawalRequestsPage;
