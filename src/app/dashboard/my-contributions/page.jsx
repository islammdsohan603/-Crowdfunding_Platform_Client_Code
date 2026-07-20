'use client';

import React, { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';

const MyContributionsPage = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    apiRequest(`/api/contributions?page=${page}&limit=8`).then(result => {
      setItems(result.data || []);
      setTotalPages(result.totalPages || 1);
    }).catch(() => {});
  }, [page]);

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#12141d] p-6">
      <h1 className="text-3xl font-bold">My Contributions</h1>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-gray-400">
            <tr>
              <th className="p-3">Campaign</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Creator</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item._id} className="border-t border-gray-800">
                <td className="p-3">{item.campaignTitle}</td>
                <td className="p-3">{item.contributionAmount}</td>
                <td className="p-3">{item.creatorName}</td>
                <td className="p-3">{new Date(item.currentDate).toLocaleDateString()}</td>
                <td className="p-3">
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-blue-300 capitalize">{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-center gap-3">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="rounded-lg bg-gray-800 px-4 py-2 disabled:opacity-40">
          Previous
        </button>
        <span className="px-4 py-2 text-gray-300">Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="rounded-lg bg-gray-800 px-4 py-2 disabled:opacity-40">
          Next
        </button>
      </div>
    </div>
  );
};

export default MyContributionsPage;
