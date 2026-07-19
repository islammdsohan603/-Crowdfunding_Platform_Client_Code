import React from 'react';

const LoadingDetails = () => {
  return (
    <div className="bg-[#0b0f1a] min-h-screen pb-20 animate-pulse font-sans">
      {/* Skeleton Top Banner */}
      <div className="relative w-full h-[400px] md:h-[500px] bg-gray-900/50">
        <div className="absolute bottom-0 left-0 w-full max-w-7xl mx-auto px-5 lg:px-12 pb-10">
          <div className="flex gap-3 mb-4">
            <div className="h-8 w-24 bg-gray-800 rounded-full"></div>
            <div className="h-8 w-24 bg-gray-800 rounded-full"></div>
          </div>
          <div className="h-12 md:h-16 w-3/4 bg-gray-800 rounded-lg mb-4"></div>
          <div className="h-6 w-1/3 bg-gray-800 rounded-lg"></div>
        </div>
      </div>

      {/* Skeleton Main Content */}
      <div className="max-w-7xl mx-auto px-5 lg:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Skeleton Left Column */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <div className="h-8 w-48 bg-gray-800 rounded-lg mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-800/60 rounded"></div>
              <div className="h-4 w-full bg-gray-800/60 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-800/60 rounded"></div>
              <div className="h-4 w-4/6 bg-gray-800/60 rounded"></div>
            </div>
          </section>

          <section className="bg-[#12141d]/50 border border-gray-800 rounded-2xl p-8">
            <div className="h-6 w-36 bg-gray-800 rounded mb-4"></div>
            <div className="h-24 w-full bg-gray-800/50 rounded-xl"></div>
          </section>
        </div>

        {/* Skeleton Right Column */}
        <div className="lg:col-span-1">
          <div className="bg-[#12141d]/50 border border-gray-800 rounded-2xl p-8 h-[450px]">
            <div className="h-10 w-1/2 bg-gray-800 rounded mb-2"></div>
            <div className="h-4 w-1/3 bg-gray-800/60 rounded mb-8"></div>
            <div className="h-3 w-full bg-gray-800 rounded-full mb-4"></div>
            <div className="flex justify-between mb-8">
              <div className="h-4 w-1/4 bg-gray-800/60 rounded"></div>
              <div className="h-4 w-1/4 bg-gray-800/60 rounded"></div>
            </div>
            <div className="h-14 w-full bg-gray-800 rounded-xl mb-12"></div>
            <div className="h-4 w-1/3 bg-gray-800/60 rounded mb-2"></div>
            <div className="h-6 w-1/2 bg-gray-800 rounded mb-2"></div>
            <div className="h-4 w-2/3 bg-gray-800/60 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDetails;
