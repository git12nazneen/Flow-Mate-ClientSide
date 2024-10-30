
import React from "react";
import flowchart from "../../../assets/pr.png";

const AutoMateTask = () => {
  return (
    <div className="relative z-9 px-0 pt-[70px] pb-[120px] bg-[#00053d] bg-[radial-gradient(rgba(255,255,255,0)_0%,transparent_10%),radial-gradient(rgba(255,255,255,0.25)_0%,transparent_10%)] bg-[length:20px_20px] bg-[0_0,40px_40px] mx-auto">
      <h1 className="text-gray-200 text-3xl md:text-4xl text-center pb-4 font-bold">
        Tasks System
      </h1>
      <div className="flex justify-center items-center px-2 md:px-5 lg:px-10">
        <div className="flex flex-col md:flex-row gap-5 text-white justify-center lg:justify-between">
          <div className="md:w-[400px] lg:w-[450px] w-auto space-y-6 md:space-y-8 lg:space-y-10 pt-5 md:pt-7 px-4 md:px-0">
            <h1 className="text-center md:text-start text-2xl md:text-3xl lg:text-5xl font-bold">
              Automate tasks <br /> to save time
            </h1>
            <p className="text-center md:text-start md:w-[400px] lg:w-[450px] w-auto">
              Save time on routine tasks. Whether you have a simple process or a
              complex workflow, our online project management platform has a
              drag-and-drop interface that makes new automations easier to
              visualize and deploy.
            </p>
            <div className="bg-[#393d6dc7] hover:bg-black shadow-lg shadow-slate-300 rounded-xl px-5 md:px-6 lg:px-7 py-5 md:py-8 lg:py-10">
              <h1 className="font-bold text-sm md:text-lg lg:text-2xl">
                "We have managed to save 10% of our workforce time using FlowMate."
              </h1>
            </div>
          </div>
          <div className="flex-1 text-end">
            <img
              className="w-auto h-auto md:w-[500px] md:h-[380px] lg:w-[680px] lg:h-[510px]"
              src={flowchart}
              alt="Automate tasks"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoMateTask;
