'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { apiRequest } from '@/lib/api';

const WithdrawalsPage = () => {
  const [profile, setProfile] = useState(null);
  const [credits, setCredits] = useState('');
  const amount = useMemo(() => Number(credits || 0) / 20, [credits]);

  useEffect(() => {
    apiRequest('/api/users/me').then(result => setProfile(result.data)).catch(() => {});
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    try {
      await apiRequest('/api/withdrawals', {
        method: 'POST',
        body: JSON.stringify({ ...payload, withdrawalCredit: Number(payload.withdrawalCredit) }),
      });
      toast.success('Withdrawal request submitted.');
      e.currentTarget.reset();
      setCredits('');
    } catch (error) {
      toast.error(error.message || 'Withdrawal failed');
    }
  };

  const raisedCredits = Number(profile?.raisedCredits || 0);
  const canWithdraw = raisedCredits >= 200;

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#12141d] p-6">
      <h1 className="text-3xl font-bold">Withdrawals</h1>
      <p className="mt-2 text-gray-400">
        Current raised credits: <span className="text-emerald-400">{raisedCredits}</span>. Available amount: ${raisedCredits / 20}.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <input
          required
          name="withdrawalCredit"
          type="number"
          min="200"
          max={raisedCredits}
          value={credits}
          onChange={e => setCredits(e.target.value)}
          placeholder="Credits To Withdraw"
          className="rounded-xl border border-gray-700 bg-[#0B0F19] p-3"
        />
        <input readOnly value={`$${amount}`} className="rounded-xl border border-gray-700 bg-[#0B0F19] p-3 text-gray-300" />
        <select required name="paymentSystem" className="rounded-xl border border-gray-700 bg-[#0B0F19] p-3">
          <option>Stripe</option><option>Bkash</option><option>Rocket</option><option>Nagad</option>
        </select>
        <input required name="accountNumber" placeholder="Account Number" className="rounded-xl border border-gray-700 bg-[#0B0F19] p-3" />
        {canWithdraw ? (
          <button className="md:col-span-2 rounded-xl bg-blue-600 px-5 py-3 font-bold hover:bg-blue-500">Withdraw</button>
        ) : (
          <p className="md:col-span-2 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">Insufficient credit</p>
        )}
      </form>
    </div>
  );
};

export default WithdrawalsPage;
