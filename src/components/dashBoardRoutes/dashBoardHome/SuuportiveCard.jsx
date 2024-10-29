import React from 'react';

const SupportiveCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg max-w-xs">
        <div className='p-6'>
        <h2 className="text-4xl font-bold text-sky-500">500</h2>
      <h3 className="text-xl text-sky-500">Agent Response</h3>
      <p className="text-gray-600 mb-1">Total number of support requests that come in.</p>
      
        </div>
      
      {/* Area chart placeholder */}
      <div className="h-28 bg-sky-100 rounded-t-lg mt-4">
        {/* Replace this with your chart component */}
        <svg className="w-full h-full" viewBox="0 0 100 40">
          <path d="M0 30 L10 20 L20 25 L30 10 L40 15 L50 5 L60 15 L70 8 L80 20 L90 15 L100 30 L100 40 L0 40 Z" fill="rgb(160,223,251)" />
        </svg>
      </div>

      <div className="flex justify-between mt-1 bg-sky-400 rounded-b-xl">
        <div className='p-6 text-center'>
          <span className="text-lg font-bold text-white">50</span>
          <p className="text-sm text-white">Open</p>
        </div>
        <div className='p-6 text-center'>
          <span className="text-lg font-bold text-white">75</span>
          <p className="text-sm text-white">Running</p>
        </div>
        <div className='p-6 text-center'>
          <span className="text-lg font-bold text-white">30</span>
          <p className="text-sm text-white">Solved</p>
        </div>
      </div>
    </div>
  );
};




export default SupportiveCard;
