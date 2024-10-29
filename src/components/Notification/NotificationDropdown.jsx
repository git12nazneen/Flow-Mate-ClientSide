import { useState } from "react";
import { MdNotificationsActive } from "react-icons/md";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      {/* Dropdown toggle button */}
      <button
        onClick={toggleDropdown}
        className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none"
      >
        <MdNotificationsActive className="text-3xl text-slate-900" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute right-0 z-20 w-64 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-lg sm:w-80 dark:bg-gray-800"
        >
          <div className="py-2">
            <a
              href="#"
              className="flex items-center px-4 py-3 -mx-2 transition-colors duration-300 transform border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
            >
              <img
                className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                alt="avatar"
              />
              <p className="mx-2 text-sm text-gray-600 dark:text-white">
                <span className="font-bold">Sara Salah</span> replied on the{" "}
                <span className="text-blue-500 hover:underline">
                  Upload Image
                </span>{" "}
                article. 2m
              </p>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 -mx-2 transition-colors duration-300 transform border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
            >
              <img
                className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full"
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                alt="avatar"
              />
              <p className="mx-2 text-sm text-gray-600 dark:text-white">
                <span className="font-bold">Slick Net</span> started following
                you. 45m
              </p>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 -mx-2 transition-colors duration-300 transform border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
            >
              <img
                className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full"
                src="https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                alt="avatar"
              />
              <p className="mx-2 text-sm text-gray-600 dark:text-white">
                <span className="font-bold">Jane Doe</span> liked your reply on{" "}
                <span className="text-blue-500 hover:underline">
                  Test with TDD
                </span>{" "}
                article. 1h
              </p>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 -mx-2 transition-colors duration-300 transform hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img
                className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80"
                alt="avatar"
              />
              <p className="mx-2 text-sm text-gray-600 dark:text-white">
                <span className="font-bold">Abigail Bennett</span> started
                following you. 3h
              </p>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
