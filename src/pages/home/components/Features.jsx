import Container from "@/components/Container";
import { Command, Layout, ListFilter, TextQuote, Users } from "lucide-react";
import { IoNotificationsSharp } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Timeline from "../../../../public/images/features/image .png";
import Board from "../../../../public/images/features/board.png";
import List from "../../../../public/images/features/list.png";

import "../style.css";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const features = [
  {
    id: 1,
    title: "Board",
    description:
      "Manage your issues in a real-time automated kanban board with a drag and drop interface.",
    icon: <Layout />,
    image: Board,
  },
  {
    id: 2,
    title: "List",
    description:
      "Browse your issues and group them by labels, assignees, milestones, and more.",
    icon: <TextQuote />,
    image: List,
  },
  {
    id: 3,
    title: "Timeline",
    description:
      "With features like real-time collaboration and a chat system, you can work with your team seamlessly.",
    icon: <Users />,
    image: Timeline,
  },
];

const Features = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 150,
    });
  }, []);
  return (
    <Container className="mt-5 lg:mt-14">
      <div data-aos="zoom-in" className="text-center">
        <h1 className="text-xl lg:text-4xl md:text-4xl font-bold pb-5 px-5 lg:px-0">
          Breeze through issues at lighting speed
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-3xl mx-auto">
          Having trouble keeping track of your issues and their corresponding
          status as well as your team progress? Volta introduces the ultimate
          solution to manage your GitHub issues.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 my-10 md:my-16">
        <div className="col-span-1 md:col-span-2 bg-slate-300 text-gray-950 rounded-xl p-5 shadow-sm">
          <ListFilter className="w-10 h-10 border rounded-xl p-2 border-slate-500" />
          <h1 className="text-2xl font-bold text-[#00053d] py-2">
            Advance Filters
          </h1>
          <p className="text-zinc-800">
            Filter your notifications and issue by any property with logical operators.
          </p>
          <img
            className="pt-4"
            src="/images/features/filters.svg"
            alt="Filter icon"
            style={{ filter: "invert(1)" }}
          />
        </div>

        <div className="col-span-1 md:col-span-2 md:col-start-1 md:row-start-2 bg-slate-300 text-gray-950 rounded-xl pt-5 pl-5 shadow-sm">
          <div className="md:flex  justify-between">
            <div>
              <Command className="w-10 h-10 border rounded-xl p-2 border-slate-500" />
              <h1 className="text-2xl font-bold text-[#00053d] py-2">
                Keyboard-first Design
              </h1>
              <p className="text-zinc-800">
                Optimize for efficient keyboard navigation and shortcuts for everything.
              </p>
            </div>
            <img
              className="pt-4"
              src="/images/features/shortcuts.svg"
              alt=""
              style={{ filter: "invert(1)" }}
            />
          </div>
        </div>

        <div className="row-span-2 md:col-start-3 md:row-start-1 bg-slate-300 text-gray-950 rounded-xl pl-5 pt-5 shadow-sm">
          <IoNotificationsSharp className="w-10 h-10 border rounded-xl p-2 border-slate-500" />
          <h1 className="text-2xl font-bold text-[#00053d] py-2">
            Real-time Notifications
          </h1>
          <p className="text-zinc-800">
            Get notified of new issues, comments, and updates in real-time.
          </p>
          <img
            className="pt-4 pl-20"
            src="/images/features/editor.svg"
            alt=""
            style={{ filter: "invert(1)" }}
          />
        </div>
      </div>

    </Container>
  );
};

export default Features;
