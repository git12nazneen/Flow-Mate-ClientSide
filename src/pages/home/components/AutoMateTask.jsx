import Container from "@/components/Container";
import React from "react";
import flowchart from "../../../assets/pr.png";
const AutoMateTask = () => {
  return (

    <div className="relative z-9 px-0 pt-[70px] pb-[120px] bg-[#00053d] bg-[radial-gradient(rgba(255,255,255,0)_0%,transparent_10%),radial-gradient(rgba(255,255,255,0.25)_0%,transparent_10%)] bg-[length:20px_20px] bg-[0_0,40px_40px] mx-auto">
      <h1 className="text-gray-200 text-4xl text-center pb-4 font-bold">
        Tasks System
      </h1>
      <div className="flex justify-center items-center px-0 lg:px-10">
        <div className="flex lg:flex-row flex-col gap-5 text-white justify-center lg:justify-between ">
          <div className="lg:w-[450px] w-auto space-y-10 pt-7 px-5 lg:px-0">
            <h1 className="lg:text-start text-center text-xl lg:text-5xl font-bold">
              Automate tasks <br /> to save time
            </h1>
            <p className="lg:text-start text-center space-y-3 lg:w-[450px] w-auto">
              Save time on routine tasks. Whether you have a simple process or a
              complex workflow, our online project management platform has a
              drag-and-drop interface that makes new automations easier to
              visualize and deploy.
            </p>
            <div className='bg-[#393d6dc7] hover:bg-black shadow-lg shadow-slate-300 rounded-xl px-5 lg:px-7 py-5 lg:py-10'>
              <h1 className='font-bold text-sm lg:text-2xl'>"We have managed to save 10% of our workforce time using FlowMate."</h1>
            </div>

          </div>
          <div className='flex-1 text-end'>
            <img className='w-auto lg:w-[680px] h-auto lg:h-[510px] ' src={flowchart} alt='Automate tasks' />
          </div>
        </div>
  </div>
  </div>
 
  );
};

export default AutoMateTask;
