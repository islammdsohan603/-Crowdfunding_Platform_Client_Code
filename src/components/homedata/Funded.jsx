import { getFundedData } from '@/db/data';
import React from 'react';

const FundedPage = async () => {
  const compaigns = await getFundedData();
  console.log(compaigns);

  return <div></div>;
};

export default FundedPage;
