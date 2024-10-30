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
import UserDashboardPieChart from "./UserDashboardPieChart";
import UpperNavigation from "@/components/admin/elements/upperNavigation/UpperNavigation";

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
      <UpperNavigation></UpperNavigation>
      <div className="mx-5">

        <PageHeader title="FlowMate User Dashboard" breadcrumb="  Here is some user information" />
      </div>
      {/* Dashboard Content */}
      <div className="lg:flex flex-1 my-10 mx-10">
        <div className=" py-6 rounded-2xl  hover:shadow-sky-200 w-full">
          <DashBoardCards />
        </div>
      </div>


      {/* Charts and Graphs */}
      <div className="flex lg:flex-row flex-col justify-between mx-14 my-5 lg:my-10 gap-6">
        {/* Visitor Insights Chart */}
        <div className="flex-1 mx-auto rounded-2xl ">
          <ActivityChart />
        </div>

        <div className="flex-1">
        <UserDashboardPieChart />
        </div>
      </div>
    </div>
  );
};

export default DashBoardHome;
