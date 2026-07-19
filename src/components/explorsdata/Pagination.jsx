'use client';

import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, isLoading }) => {
  return (
    <div>
      <div className="join bg-[#12141d] border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="join-item btn bg-transparent border-none text-gray-400 hover:bg-gray-800 hover:text-white disabled:bg-transparent disabled:text-gray-600 font-bold transition-all px-5"
        >
          «
        </button>

        <button className="join-item btn bg-transparent border-none text-blue-400 font-semibold hover:bg-transparent cursor-default min-w-[140px]">
          {isLoading ? (
            <span className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin inline-block"></span>
          ) : (
            `Page ${currentPage} of ${totalPages}`
          )}
        </button>

        <button
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages || isLoading}
          className="join-item btn bg-transparent border-none text-gray-400 hover:bg-gray-800 hover:text-white disabled:bg-transparent disabled:text-gray-600 font-bold transition-all px-5"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
