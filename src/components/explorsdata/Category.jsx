'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const categories = [
  { id: 'all', name: 'All Campaigns', icon: '🌐' },
  { id: 'Agriculture', name: 'Agriculture', icon: '🌾' },
  { id: 'Animal Welfare', name: 'Animal Welfare', icon: '🐾' },
  { id: 'Art', name: 'Art', icon: '🎨' },
  { id: 'Community', name: 'Community', icon: '🏘️' },
  { id: 'Disaster Relief', name: 'Disaster Relief', icon: '🆘' },
  { id: 'Education', name: 'Education', icon: '📚' },
  { id: 'Environment', name: 'Environment', icon: '🌱' },
  { id: 'Health', name: 'Health', icon: '⚕️' },
  { id: 'Startup', name: 'Startup', icon: '🚀' },
  { id: 'Technology', name: 'Technology', icon: '💻' },
];

const Category = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';

  const handleCategoryChange = eOrId => {
    const id = typeof eOrId === 'string' ? eOrId : eOrId.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (id === 'all') {
      params.delete('category');
    } else {
      params.set('category', id);
    }
    params.set('page', '1');
    router.push(`/explors?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      {/* 📱 Mobile View: Dropdown */}
      <div className="block md:hidden bg-[#12141d] border border-gray-800 rounded-2xl p-4 shadow-lg mb-6">
        <label className="text-sm text-gray-400 mb-2 block font-medium flex items-center gap-2">
          <span className="w-1.5 h-4 bg-linear-to-b from-blue-500 to-emerald-400 rounded-full"></span>
          Filter by Category
        </label>
        <div className="relative">
          <select
            value={activeCategory}
            onChange={handleCategoryChange}
            className="w-full bg-[#1a1d29] text-white border border-gray-700/50 rounded-xl px-4 py-3.5 outline-none focus:border-blue-500 transition-colors appearance-none font-medium"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 💻 Desktop View: Sidebar */}
      <div className="hidden md:flex bg-[#12141d] border border-gray-800 rounded-2xl p-5 sticky top-24 shadow-lg z-10 max-h-[80vh] flex-col">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 shrink-0">
          <span className="w-1.5 h-6 bg-linear-to-b from-blue-500 to-emerald-400 rounded-full"></span>
          Categories
        </h2>

        <div className="flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-1">
          {categories.map(category => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.1)]'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 border border-transparent'
                }`}
              >
                <span
                  className={`text-xl transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                >
                  {category.icon}
                </span>
                <span
                  className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}
                >
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>

        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.02);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        `}</style>
      </div>
    </>
  );
};

export default Category;
