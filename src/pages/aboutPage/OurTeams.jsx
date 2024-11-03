import { useEffect } from "react";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import Marquee from "react-fast-marquee";

const teamitems = [
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

const OurTeams = () => {
    useEffect(() => {
        AOS.init(); // Initialize AOS
    }, []); // Empty dependency array to prevent infinite loop

    return (
        <div className="max-w-7xl mx-auto bg-transparent">
            <div className="flex justify-center mx-auto pb-10">
                <div className="my-5 lg:my-0">
                    <h2 className="text-center text-xl lg:text-4xl md:text-4xl font-bold leading-8 text-slate-800 pb-5">
                        Building <span className="text-[#00053d]">Team</span>
                    </h2>
                    <p className="text-center text-sm text-slate-800">
                        The Talented People Behind the Scenes of the Organization
                    </p>
                </div>
            </div>

            <div className="w-full px-10 pt-0 bg-transparent">
                <Marquee
                    direction="left"
                    gradient={false} // Removes any default gradient
                    autoFill
                    speed={20}
                    pauseOnHover
                    pauseOnClick
                >
                    {teamitems.map((item, index) => (
                        <div key={index} className="logo-container mr-[89px]">
                            <div
                                className="relative mt-16 mb-32 sm:mb-24 transform transition-transform duration-300 hover:scale-105 rounded-md"
                            >
                                <div className="rounded overflow-hidden shadow-md bg-transparent hover:bg-sky-50 transition-all duration-300 w-64 lg:h-60 h-96 flex flex-col justify-between mt-10">
                                    <div className="absolute -mt-20 w-full flex justify-center">
                                        <div className="h-32 w-32">
                                            <img
                                                src={item.image}
                                                alt={`Display Picture of ${item.name}`}
                                                className="rounded-full object-cover h-full w-full shadow-md bg-transparent"
                                            />
                                        </div>
                                    </div>
                                    <div className="px-6 mt-16 flex-grow flex flex-col justify-between">
                                        <div>
                                            <h1 className="font-bold text-2xl text-center mb-1">
                                                {item.name}
                                            </h1>
                                            <p className="text-gray-800 text-sm text-center">
                                                {item.role}
                                            </p>
                                        </div>
                                        <div className="w-full flex justify-center pb-5">
                                            <a href="#" className="mx-5">
                                                <FaGithub size={24} className="text-gray-500 hover:text-gray-700" />
                                            </a>
                                            <a href="#" className="mx-5">
                                                <FaTwitter size={24} className="text-gray-500 hover:text-gray-700" />
                                            </a>
                                            <a href="#" className="mx-5">
                                                <FaInstagram size={24} className="text-gray-500 hover:text-gray-700" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default OurTeams;
