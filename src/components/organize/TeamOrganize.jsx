import React from "react";

const TeamOrganize = () => {
  const services = [
    {
      id: 1,
      title: "Organize your work your way",
      description:
        "Whether it’s for work, a side project, or even the next family vacation, Trello helps your team stay organized.",
      image:
        "https://images.pexels.com/photos/6335/man-coffee-cup-pen.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      title: "Collaborate with your team",
      description:
        "From brainstorming to planning to execution, Trello allows you to collaborate seamlessly with your team.",
      image:
        "https://images.pexels.com/photos/3727456/pexels-photo-3727456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 3,
      title: "Stay on top of your tasks",
      description:
        "With Trello’s visual boards, lists, and cards, you can manage tasks and stay on top of deadlines effortlessly.",
      image:
        "https://images.pexels.com/photos/27934883/pexels-photo-27934883/free-photo-of-holding-graphic-tablet-device-blank-screen-mockup.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];
  return (
    <div>

      <div className="my-5 lg:my-20 px-10 lg:px-auto pb-7 lg:pb-0">
        <h2 className="text-center text-xl lg:text-4xl md:text-4xl font-bold leading-8 text-slate-800 pb-5">
        The platform that
          <span className="text-[#00053d]"> brings</span> your team together.
        </h2>
        <p className="text-center text-sm text-slate-800">
        Collaborate, manage projects, and reach new productivity peaks with
        FlowMate.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`bg-white shadow-lg rounded-lg p-6 transform h-[500px] lg:h-[420px] transition-transform duration-300 ease-in-out hover:shadow-xl hover:scale-105 ${
              index === 1
                ? "scale-105 translate-y-[-20px] mt-10 lg:mt-32" // Make the middle card larger and slightly elevated
                : ""
            }`}
          >
            <img
              className={`w-full h-48 object-cover rounded-md mb-6 hover:scale-100${
                index === 1 ? "h-56" : ""
              }`} // Middle card image will have slightly larger height
              src={service.image}
              alt={service.title}
            />
            <div className="flex items-center justify-between mb-4">
              <span className="text-green-500 text-xl font-semibold">{`0${service.id}`}</span>
              <button className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Active Status
              </button>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamOrganize;
