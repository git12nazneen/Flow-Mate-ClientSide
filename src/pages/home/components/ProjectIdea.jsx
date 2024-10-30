
// import React, { useEffect } from "react";
// import task from "../../../assets/task.png";
// import Container from "@/components/Container";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const ProjectIdea = () => {
//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: false,
//       offset: 150,
//     });
//   }, []);

//   return (
//     <div className="bg-gray-50">
//       <Container>
//         <div data-aos="zoom-in" className="text-center pt-8 pb-8 md:pt-10 md:pb-10">
//           <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-5">
//             Explore our project system
//           </h1>
//           <p className="text-gray-600 text-sm md:text-base max-w-2xl md:max-w-3xl mx-auto">
//             For over a decade, more than 50,000 teams made Real Work happen with
//             FlowMate. Here are the thoughts from our team on how collaboration
//             helps us achieve success together.
//           </p>
//         </div>
//         <div className="flex flex-col md:flex-col lg:flex-row justify-between items-center py-6 md:py-10 lg:py-16 px-6 md:px-8 lg:px-12 gap-6 md:gap-10">
//           <div className="w-full lg:w-1/2 text-center md:text-center lg:text-left">
//             <h1 className="text-lg md:text-3xl lg:text-4xl text-gray-800 mb-5 md:mb-6 capitalize">
//               Built-in project time tracking & team reporting
//             </h1>
//             <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-3 md:mb-4">
//               Per project and task time tracking is as simple as possible and is
//               designed in a way that requires little to no effort.{" "}
//               <span className="font-semibold text-gray-800">
//                 Reporting features make daily check-ins unnecessary
//               </span>{" "}
//               as all work can be viewed and progress tracked by selected team
//               members.
//             </p>
//             <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-5 md:mb-6">
//               Ditch additional task time-tracking software. Follow any project,
//               any team's, and individual productivity in a single place.
//             </p>
//             <p className="text-purple-600 font-semibold mb-3 md:mb-4 inline-block">
//               Manage people and resources
//             </p>
//             <div className="flex flex-col md:flex-row md:justify-center lg:justify-start space-y-2 md:space-y-0 md:space-x-4 text-purple-600 font-semibold">
//               <p>My Work</p>
//               <p>Time Tracking</p>
//               <p>Team Reporting</p>
//             </div>
//           </div>

//           <div className="w-full lg:w-1/2 mt-8 md:mt-10 lg:mt-0">
//             <img src={task} alt="Team Tracking UI" className="w-full h-auto" />
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default ProjectIdea;
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
        <div data-aos="zoom-in" className="text-center pt-8 pb-8 md:pt-10 md:pb-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-5">
            Explore our project system
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl md:max-w-3xl mx-auto">
            For over a decade, more than 50,000 teams made Real Work happen with
            FlowMate. Here are the thoughts from our team on how collaboration
            helps us achieve success together.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center py-6 md:py-10 lg:py-16 px-6 md:px-8 lg:px-12 gap-6 md:gap-10">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-lg md:text-lg lg:text-4xl text-gray-800 mb-5 md:mb-6 capitalize">
              Built-in project time tracking & team reporting
            </h1>
            <p className="text-sm md:text-sm lg:text-lg text-gray-600 mb-3 md:mb-4">
              Per project and task time tracking is as simple as possible and is
              designed in a way that requires little to no effort.{" "}
              <span className="font-semibold text-gray-800">
                Reporting features make daily check-ins unnecessary
              </span>{" "}
              as all work can be viewed and progress tracked by selected team
              members.
            </p>
            <p className="text-sm md:text-sm lg:text-lg text-gray-600 mb-5 md:mb-6">
              Ditch additional task time-tracking software. Follow any project,
              any team's, and individual productivity in a single place.
            </p>
            <p className="text-purple-600 font-semibold mb-3 md:mb-4 inline-block">
              Manage people and resources
            </p>
            <div className="flex flex-col md:flex-row md:justify-start space-y-2 md:space-y-0 md:space-x-4 text-purple-600 font-semibold">
              <p>My Work</p>
              <p>Time Tracking</p>
              <p>Team Reporting</p>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <img src={task} alt="Team Tracking UI" className="w-full h-auto" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProjectIdea;
