import React from "react";
import { Link } from "react-scroll";

const ShowModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg z-60 max-w-md w-full relative">
        <h2 className="text-xl font-bold mb-4">Subscribe to our newsletter!</h2>
        <div className="flex justify-between items-center">
          <Link
            to="subscribe" // Target ID
            smooth={true} // Smooth scrolling
            duration={500} // Duration of the scroll
            className="bg-[#00053d] text-white py-2 px-4 rounded hover:bg-blue-600 mb-2 cursor-pointer"
            onClick={onClose} // Close modal on click
          >
            Subscribe
          </Link>
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowModal;
