import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UseAdmin from "@/hooks/UseAdmin";
import { MdDashboard, MdMenu, MdClose } from "react-icons/md";
import Dropdown from "@/components/dropdown/Dropdown";
import ProjectCreate from "@/components/projectCreate/ProjectCreate";
import CommonButton from "@/components/commonButton/CommonButton";


const UpperNavigation = () => {
  const user = useSelector((state) => state.auth.user);
  const [isAdmin] = UseAdmin();
  const loading = useSelector((state) => state.auth.loading);
  const [isNavOpen, setIsNavOpen] = useState(false); // For responsive navigation
  const [currentTime, setCurrentTime] = useState(new Date());
  const [toggleOpen, setToggleOpen] = useState(false);

  const toggleHandler = () => {
    setToggleOpen(!toggleOpen);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = currentTime.toLocaleDateString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gradient-to-r from-slate-200 to-gray-300 text-slate-950">
      <nav className="flex flex-col lg:flex-row justify-between items-center px-6 py-4 bg-opacity-10 backdrop-filter backdrop-blur-lg sticky top-0 z-10">
        {/* Logo section */}
        <div className="flex items-center justify-between w-full lg:w-auto mb-4 lg:mb-0">
          <div className="flex items-center space-x-2">
            <MdDashboard className="text-3xl" />
            <Link to="/" className="text-2xl font-semibold">
              Dashboard
            </Link>
          </div>

         
          {/* Hamburger icon for mobile */}
          <button
            className="text-3xl lg:hidden"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {isNavOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>
        <div >
            <div className="relative" onClick={toggleHandler}>
              <CommonButton text="Create" />
            </div>
            {toggleOpen && <ProjectCreate />}
          </div>
        {/* Links and actions (responsive) */}
        <div
          className={`${isNavOpen ? "block" : "hidden"
            } w-full lg:w-auto lg:flex lg:flex-row lg:items-center lg:space-x-4`}
        >
          {/* Search field on its own line */}
          <div className="w-full lg:w-auto mb-4 lg:mb-0 mr-8">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2  bg-opacity-20 text-gray-900 bg-slate-500 placeholder-white rounded-md outline-none"
            />
          </div>
         
          {/* User actions and Date-Time */}
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 mx-8">
            {user && <Dropdown />}
            <div className="text-center flex text-sm">
              <p className="text-sm font-bold text-gray-600 pr-6">{formattedDate}</p>           
              <p className="text-sm font-bold text-gray-600">{formattedTime}</p>
            </div>
          </div>
          
        </div>
      </nav>
    </div>
  );
};

export default UpperNavigation;
