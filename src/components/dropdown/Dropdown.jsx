import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { Link, useLocation } from "react-router-dom";

const Dropdown = () => {
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current location
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const user = useSelector((state) => state.auth.user);
  const { displayName, email, photoURL } = user;

  const handleLogout = () => {
    dispatch(logout());
  };

  // Check if the current path includes "dashboard"
  const isInDashboard = location.pathname.includes("dashboard");

  return (
    <div className="relative inline-block z-50">
      {/* Dropdown toggle button */}
      <button
        onClick={toggleDropdown}
        className="relative z-10 flex items-center text-sm border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring focus:outline-none"
      >
        <span>
          <img
            className="object-cover w-8 h-8 rounded-full"
            src={
              photoURL ||
              "https://i.ibb.co/M7Zxxsm/770fb75f5e81e4c2dbe8934f246aeeab.jpg"
            }
            alt="User Avatar"
          />
        </span>
        <svg
          className="w-5 h-5 mx-1"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 z-20 lg:w-64 md:w-56 w-38 py-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800">
          <li className="flex flex-col md:flex-row justify-center items-center p-2 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
            <img
              className="flex-shrink-0 object-cover mx-1 rounded-full w-6 h-6"
              src={photoURL || "https://randomuser.me/api/portraits"}
              alt="avatar"
            />
            <div className="text-center">
              <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {displayName || "No Name"}
              </h1>
              <p className="lg:text-sm text-xs text-gray-500 dark:text-gray-400">
                {email || "No Email"}
              </p>
            </div>
          </li>

          <hr className="border-gray-200 dark:border-gray-700" />

          {!isInDashboard && (
            <>
              <Link
                to={"dashboard/profilePage"}
                className="block px-2 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white text-center"
              >
                view profile
              </Link>

              <Link
                to={"dashboard/settings"}
                className="block px-2 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white text-center"
              >
                settings
              </Link>

              <hr className="border-gray-200 dark:border-gray-700" />
            </>
          )}

          <button
            onClick={handleLogout}
            className="block px-2 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white text-center w-full"
          >
            log out
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
