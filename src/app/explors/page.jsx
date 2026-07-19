import CompaginsCard from '@/components/explorsdata/CompaginsCard';
import { getAllData } from '@/db/data';
import React from 'react';

const ExplorsPages = async () => {
  // ডাটা সেফটি চেক (যদি ডাটা না থাকে তবে খালি অ্যারে)
  const alldata = (await getAllData()) || [];

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

        {/* Campaigns Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {alldata.map((data, index) => (
            <CompaginsCard key={data._id || index} data={data} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorsPages;
