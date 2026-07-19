import { getFundedData } from '@/db/data';
import React from 'react';
import FundedCard from './FundedCard';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const FundedPage = async () => {
  const compaigns = (await getFundedData()) || [];

  return (
    <div className="bg-[#0b0f1a] py-20 min-h-screen font-sans">
      <div className="w-11/12 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400 mb-4 tracking-tight">
              Top Funded Campaigns
            </h1>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light">
              Discover the projects that are capturing the imagination of our
              global supporter base right now.
            </p>
          </div>
          <Link
            href={'/campaigns'}
            className="group flex items-center gap-2 text-blue-500 hover:text-blue-400 font-semibold transition-all duration-300 whitespace-nowrap"
          >
            <span>View All Campaigns</span>
            <ExternalLink
              size={18}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {compaigns.map((compaign, index) => (
            <FundedCard
              key={compaign._id || index}
              compaign={compaign}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FundedPage;
