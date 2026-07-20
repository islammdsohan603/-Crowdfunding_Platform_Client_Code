'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import CompaginsCard from './CompaginsCard';
import Pagination from './Pagination';
import { motion, AnimatePresence } from 'framer-motion';

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

const CampaignsExplorer = ({ initialData, initialTotalPages, initialPage }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeCategory = searchParams?.get('category') || 'all';

  const [campaigns, setCampaigns] = useState(initialData || []);
  const [currentPage, setCurrentPage] = useState(initialPage || 1);
  const [totalPages, setTotalPages] = useState(initialTotalPages || 1);
  const [isLoading, setIsLoading] = useState(false);

  const isFirstRender = useRef(true);
  const prevCategory = useRef(activeCategory);

  useEffect(() => {
    setCampaigns(initialData);
    setTotalPages(initialTotalPages);
    setCurrentPage(initialPage || 1);
  }, [initialData, initialTotalPages, initialPage]);

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

        const params = new URLSearchParams(searchParams);
        params.set('page', page);
        if (category !== 'all') {
          params.set('category', category);
        } else {
          params.delete('category');
        }

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
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

    if (prevCategory.current !== activeCategory) {
      prevCategory.current = activeCategory;
      setCurrentPage(1);
      fetchCampaigns(1, activeCategory);
    } else {
      fetchCampaigns(currentPage, activeCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, activeCategory]);

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
        ) : campaigns?.length > 0 ? (
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
        ) : (
          <div className="flex justify-center items-center h-64 text-gray-400">
            No campaigns found for this category.
          </div>
        )}
      </AnimatePresence>

      {/* Pagination Section */}
      <div className="mt-16 flex justify-center">
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default CampaignsExplorer;
