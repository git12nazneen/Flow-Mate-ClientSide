import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // Ensure axios is installed
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import Swal from "sweetalert2";

const TaskDetails = () => {
  const navigate = useNavigate();
  const details = useLoaderData(); // Fetching details
  const team = details.teamName; // Access the team name from details
  const axiosCommon = UseAxiosCommon();

  const handleNavigate = () => {
    const navigateUrl = `/dashboard/teamTask/${team}`;
    navigate(navigateUrl); // Navigate to the dynamic URL
  }

  // Local state to manage the selected tab and file paths
  const [activeTab, setActiveTab] = useState("details");
  const [filePaths, setFilePaths] = useState(details.filePaths || []);

  // Helper function to get file extension from URL
  const getFileExtension = (url) => url.split(".").pop().toLowerCase();

  // Handle file deletion
  const handleDeleteFile = async (fileUrl) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Make DELETE request to the backend with file URL as data
          await axiosCommon.delete(`/createTask/file/${details._id}`, {
            data: { fileUrl }  // Include fileUrl in request body
          });

          // Update local filePaths state by removing the deleted file
          const updatedFiles = filePaths.filter((file) => file !== fileUrl);
          setFilePaths(updatedFiles);

          // Show success message
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } catch (error) {
          console.error("Error deleting file:", error);
        }
      }
    });
  };


  const handleDownloadFile = async (fileUrl, index) => {
    const fileExtension = getFileExtension(fileUrl);

    // For PDF files, open directly
    if (fileExtension === "pdf") {
      // Directly open the PDF file in a new tab
      window.open(fileUrl, "_blank");
    } else {
      // Use fetch for other file types
      try {
        const response = await fetch(fileUrl);

        if (!response.ok) throw new Error("Network response was not ok.");

        const blob = await response.blob();
        const fileDownloadURL = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement("a");
        link.href = fileDownloadURL;

        // Set the download attribute
        link.setAttribute("download", `file_${index}.${fileExtension}`);
        document.body.appendChild(link);

        // Simulate a click to trigger the download
        link.click();

        // Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(fileDownloadURL); // Release the object URL
      } catch (error) {
        console.error("Error downloading file:", error);
        // Open the file URL in a new tab as a fallback
        window.open(fileUrl, "_blank");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">
          {details.taskTitle.toUpperCase()}
        </h1>
        <button onClick={handleNavigate} className="text-blue-500 underline cursor-pointer">
          ← Back to Task List
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("details")}
          className={`py-2 px-4 font-medium ${activeTab === "details" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
            }`}
        >
          Task Details
        </button>
        <button
          onClick={() => setActiveTab("assets")}
          className={`py-2 px-4 font-medium ${activeTab === "assets" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
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
            <div className="flex items-center mb-4">
              <span className="bg-blue-100 text-blue-500 px-3 py-1 text-xs rounded-full mr-2">
                {details?.priority}
              </span>
              <span className="bg-green-100 text-green-500 px-3 py-1 text-xs rounded-full">
                {details?.stage}
              </span>
            </div>
            <div className="text-gray-500 text-sm mb-4">
              Created At: {details?.startDate ? new Date(details?.startDate).toLocaleString() : "N/A"}
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-600 mt-10 mb-2">TASK TEAM DETAILS</h2>
              <div className="py-4">
                <div className="text-gray-600 font-semibold mb-2">Board: <span className="ml-1 text-gray-800">{details?.boardName}</span></div>
                <div className="text-gray-600 font-semibold mb-2">Team: <span className="ml-1 text-gray-800">{details?.teamName}</span></div>
                <div className="text-gray-600 font-semibold mb-2">Worker Name: <span className="ml-1 text-blue-600">{details?.assignedTo}</span></div>
                <div className="text-gray-600 font-semibold">Worker Email: <span className="ml-1 text-blue-600">{details?.workerMail}</span></div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-1/2">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-600 mb-2">TASK DESCRIPTION</h2>
              <p className="text-gray-700">{details?.description}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "assets" && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-600 mb-2">ASSETS</h2>
          <div className="grid grid-cols-1 gap-2">
            {filePaths?.map((fileUrl, index) => (
              <div key={index} className="flex justify-between mb-4 items-center">
                <span className="text-gray-700">{getFileExtension(fileUrl).toUpperCase()} File</span>
                <div className="flex space-x-4">
                  {getFileExtension(fileUrl) !== "pdf" && (
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#00053d] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                    >
                      Open
                    </a>
                  )}
                  <a
                    onClick={() => getFileExtension(fileUrl) === "pdf" ? handleDownloadFile(fileUrl, index) : handleDownloadFile(fileUrl, index)}
                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                  >
                    Download
                  </a>



                  <button
                    onClick={() => handleDeleteFile(fileUrl)}
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
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
