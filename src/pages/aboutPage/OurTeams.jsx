import { useEffect } from "react";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const teamMembers = [
  {
    name: "Nabila Ferdous",
    role: "Project Manager",
    description:
      "An expert in managing projects, ensuring timely deliveries, and coordinating the team's efforts for optimal results.",
    image:
      "https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    name: "Md Sajib Hossen",
    role: "Lead Developer",
    description:
      "Skilled in multiple technologies, leading the development efforts with innovative solutions and expertise.",
    image: "https://cdn.tuk.dev/assets/photo-1564061170517-d3907caa96ea.jfif",
  },
  {
    name: "Sabbir Hossen",
    role: "UI/UX Designer",
    description:
      "Passionate about creating user-friendly designs and improving user experiences through intuitive interfaces.",
    image:
      "https://www.shutterstock.com/image-photo/profile-picture-smiling-successful-young-260nw-2040223583.jpg",
  },
  {
    name: "Ariful Islam Shawon",
    role: "Backend Developer",
    description:
      "Responsible for building and maintaining the server, application, and database, ensuring efficiency and scalability.",
    image:
      "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-260nw-1714666150.jpg",
  },
  {
    name: "Nazneen Lipi",
    role: "QA Engineer",
    description:
      "Ensures the product meets the required standards and works seamlessly by identifying and fixing bugs.",
    image:
      "https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  },
 
];

const TeamSection = () => {
  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);

  return (
    <div className="mb-16 max-w-7xl mx-auto">
      <div className="flex justify-center mx-auto pt-16 ">
        <div className="mx-auto max-w-3xl text-center pb-12 md:pb-20">
          <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-4xl">
            Building Team
          </h1>
          <p className="text-center text-gray-500">
            The Talented People Behind the Scenes of the Organization
          </p>
        </div>
      </div>
      <div className="w-full bg-gray-100 px-10 pt-10">
        {/* Grid layout for cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              data-aos="fade-up" 
              data-aos-duration="600" // Duration of animation
              className="relative mt-16 mb-32 sm:mb-24 transform transition-transform duration-300 hover:scale-105 rounded-md"
            >
              <div className="rounded overflow-hidden shadow-md bg-white hover:bg-sky-50 transition-all duration-300 lg:h-80 h-96 flex flex-col justify-between">
                <div className="absolute -mt-20 w-full flex justify-center">
                  <div className="h-32 w-32">
                    <img
                      src={member.image}
                      alt={`Display Picture of ${member.name}`}
                      className="rounded-full object-cover h-full w-full shadow-md"
                    />
                  </div>
                </div>
                <div className="px-6 mt-16 flex-grow flex flex-col justify-between">
                  <div>
                    <h1 className="font-bold text-3xl text-center mb-1">
                      {member.name}
                    </h1>
                    <p className="text-gray-800 text-sm text-center">
                      {member.role}
                    </p>
                    <p className="text-center text-gray-600 text-base pt-3 font-normal">
                      {member.description}
                    </p>
                  </div>
                  <div className="w-full flex justify-center pt-5 pb-5">
                    <a href="javascript:void(0)" className="mx-5">
                      <FaGithub size={24} color="#718096" />
                    </a>
                    <a href="javascript:void(0)" className="mx-5">
                      <FaTwitter size={24} color="#718096" />
                    </a>
                    <a href="javascript:void(0)" className="mx-5">
                      <FaInstagram size={24} color="#718096" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
