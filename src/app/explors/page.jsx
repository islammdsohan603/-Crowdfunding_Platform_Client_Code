import CampaignsExplorer from '@/components/explorsdata/CampaignsExplorer';
import { getAllData } from '@/db/data';
import React from 'react';

const ExplorsPages = async () => {
  const response = await getAllData();

  const initialData = response?.data || [];
  const initialTotalPages = response?.totalPages || 1;

  return (
    <div className="bg-[#0b0f1a] py-20 min-h-screen font-sans">
      <div className="w-11/12 max-w-7xl mx-auto">
        {/* Title & Header Section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400 mb-4 tracking-tight">
            All Campaigns
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light max-w-2xl">
            Explore all the active projects and innovative ideas from creators
            worldwide. Find a cause to support today.
          </p>
        </div>

        <CampaignsExplorer
          initialData={initialData}
          initialTotalPages={initialTotalPages}
        />
      </div>
    </div>
  );
};

export default ExplorsPages;
