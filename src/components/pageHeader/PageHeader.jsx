import React from 'react';
import img from '../../assets/ChatBc.png'
const PageHeader = ({ title, breadcrumb }) => {
  return (
    <div className="bg-blue-100 rounded-2xl p-6 flex items-center justify-between mx-10 my-10 shadow-xl">
      {/* Left side (Text and breadcrumb) */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        <nav className="text-sm text-gray-500 mt-2">
          <a href="#" className="hover:underline">Home</a>
          <span className="mx-2">•</span>
          <span>{breadcrumb}</span>
        </nav>
      </div>

      {/* Right side (Image) */}
      <div>
        <img src={img} alt="Page Illustration" className="w-32 h-32 object-cover" />
      </div>
    </div>
  );
};

export default PageHeader;
