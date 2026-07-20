'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CompaginsCard = ({ data, index }) => {
  const {
    _id,
    campaignTitle,
    campaignStory,
    fundingGoal,
    amountRaised,
    campaignImage,
    status,
  } = data;

  console.log(data);

  const safeFundingGoal = fundingGoal > 0 ? fundingGoal : 1;
  const progressPercentage = Math.min(
    (amountRaised / safeFundingGoal) * 100,
    100,
  ).toFixed(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      whileHover={{ y: -10 }}
      className="bg-[#12141d]/80 backdrop-blur-md border border-gray-800 rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_40px_rgba(37,99,235,0.15)] hover:border-gray-700 transition-all duration-300 group cursor-pointer flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={campaignImage}
          alt={campaignTitle}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Status Badge */}
        {status && (
          <div className="absolute top-4 left-4 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-md">
            {status}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-100 mb-3 line-clamp-1 group-hover:text-blue-400 transition-colors">
          {campaignTitle}
        </h3>
        <p className="text-gray-400 text-sm mb-8 line-clamp-2 leading-relaxed">
          {campaignStory}
        </p>

        {/* Funding Stats & Progress Bar */}
        <div className="mt-auto">
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-2xl font-bold text-blue-500">
                {amountRaised.toLocaleString()}{' '}
                <span className="text-lg font-semibold">Credits</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Raised of {fundingGoal.toLocaleString()}
              </p>
            </div>
            <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
              {progressPercentage}%
            </span>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full bg-gray-800 rounded-full h-2 mt-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progressPercentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
              className="bg-linear-to-r from-blue-600 to-emerald-400 h-2 rounded-full relative"
            >
              {/* Progress Bar Glow Head */}
              <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 blur-sm rounded-full"></div>
            </motion.div>
          </div>

          <Link
            href={`/explors/${_id}`}
            className="mt-4 block text-center bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition-colors font-semibold"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CompaginsCard;
