import { getSingleData } from '@/db/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ExplorerDetailsPages = async ({ params }) => {
  const { id } = await params;
  const response = await getSingleData(id);
  const details = response?.data;

  if (!details) {
    return (
      <div className="bg-[#0b0f1a] min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
          <p className="text-gray-400 text-lg mb-6">Campaign data not found!</p>
          <Link
            href="/explors"
            className="btn bg-blue-600 hover:bg-blue-500 text-white border-none px-6"
          >
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  const safeFundingGoal = details.fundingGoal > 0 ? details.fundingGoal : 1;
  const progressPercentage = Math.min(
    (details.amountRaised / safeFundingGoal) * 100,
    100,
  ).toFixed(0);

  const deadlineDate = new Date(details.deadline);
  const today = new Date();
  const daysLeft = Math.max(
    0,
    Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24)),
  );

  return (
    <div className="bg-[#0b0f1a] min-h-screen pb-20 font-sans relative">
      {/* Top Image Banner */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        {/* Back to Explorers Button   */}
        <div className="absolute top-6 left-5 lg:left-12 z-20">
          <Link
            href="/explors"
            className="flex items-center gap-2 bg-black/40 hover:bg-black/70 text-white px-5 py-2.5 rounded-full backdrop-blur-md transition-all duration-300 border border-white/10 text-sm font-medium shadow-lg hover:shadow-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Explorers
          </Link>
        </div>

        <Image
          src={details.campaignImage}
          alt={details.campaignTitle}
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0b0f1a] via-[#0b0f1a]/60 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full max-w-7xl mx-auto px-5 lg:px-12 pb-10 z-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-md">
              {details.category}
            </span>
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider backdrop-blur-md">
              {details.status}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {details.campaignTitle}
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-light">
            Created by{' '}
            <span className="font-semibold text-white">
              {details.creatorName}
            </span>{' '}
            on {new Date(details.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-5 lg:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Story & Rewards */}
        <div className="lg:col-span-2 space-y-12">
          {/* Story Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
              Campaign Story
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-line">
              {details.campaignStory}
            </p>
          </section>

          {/* Reward Section */}
          <section className="bg-[#12141d]/80 border border-gray-800 rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">
              Support Reward
            </h3>
            <div className="bg-blue-900/10 border border-blue-900/30 p-5 rounded-xl">
              <p className="text-blue-200 text-lg font-medium mb-2">
                Contribute ${details.minimumContribution} or more
              </p>
              <p className="text-gray-400 leading-relaxed">
                {details.rewardInfo}
              </p>
            </div>
          </section>
        </div>

        {/* Right Column: Funding Stats & Action */}
        <div className="lg:col-span-1">
          <div className="bg-[#12141d] border border-gray-800 rounded-2xl p-8 sticky top-24 shadow-2xl">
            <div className="mb-8">
              <p className="text-4xl font-bold text-emerald-400 mb-2">
                ${details.amountRaised.toLocaleString()}
              </p>
              <p className="text-gray-500 text-sm">
                raised of{' '}
                <span className="text-gray-300 font-semibold">
                  ${details.fundingGoal.toLocaleString()}
                </span>{' '}
                goal
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-800 rounded-full h-3 mb-4 overflow-hidden">
              <div
                className="bg-linear-to-r from-blue-600 to-emerald-400 h-3 rounded-full relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 blur-sm rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm font-semibold mb-8">
              <span className="text-emerald-400">
                {progressPercentage}% Funded
              </span>
              <span className="text-gray-400">{daysLeft} Days Left</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                Contribute Now
              </button>
              <p className="text-center text-xs text-gray-500">
                Minimum contribution is ${details.minimumContribution}
              </p>
            </div>

            {/* Creator Mini-Profile */}
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-sm text-gray-500 mb-2">Campaign Organizer</p>
              <p className="text-white font-semibold text-lg">
                {details.creatorName}
              </p>
              <p className="text-blue-400 text-sm">{details.creatorEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorerDetailsPages;
