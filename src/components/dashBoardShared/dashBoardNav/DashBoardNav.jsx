import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaAd, FaHome } from "react-icons/fa";
import { BsMicrosoftTeams } from "react-icons/bs";
import { MdRoomPreferences } from "react-icons/md";
import { RiDashboardHorizontalFill, RiSecurePaymentLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Feedback } from "@/components/feedback/Feedback";
import UseAdmin from "@/hooks/UseAdmin";

const DashBoardNav = () => {
  const user = useSelector((state) => state.auth.user);
  const [isAdmin, isAdminLoading] = UseAdmin();
  const loading = useSelector((state) => state.auth.loading);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-[#020b70] text-white w-[250px] h-full  lg:transform-none transition-transform duration-300 ease-in-out fixed lg:relative ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 p-4 shadow-lg z-50 absolute lg:relative`}
      >
        {/* Sidebar content */}
        <div className="relative space-y-6">
          <button
            className="absolute right-0 top-0 text-xl lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <IoMdClose />
          </button>
          <Link to={"/dashboard"} className="text-2xl font-semibold">
            Dashboard
          </Link>
          <nav className="flex flex-col space-y-2">
            {isAdmin ? (
              <NavLink
                to="/dashboard/admin"
                className="flex items-center gap-1 hover:bg-blue-500 rounded p-2"
              >
                <RiDashboardHorizontalFill />
                AdminDashboard
              </NavLink>
            ) : (
              <NavLink
                to="/dashboard/user"
                className="flex items-center gap-1 hover:bg-blue-500 rounded p-2"
              >
                <FaHome />
                UserDashBoard
              </NavLink>
            )}

            {user?.role === "user" && (
              <NavLink
                to="/dashboard/booking"
                className="flex items-center gap-1 hover:bg-blue-500 rounded p-2"
              >
                {/* Add your content */}
              </NavLink>
            )}
            <NavLink
              to="/dashboard/boardSystem"
              className="flex items-center gap-1 hover:bg-blue-500 rounded p-2"
            >
              <RiSecurePaymentLine />
              Show all Board
            </NavLink>

            {/* <NavLink
              to="/dashboard/tasks"
              className="flex items-center gap-1 hover:bg-blue-500 rounded p-2"
            >
              <RiSecurePaymentLine />
              My task
            </NavLink> */}
            <NavLink
              to="/dashboard/profilePage"
              className="flex items-center gap-1 hover:bg-blue-500 rounded p-2"
            >
              <MdRoomPreferences /> My Profile
            </NavLink>

            <NavLink
              to="/dashboard/team-request"
              className="flex items-center gap-1 hover:bg-blue-500 rounded p-2"
            >
              <BsMicrosoftTeams />
              Team Request
            </NavLink>
            <NavLink
              to="/dashboard/userActivity"
              className="flex items-center gap-1 hover:bg-blue-500 rounded p-2"
            >
              <BsMicrosoftTeams />
              User Activity
            </NavLink>
            {/* comment those line by sajib */}
            <NavLink
              to="/dashboard/all-team"
              className="flex items-center gap-1 hover:bg-blue-500 rounded p-2"
            >
              <BsMicrosoftTeams />
              Specific team with task
            </NavLink>

            {/* <NavLink
              to="/dashboard/my-task"
              className="flex items-center gap-1 hover:bg-blue-500 rounded p-2"
            >
              <RiSecurePaymentLine />
              My task
            </NavLink> */}

            {isAdmin && (
              <NavLink
                to="/dashboard/payment_history"
                className="flex items-center gap-1 hover:bg-blue-500 rounded p-2"
              >
                <RiSecurePaymentLine />
                Payment History
              </NavLink>
            )}

            <hr />

            <NavLink
              to="/"
              className="flex items-center gap-1 hover:bg-blue-500 rounded p-2"
            >
              <FaHome />
              Home
            </NavLink>
          </nav>
        </div>

        <div>
          <Feedback className="" />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1">
        {/* Mobile Menu Button */}
        <button
          className={`${isSidebarOpen ? "hidden" : ""
            } lg:hidden fixed top-4 left-4 z-50 p-2 rounded-full focus:outline-none`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-5 h-5 fill-current dark:text-gray-800"
          >
            <rect width="352" height="32" x="80" y="96"></rect>
            <rect width="352" height="32" x="80" y="240"></rect>
            <rect width="352" height="32" x="80" y="384"></rect>
          </svg>
        </button>

        {/* Page content here */}
      </div>
    </div>
  );
};

export default DashBoardNav;
