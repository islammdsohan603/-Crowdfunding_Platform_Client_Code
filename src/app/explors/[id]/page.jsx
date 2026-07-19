import { getSingleData } from '@/db/data';
import React from 'react';

// প্রপস থেকে params নেওয়া হলো
const ExplorerDetailsPages = async ({ params }) => {
  // params একটি প্রমিস (Next.js 14+), তাই await করে id বের করতে হবে
  const { id } = await params;

  // শুধুমাত্র id (স্ট্রিং) পাঠানো হলো
  const response = await getSingleData(id);

  // ব্যাকএন্ড থেকে { success, data } অবজেক্ট আসবে, তাই response.data থেকে ডাটা নিতে হবে
  const details = response?.data;

  return (
    <div className="bg-[#0b0f1a] min-h-screen py-20 text-white">
      <div className="max-w-4xl mx-auto px-5">
        {details ? (
          <>
            <h1 className="text-3xl font-bold mb-4">{details.campaignTitle}</h1>
            <p className="text-gray-400">{details.campaignStory}</p>
            {/* আপনার বাকি ডিজাইন এখানে করবেন */}
          </>
        ) : (
          <h1 className="text-2xl text-red-500">Data not found!</h1>
        )}
      </div>
    </div>
  );
};

export default ExplorerDetailsPages;
