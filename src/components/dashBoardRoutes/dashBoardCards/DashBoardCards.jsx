import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaTasks, FaCheckCircle, FaSpinner, FaClipboardList } from 'react-icons/fa'; // Import icons from react-icons

const DashBoardCards = () => {
  const navigate = useNavigate();
  const axiosCommon = UseAxiosCommon();
  const userEmail = useSelector((state) => state.auth.user?.email);

  // Fetching task data
  const {
    data: task = {}, // Default to an empty object
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/createTask/task-count/${userEmail}`);
      console.log(data);
      return data;
    },
  });

  // Handle loading state
  if (isLoading) {
    return <div>Loading tasks data...</div>;
  }

  // Handle error state
  if (isError) {
    return <div>Error fetching tasks data.</div>;
  }

  const handleCardClick = (path) => {
    navigate(path); // Navigate to the respective page when a card is clicked
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-4 py-8">
      {/* All Tasks Card */}
      <div
        onClick={() => handleCardClick("/all-tasks")}
        className="bg-gray-300 text-center p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer"
      >
        <div className="flex items-center justify-center space-x-2">
          <FaTasks className="text-2xl text-blue-500" /> {/* All Tasks Icon */}
          <h3 className="text-lg font-semibold">All Tasks</h3>
        </div>
        <p className="text-4xl mt-4">{task.totalTasks}</p>
      </div>

      {/* Completed Tasks Card */}
      <div
        onClick={() => handleCardClick("/completed-tasks")}
        className="bg-gray-300 text-center p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer"
      >
        <div className="flex items-center justify-center space-x-2">
          <FaCheckCircle className="text-2xl text-green-500" /> {/* Completed Tasks Icon */}
          <h3 className="text-lg font-semibold">Completed Tasks</h3>
        </div>
        <p className="text-4xl mt-4">{task.done}</p>
      </div>

      {/* In Progress Tasks Card */}
      <div
        onClick={() => handleCardClick("/in-progress-tasks")}
        className="bg-gray-300 text-center p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer"
      >
        <div className="flex items-center justify-center space-x-2">
          <FaSpinner className="text-2xl text-yellow-500" /> {/* In Progress Tasks Icon */}
          <h3 className="text-lg font-semibold">In Progress Tasks</h3>
        </div>
        <p className="text-4xl mt-4">{task.inProgress}</p>
      </div>

      {/* To-do Tasks Card */}
      <div
        onClick={() => handleCardClick("/todo-tasks")}
        className="bg-gray-300 text-center p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer"
      >
        <div className="flex items-center justify-center space-x-2">
          <FaClipboardList className="text-2xl text-red-500" /> {/* To-do Tasks Icon */}
          <h3 className="text-lg font-semibold">To-do Tasks</h3>
        </div>
        <p className="text-4xl mt-4">{task.todo}</p>
      </div>
    </div>
  );
};

export default DashBoardCards;
