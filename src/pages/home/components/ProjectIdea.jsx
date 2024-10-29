import React, { useEffect } from "react";
import task from "../../../assets/task.png";
import Container from "@/components/Container";
import AOS from "aos";
import "aos/dist/aos.css";
const ProjectIdea = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 150,
    });
  }, []);
  return (
    <div className="bg-gray-50">
      <Container>
        <div data-aos="zoom-in" className="text-center pt-10 pb-10">
          <h1 className="text-2xl md:text-4xl font-bold mb-5 ">
            Explore our project system
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
            For over a decade, more than 50,000 teams made Real Work happen with
            FlowMate. Here are the thoughts from our team on how collaboration
            helps us achieve success together.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center py-8 lg:py-16 px-8 gap-10">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-xl lg:text-4xl md:text-5xl text-gray-800 mb-6 capitalize">
              Built-in project time tracking & team reporting
            </h1>
            <p className="text-sm lg:text-lg text-gray-600 mb-4 ">
              Per project and task time tracking is as simple as possible and is
              designed in a way that requires little to no effort.{" "}
              <span className="font-semibold text-gray-800">
                Reporting features make daily check-ins unnecessary
              </span>{" "}
              as all work can be viewed and progress tracked by selected team
              members.
            </p>
            <p className="text-sm lg:text-lg text-gray-600 mb-6">
              Ditch additional task time-tracking software. Follow any project,
              any team's, and individual productivity in a single place.
            </p>
            <p className="text-purple-600 font-semibold mb-4 inline-block">
              Manage people and resources
            </p>
            <div className="flex space-x-4 text-purple-600 font-semibold">
              <p>My Work</p>
              <p>Time Tracking</p>
              <p>Team Reporting</p>
            </div>
          </div>

          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <img src={task} alt="Team Tracking UI" class="w-full h-auto" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProjectIdea;