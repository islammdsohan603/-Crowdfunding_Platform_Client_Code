import CampaignsExplorer from '@/components/explorsdata/CampaignsExplorer';
import Category from '@/components/explorsdata/Category';
import { getAllData } from '@/db/data';
import React from 'react';

const ExplorsPages = async ({ searchParams }) => {
  const params = await searchParams;
  const currentCategory = params?.category || 'all';
  const currentPage = parseInt(params?.page, 10) || 1;

  const response = await getAllData(currentPage, 6, currentCategory);

  console.log(response);

  const initialData = response?.data || [];
  const initialTotalPages = response?.totalPages || 1;

  return (
    <div className="bg-[#0b0f1a] py-20 min-h-screen font-sans">
      <div className="w-11/12 max-w-7xl mx-auto">
        {/* Title & Header Section */}
        <div className="mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400 mb-4 tracking-tight">
              All Campaigns
            </h1>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light max-w-2xl">
              Explore all the active projects and innovative ideas from creators
              worldwide. Find a cause to support today.
            </p>
          </div>
        </div>

        {/* Updated Layout for Responsiveness */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          {/* Category Section: Full width on mobile, 1/4 width on desktop */}
          <div className="w-full md:w-1/4 lg:w-1/5 shrink-0">
            <Category />
          </div>

          {/* Campaigns Explorer: Takes remaining space on desktop */}
          <div className="w-full md:flex-1">
            <CampaignsExplorer
              initialData={initialData}
              initialTotalPages={initialTotalPages}
              initialPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorsPages;
