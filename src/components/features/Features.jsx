import team from "../../assets/teamImg.jpg";
import collab from "../../assets/teamCollaboration.jpg";
import task from "../../assets/task management.jpg";
import secure from "../../assets/secure.jpg";
import success from "../../assets/sucess.jpg";
import team1 from "../../assets/team.png";
import team4 from "../../assets/team4.png";
import team3 from "../../assets/team3.png";
import team2 from "../../assets/team2.png";

import '../features/Animated.css'
import Button2COmmon from "../button2Commo.jsx/Button2COmmon";
const Features = () => {
  return (
    <div className="bg-gradient-to-b from-[#1e3a8a] to-[#299edd] text-white container mx-auto">
      <div className="flex flex-col md:flex-row lg:justify-between justify-center items-center py-10 px-10 lg:px-20 max-w-7xl mx-auto">
        {/* Left Section */}
        <div className="flex flex-col w-auto lg:w-[440px] text-center lg:text-left md:text-left md:mr-10">
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-7">
            Discover the <span className="text-black"> Power </span> of <br /> team work
          </h2>
          <p className="text-gray-100 mb-2 text-sm lg:text-sm">
            Manage your tasks efficiently with FlowMate’s intuitive task
            management features, helping you assign, track, and complete
            projects with ease.
          </p>
          <p className="text-gray-100 mb-2 text-sm lg:text-sm">
            Whether your team is in the office or remote, FlowMate keeps
            everyone connected with integrated video conferencing and chat
            features.
          </p>{" "}
          <p className="text-gray-100 mb-6 text-sm lg:text-sm">
            Keep track of project progress visually with Gant charts and
            timelines, ensuring every team member stays on schedule and meets
            deadlines.
          </p>
          <div className="w-60">
            <Button2COmmon text=" Register an Account" />
          </div>
        </div>
        {/* Right Section */}
        <div className="relative w-[270px] lg:w-[420px] h-[300px] lg:h-[390px] mx-auto my-10 bg-gradient-to-r from-blue-200 via-gray-100 to-blue-100 rounded-full p-4 shadow-gray-900 shadow-2xl">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 lg:w-20 lg:h-20 rounded-full bg-white flex items-center justify-center shadow-lg font-bold text-2xl z-10  p-10 border border-blue-400">
            <div className="p-10 lg:p-24 border border-blue-600   rounded-full text-black">FM</div>
          </div>

          {/* Rotating Container */}
          <div className="absolute inset-0 animate-rotate-circle">
            {/* Top Middle Image */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 lg:w-20 lg:h-20 rounded-full bg-gray-100 flex items-center justify-center shadow-md">
              <img
                src={success}
                alt="Team"
                className="rounded-full w-10 h-10 lg:w-20 lg:h-20 counter-rotate bg-[#92e3ff]"
              />
            </div>

            {/* Top Right Image */}
            <div className="absolute top-[10%] left-[80%] transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 lg:w-20 lg:h-20 rounded-full bg-gray-100 flex items-center justify-center shadow-md">
              <img
                src={collab}
                alt="Collab"
                className="rounded-full w-10 h-10 lg:w-20 lg:h-20 counter-rotate bg-[#92e3ff]"
              />
            </div>

            {/* Right Middle Image */}
            <div className="absolute top-1/2 left-[95%] transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 lg:w-20 lg:h-20 rounded-full bg-gray-100 flex items-center justify-center shadow-md">
              <img
                src={team1}
                alt="Team"
                className="rounded-full w-10 h-10 lg:w-20 lg:h-20 counter-rotate bg-[#92e3ff]"
              />
            </div>
            <div className="absolute top-[80%] left-[85%] transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 lg:w-20 lg:h-20 rounded-full bg-gray-100 flex items-center justify-center shadow-md">
              <img
                src={team2}
                alt="Collab"
                className="rounded-full w-10 h-10 lg:w-20 lg:h-20 counter-rotate bg-[#92e3ff]"
              />
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-10 h-10 lg:w-20 lg:h-20 rounded-full bg-gray-100 flex items-center justify-center shadow-md">
              <img
                src={secure}
                alt="Secure"
                className="rounded-full w-10 h-10 lg:w-20 lg:h-20 counter-rotate bg-[#92e3ff]"
              />
            </div>
            <div className="absolute top-[80%] left-[15%] transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 lg:w-20 lg:h-20 rounded-full bg-gray-100 flex items-center justify-center shadow-md">
              <img
                src={task}
                alt="Task"
                className="rounded-full w-10 h-10 lg:w-20 lg:h-20 counter-rotate bg-[#92e3ff]"
              />
            </div>
            <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 lg:w-20 lg:h-20 rounded-full bg-gray-100 flex items-center justify-center shadow-md">
              <img
                src={team3}
                alt="Task"
                className="rounded-full w-10 h-10 lg:w-20 lg:h-20 counter-rotate bg-[#92e3ff]"
              />
            </div>
            <div className="absolute top-[20%] left-[10%] transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 lg:w-20 lg:h-20 rounded-full bg-gray-100 flex items-center justify-center shadow-md">
              <img
                src={team4}
                alt="Secure"
                className="rounded-full w-10 h-10 lg:w-20 lg:h-20 counter-rotate bg-[#92e3ff]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
