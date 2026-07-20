'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { apiRequest } from '@/lib/api';

const ReportsPage = () => {
  const [reports, setReports] = useState([]);

  const loadReports = async () => {
    const result = await apiRequest('/api/reports');
    setReports(result.data || []);
  };

  useEffect(() => {
    loadReports().catch(() => {});
  }, []);

  const deleteCampaign = async id => {
    if (!window.confirm('Delete reported campaign?')) return;
    await apiRequest(`/api/campaigns/${id}`, { method: 'DELETE' });
    toast.success('Campaign deleted.');
  };

  const suspendCampaign = async id => {
    await apiRequest(`/api/campaigns/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status: 'rejected' }) });
    toast.success('Campaign suspended.');
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#12141d] p-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="text-gray-400"><tr><th className="p-3">Reporter</th><th className="p-3">Campaign</th><th className="p-3">Reason</th><th className="p-3">Date</th><th className="p-3">Actions</th></tr></thead>
          <tbody>
            {reports.map(report => (
              <tr key={report._id} className="border-t border-gray-800">
                <td className="p-3">{report.reporterName}</td><td className="p-3">{report.campaignTitle}</td><td className="p-3">{report.reason}</td><td className="p-3">{new Date(report.date).toLocaleDateString()}</td>
                <td className="p-3">
                  <button onClick={() => suspendCampaign(report.campaignId)} className="mr-2 rounded-lg bg-yellow-600 px-3 py-2">Suspend</button>
                  <button onClick={() => deleteCampaign(report.campaignId)} className="rounded-lg bg-red-600 px-3 py-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;
