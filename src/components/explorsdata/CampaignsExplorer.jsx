'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import CompaginsCard from './CompaginsCard';
import Pagination from './Pagination';
import { motion, AnimatePresence } from 'framer-motion';

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

const CampaignsExplorer = ({ initialData, initialTotalPages, initialPage }) => {
  const [campaigns, setCampaigns] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(initialPage || 1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const activeCategory = searchParams?.get('category') || 'all';
  const isFirstRender = useRef(true);

  const fetchCampaigns = async (page, category) => {
    setIsLoading(true);
    try {
      let url = `${baseUrl}/api/all/data?page=${page}&limit=6`;
      if (category && category !== 'all') {
        url += `&category=${encodeURIComponent(category)}`;
      }

      const res = await fetch(url);
      const result = await res.json();

      if (result.success) {
        setCampaigns(result.data);
        setTotalPages(result.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch campaigns on client:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 450);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setCurrentPage(1);
    fetchCampaigns(1, activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }

    fetchCampaigns(currentPage, activeCategory);
  }, [currentPage]);

  return (
    <div className="min-h-[450px] relative">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-[#12141d]/50 border border-gray-800/60 rounded-2xl h-[420px] p-6 animate-pulse flex flex-col justify-between"
              >
                <div className="w-full h-52 bg-gray-800/50 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-800/50 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-800/50 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-800/50 rounded w-2/3 mb-8"></div>
                <div className="h-12 bg-gray-800/30 rounded-xl w-full"></div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {campaigns.map((data, index) => (
              <CompaginsCard
                key={data._id || index}
                data={data}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-16 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CampaignsExplorer;
