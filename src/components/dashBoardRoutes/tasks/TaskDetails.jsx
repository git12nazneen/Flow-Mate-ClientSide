import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";

const TaskDetails = () => {
  const navigate = useNavigate();
  const details = useLoaderData();
  console.log("dataz", details);

  // Local state to manage the selected tab
  const [activeTab, setActiveTab] = useState("details");

  // Helper function to get file extension from URL
  const getFileExtension = (url) => {
    return url.split(".").pop();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">
          {details.taskTitle.toUpperCase()}
        </h1>
        <button
          onClick={() => navigate("/dashboard/tasks")}
          className="text-blue-500 underline cursor-pointer"
        >
          ← Back to Task List
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("details")}
          className={`py-2 px-4 font-medium ${
            activeTab === "details"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Task Details
        </button>
        <button
          onClick={() => setActiveTab("assets")}
          className={`py-2 px-4 font-medium ${
            activeTab === "assets"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Task Assets
        </button>
      </div>

      {/* Main Content */}
      {activeTab === "details" && (
        <div className="flex justify-between mb-8">
          {/* Left Column */}
          <div className="w-1/2">
            {/* Priority and Status */}
            <div className="flex items-center mb-4">
              <span className="bg-blue-100 text-blue-500 px-3 py-1 text-xs rounded-full mr-2">
                {details?.priority}
              </span>
              <span className="bg-green-100 text-green-500 px-3 py-1 text-xs rounded-full">
                {details?.stage}
              </span>
            </div>

            {/* Created At */}
            <div className="text-gray-500 text-sm mb-4">
              Created At:{" "}
              {details?.startDate
                ? new Date(details?.startDate).toLocaleString()
                : "N/A"}
            </div>

            {/* Task Team */}
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-600 mt-10 mb-2">
                TASK TEAM DETAILS
              </h2>
              <div className="py-4">
                <div className="text-gray-600 font-semibold mb-2">
                  Board:
                  <span className="ml-1 text-gray-800">
                    {details?.boardName}
                  </span>
                </div>
                <div className="text-gray-600 font-semibold mb-2">
                  Team:
                  <span className="ml-1 text-gray-800">
                    {details?.teamName}
                  </span>
                </div>
                <div className="text-gray-600 font-semibold mb-2">
                  Worker Name:
                  <span className="ml-1 text-blue-600">
                    {details?.assignedTo}
                  </span>
                </div>
                <div className="text-gray-600 font-semibold">
                  Worker Email:
                  <span className="ml-1 text-blue-600">
                    {details?.workerMail}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-1/2">
            {/* Task Description */}
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-600 mb-2">
                TASK DESCRIPTION
              </h2>
              <p className="text-gray-700">{details?.description}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "assets" && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-600 mb-2">ASSETS</h2>
          <div className="grid grid-cols-1 gap-2">
            {details?.filePaths?.map((fileUrl, index) => (
              <div
                key={index}
                className="flex justify-between mb-4 items-center"
              >
                <span className="text-gray-700">
                  {getFileExtension(fileUrl).toUpperCase()} File
                </span>
                <div className="flex space-x-4">
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                  >
                    Open
                  </a>
                  <a
                    href={fileUrl}
                    download
                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
