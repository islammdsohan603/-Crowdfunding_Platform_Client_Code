import { getFundedData } from '@/db/data';
import React from 'react';
import FundedCard from './FundedCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const FundedPage = async () => {
  const compaigns = await getFundedData();
  console.log(compaigns);

  return (
    <div className="bg-[#0b0f1a] py-10">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1>Top Funded Campaigns</h1>
            <p>
              Discover the projects that are capturing the imagination of our
              global supporter base right now{' '}
            </p>
          </div>
          <Link href={'/'} className=" flex items-center gap-2 ">
            <h1>View all</h1>
            <ArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {compaigns.map(compaign => (
            <FundedCard key={compaign._id} compaign={compaign} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FundedPage;
