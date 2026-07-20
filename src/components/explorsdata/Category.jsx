'use client'; // যেহেতু এখানে স্টেট (active category) ব্যবহার করা হচ্ছে

import React, { useState } from 'react';

// ক্যাটাগরির লিস্ট (আপনি চাইলে আপনার ডাটাবেসের ক্যাটাগরি অনুযায়ী পরিবর্তন করতে পারেন)
const categories = [
  { id: 'all', name: 'All Campaigns', icon: '🌐' },
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'medical', name: 'Medical', icon: '⚕️' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'charity', name: 'Charity', icon: '🤝' },
  { id: 'education', name: 'Education', icon: '📚' },
  { id: 'environment', name: 'Environment', icon: '🌱' },
];

const Category = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // ক্যাটাগরি চেঞ্জ করার ফাংশন
  const handleCategoryChange = id => {
    setActiveCategory(id);
    // পরবর্তীতে এখানে API কল বা URL প্যারামিটার চেঞ্জ করার লজিক বসাতে পারবেন
  };

  return (
    <div className="bg-[#12141d] border border-gray-800 rounded-2xl p-5 sticky top-24 shadow-lg z-10">
      {/* Title */}
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-emerald-400 rounded-full"></span>
        Categories
      </h2>

      {/* Category List */}
      <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
        {categories.map(category => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-all duration-300 whitespace-nowrap md:whitespace-normal group ${
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
                className={`text-sm md:text-base ${isActive ? 'font-semibold' : 'font-medium'}`}
              >
                {category.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Custom Scrollbar Hide CSS (Inline) */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Category;
