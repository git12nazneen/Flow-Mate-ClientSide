import { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import DashBoardChart from "./dashBoardChart/DashBoardChart";
import CommonButton from "@/components/commonButton/CommonButton";
import ProjectCreate from "@/components/projectCreate/ProjectCreate";
import DashBoardCards from "../dashBoardCards/DashBoardCards";
// import VisitorInsightsChart from "../visitorInsightsChart/VisitorInsightsChart";
import { MdDashboard, MdMenu, MdClose } from "react-icons/md";
// import DashBoardLoginUser from "../dashBoardLoginUser/DashBoardLoginUser";
// import DashBoardPaidUser from "../dashBoardPaidUser/DashBoardPaidUser";
// import DashBoardSubscriptionUser from "../dashBoardSubscriptionUser/DashBoardSubscriptionUser";
import { Link } from "react-router-dom";

import BoardSystem from "./boardSystem/BoardSystem";
import UseAdmin from "@/hooks/UseAdmin";
import Dropdown from "@/components/dropdown/Dropdown";
import PageHeader from "@/components/pageHeader/PageHeader";
import ActivityChart from "./Recharts/ActivityChart";
import SupportiveCard from "./SuuportiveCard";

const DashBoardHome = () => {
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);


  // Toggle user profile dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


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
    <div className="mb-20">
      {/* Navbar */}
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
    <div className="mx-5">

    <PageHeader title="FlowMate User Dashboard"  breadcrumb="  Here is some user information"/>
    </div>
      {/* Dashboard Content */}
      <div className="lg:flex flex-1 my-10 mx-10">  
        <div className="px-5 py-10 rounded-2xl  hover:shadow-sky-200 w-full">        
          <DashBoardCards />
        </div>
      </div>

   
      {/* Charts and Graphs */}
      <div className="flex lg:flex-row flex-col justify-between mx-14 my-10 gap-6">
        {/* Visitor Insights Chart */}
        <div className="w-2/3 bg-white rounded-2xl">
          <ActivityChart/>
        </div>

        {/* Round Graph */}
        <div className="  w-1/3  ">
          <SupportiveCard/>
        </div>
      </div>
    </div>

  );
};

export default DashBoardHome;