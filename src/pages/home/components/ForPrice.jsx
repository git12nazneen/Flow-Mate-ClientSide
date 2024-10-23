import React from 'react';
import img from '../../../assets/men.webp';
import { Link } from 'react-router-dom';
const ForPrice = () => {
  return (
    <div>
      <div class="flex justify-center items-center  bg-gray-100 py-10 lg:pb-5">
        <div class="flex flex-col md:flex-row items-center gap-10 md:gap-20">

          <div class="flex justify-center items-center">
            <img src={img} alt="Illustration" class="h-60 md:h-80 " />
          </div>

          <div class="text-center md:text-left">
            <h1 class="text-xl lg:text-3xl md:text-5xl  text-gray-800 mb-4">
              Make real work happen
            </h1>
            <p class="text-lg text-gray-500 mb-6">
              Start your free trial
            </p>
            <Link to='/pricing' class="px-8 py-3 bg-[#00053d] text-white text-lg rounded-full hover:bg-blue-300 transition">
              Try for Free
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ForPrice;