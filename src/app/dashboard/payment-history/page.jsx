'use client';

import React, { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';

const PaymentHistoryPage = () => {
  const [payments, setPayments] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    Promise.allSettled([apiRequest('/api/payments'), apiRequest('/api/withdrawals')]).then(results => {
      if (results[0].status === 'fulfilled') setPayments(results[0].value.data || []);
      if (results[1].status === 'fulfilled') setWithdrawals(results[1].value.data || []);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-800 bg-[#12141d] p-6">
        <h1 className="text-2xl font-bold">Credit Payment History</h1>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="text-gray-400"><tr><th className="p-3">Credits</th><th className="p-3">Price</th><th className="p-3">Transaction</th><th className="p-3">Date</th></tr></thead>
            <tbody>
              {payments.map(item => (
                <tr key={item._id} className="border-t border-gray-800">
                  <td className="p-3">{item.credits}</td><td className="p-3">${item.price}</td><td className="p-3">{item.transactionId}</td><td className="p-3">{new Date(item.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="rounded-2xl border border-gray-800 bg-[#12141d] p-6">
        <h2 className="text-2xl font-bold">Withdrawal History</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="text-gray-400"><tr><th className="p-3">Credits</th><th className="p-3">Amount</th><th className="p-3">System</th><th className="p-3">Status</th></tr></thead>
            <tbody>
              {withdrawals.map(item => (
                <tr key={item._id} className="border-t border-gray-800">
                  <td className="p-3">{item.withdrawalCredit}</td><td className="p-3">${item.withdrawalAmount}</td><td className="p-3">{item.paymentSystem}</td><td className="p-3 capitalize">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryPage;
