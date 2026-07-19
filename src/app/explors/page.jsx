import { getAllData } from '@/db/data';
import React from 'react';

const ExplorsPages = async () => {
  const alldata = await getAllData();

  console.log(alldata);

  return (
    <div>
      <h1>all data</h1>
    </div>
  );
};

export default ExplorsPages;
