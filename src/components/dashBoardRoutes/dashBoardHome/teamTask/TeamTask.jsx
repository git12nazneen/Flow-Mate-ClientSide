import PageHeader from "@/components/pageHeader/PageHeader";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { VscFolderActive } from "react-icons/vsc";

import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { FaEdit, FaEye } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDropzone } from "react-dropzone";
import { BounceLoader } from "react-spinners";
import { AiOutlineCloudUpload } from "react-icons/ai";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import TodoList from "../../tasks/TodoList";
import InProgress from "../../tasks/InProgress";
import Completed from "../../tasks/Completed";
import axios from "axios";

// Function to fetch tasks from your API
const fetchTasks = async () => {
  const response = await fetch(
    "https://flowmate-a-team-collaboration-tool.vercel.app/createTask"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Main Component
const TeamTask = () => {
  const axiosCommon = UseAxiosCommon();
  // track user
  const user = useSelector((state) => state.auth.user);
  const email = user?.email;
  const [elapsedTime, setElapsedTime] = useState({}); // Track elapsed time for tasks
  const [timers, setTimers] = useState({}); // Track timers for each task
  const [stoppedTimersState, setStoppedTimersState] = useState({}); //for disable timer

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const {
    register,
    handleSubmit,

    reset,
  } = useForm();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Handlers for dropdown visibility
  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const handleSortSelection = (option) => {
    setSortOption(option); // Update sort option state
    setDropdownVisible(false); // Close dropdown after selection
  };

  // Handler for form submission
  const onSubmit = (data) => {
    if (!data.search) {
      return;
    }
    reset();
    setSearchQuery(data.search);
  };
  const handleReset = () => {
    setSearchQuery(""); // Clear search query
    setSortOption(""); // Clear sort option
    reset(); // Reset form fields
  };

  const [stage, setStage] = useState(""); // Track the stage

  // Get the teamName from useLoaderData
  const { teamName } = useLoaderData(); // Assuming teamName is included in the loader data

  // Log teamName only when it changes
  useEffect(() => {
    console.log("teamName from loader:", teamName);
  }, [teamName]); // Add teamName as a dependency to log only when it changes

  const {
    data: tasks = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tasks", teamName, searchQuery, sortOption],
    queryFn: async () => {
      if (teamName) {
        const { data } = await axiosCommon.get(
          `/createTask/teamName/${teamName}?search=${searchQuery}&sort=${sortOption}`
        );
        return data;
      } else {
        throw new Error("Team name is missing");
      }
    },
    enabled: !!teamName, // Ensure query is only executed when teamName exists
  });

  const handleStageChange = async (task, newStage) => {
    try {
      const res = await axiosCommon.put(`/createTask/${task._id}`, {
        stage: newStage, // Send the updated stage to the server
      });
      if (res.status === 200) {
        refetch(); // Refetch the tasks after the stage is updated
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Stage updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update stage!",
      });
    }
  };

  // delete funciton

  const handleDelete = async (task) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosCommon.delete(`/createTask/${task._id}`);
        console.log("Delete response:", res.data); // Log the response for debugging

        // Check the response message for success
        if (res.data.message === "Task deleted successfully") {
          // Refetch to update the tasks
          await refetch();

          // Optionally update the local state if you're using useState to manage tasks
          // setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Task deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          throw new Error("Deletion failed");
        }
      } catch (error) {
        console.error("Error deleting task:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Could not delete the task.",
        });
      }
    }
  };

  // Timer handling

  // Timer handlin

  const handleStopTimer = async (task) => {
    clearInterval(timers[task._id]); // Stop the timer
    setTimers((prev) => ({ ...prev, [task._id]: null }));

    // Save the stopped state and elapsed time in localStorage
    const stoppedTimers =
      JSON.parse(localStorage.getItem("stoppedTimers")) || {};

    if (elapsedTime[task._id]) {
      stoppedTimers[task._id] = {
        stopped: true,
        elapsedTime: elapsedTime[task._id], // Store the current elapsed time
      };
      localStorage.setItem("stoppedTimers", JSON.stringify(stoppedTimers));

      // Prepare the data to send in the POST request
      const dataToSend = {
        taskId: task._id,
        elapsedTime: elapsedTime[task._id],
        workerMail: task?.workerMail,
        stopped: true,
        taskTitle: task?.taskTitle,
        taskSubmitted: task?.assignedTo,
        taskDescription: task?.description,
        taskDueDate: dayjs(task.dueDate).format("YYYY-MM-DD"),
      };

      try {
        const response = await axiosCommon.post("/timerData", dataToSend);
        if (response.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Timer stopped and data saved",
            showConfirmButton: false,
            timer: 1500,
          });
          // Update the stoppedTimersState
          setStoppedTimersState((prev) => ({
            ...prev,
            [task._id]: true,
          }));

          // Update the UI to stop the timer by setting elapsedTime to the fixed value
          setElapsedTime((prev) => ({
            ...prev,
            [task._id]: stoppedTimers[task._id].elapsedTime, // Display the fixed elapsed time
          }));
        } else {
          throw new Error("Failed to save data");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to stop timer and save data!",
        });
      }
    }
  };
  useEffect(() => {
    if (tasks) {
      const stoppedTimers =
        JSON.parse(localStorage.getItem("stoppedTimers")) || {};
      setStoppedTimersState(stoppedTimers);

      tasks.forEach((task) => {
        if (stoppedTimers[task._id]?.stopped) {
          // Timer was stopped, so we display the stored elapsed time
          setElapsedTime((prev) => ({
            ...prev,
            [task._id]: stoppedTimers[task._id].elapsedTime, // Display the fixed elapsed time
          }));
          return; // Don't start a new timer
        }

        const startTime = new Date(task?.startDate);
        const updateElapsedTime = () => {
          const now = new Date();
          const diffInSeconds = dayjs(now).diff(dayjs(startTime), "second");

          const hours = Math.floor(diffInSeconds / 3600);
          const minutes = Math.floor((diffInSeconds % 3600) / 60);
          const seconds = diffInSeconds % 60;

          setElapsedTime((prev) => ({
            ...prev,
            [task._id]: { hours, minutes, seconds },
          }));
        };

        if (!timers[task._id]) {
          const timerId = setInterval(updateElapsedTime, 1000);
          setTimers((prev) => ({ ...prev, [task._id]: timerId }));
        }
      });
    }

    return () => {
      Object.values(timers).forEach(clearInterval);
    };
  }, [tasks, timers]);

  const exportToCSV = (teamName) => {
    // Ensure that `tasks` is loaded (assuming `tasks` is from your state or props)
    if (!tasks || tasks.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No Tasks Available",
        text: "No tasks have been loaded or there is a network issue.",
      });
      return;
    }

    // Prepare tasks for CSV export
    const taskData = tasks.map((task) => ({
      TaskTitle: task.taskTitle,
      AssignedTo: task.assignedTo,
      Stage: task.stage,
      Priority: task.priority,
      AssignedMail: task.workerMail,
      StartDate: task.startDate,
      TeamName: task.teamName, // Include team name for reference
    }));

    // Convert the tasks data to CSV format using Papa.unparse
    try {
      const csv = Papa.unparse(taskData);

      // Create a downloadable link for the CSV file
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      // Dynamically set the file name using the teamName variable
      const fileName = `${teamName}_all_tasks.csv`;

      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      Swal.fire({
        icon: "success",
        title: "CSV Exported",
        text: `All tasks for team "${teamName}" have been exported successfully.`,
      });
    } catch (error) {
      console.error("CSV Export Error: ", error);
      Swal.fire({
        icon: "error",
        title: "Export Failed",
        text: "There was an error exporting tasks to CSV.",
      });
    }
  };

  let isUploading = false; // Add a flag to track uploading status

  const onDrop = async (acceptedFiles, taskId) => {
    console.log("Accepted Files:", acceptedFiles);
    console.log("Before Upload - Task ID:", taskId);

    if (!taskId) {
      console.error("Task ID is invalid!");
      return;
    }

    if (isUploading) {
      console.log("Upload is already in progress. Please wait.");
      return;
    }

    isUploading = true;

    try {
      // Array to store the uploaded file URLs
      const cloudinaryUrls = await Promise.all(
        acceptedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "all_files_preset");

          // Upload file to Cloudinary
          const response = await axiosCommon.post(
            `https://api.cloudinary.com/v1_1/dadvrb8ri/upload`,
            formData
          );

          console.log("Cloudinary upload response:", response.data);
          return response.data.secure_url; // Collect the secure URL for each file
        })
      );

      console.log("Uploaded file URLs from Cloudinary:", cloudinaryUrls);

      // Send all file URLs to the backend for storage
      const url = `/createTask/file/${taskId}`;
      console.log("Requesting URL to server:", url);

      const response = await axiosCommon.put(
        url,
        { files: cloudinaryUrls }, // Sending array of URLs
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire({
        title: "Congratulations!",
        text: "You have successfully submitted your task files.",
        imageUrl:
          "https://www.filemail.com/images/marketing/upload-your-files.svg",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });

      console.log("Files successfully saved on the server:", response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to upload files!",
      });
      console.error("Error in file upload or saving to server:", error);
    } finally {
      isUploading = false;
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BounceLoader />
      </div>
    );
  }
  if (error) {
    return <div>Error loading tasks: {error.message}</div>;
  }

  // Filter tasks based on the teamName
  // const filteredTasks = tasks.filter((task) => task.teamName === teamName);

  return (
    <div>
      <PageHeader
        title={`${teamName}`}
        breadcrumb="See all task of your team"
      ></PageHeader>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-3 px-5 py-10">
        <div>
          <TodoList />
        </div>
        <div>
          <InProgress />
        </div>
        <div>
          <Completed />
        </div>
      </div>

      <div className="flex flex-col justify-center mx-12">
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Search and sort */}
          <div className="flex  mt-2 gap-2">
            <Button
              className="bg-blue-500 text-white p-2 rounded-md"
              onClick={exportToCSV}
            >
              Export Team Tasks as CSV
            </Button>

            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <button
                id="dropdownDelayButton"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                Sort by Date
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                id="dropdownDelay"
                className={`absolute left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${
                  isDropdownVisible ? "" : "hidden"
                }`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDelayButton"
                >
                  <li onClick={() => handleSortSelection("newest")}>
                    <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Newest First
                    </a>
                  </li>
                  <li onClick={() => handleSortSelection("oldest")}>
                    <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Oldest First
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex  mt-2">
            {/* Search Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mr-0">
              <div className="flex flex-col p-1.5 overflow-hidden border rounded-lg dark:border-gray-600 lg:flex-row dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                <input
                  className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
                  type="text"
                  {...register("search", { required: true })}
                  placeholder="Enter the task name"
                  aria-label="Search tasks"
                />
                <button
                  type="submit"
                  className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Reset Button */}
            <div className="">
              <Button
                onClick={handleReset}
                className="ml-4 px-4 py-3 my-2 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-red-500 rounded-md hover:bg-red-400 focus:bg-red-400 focus:outline-none"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 items-center bg-gray-100 gap-6 p-4"> */}
      {/* Iterate  each task */}
      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 items-center bg-gray-100 gap-6 p-4 mx-5">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white hover:shadow-lg hover:shadow-sky-200 w-80 p-4 rounded-lg shadow-lg my-2"
            >
              <div className="flex justify-between">
                <div className="text-blue-500 text-xs font-semibold mb-2 uppercase">
                  {task?.priority}
                </div>
                <Link
                  to={`/dashboard/taskDetails/${task._id}`}
                  className="text-blue-500 text-xs font-semibold mb-2 uppercase"
                >
                  <span>See Details</span>
                </Link>
              </div>
              {/* Priority */}

              {/* Task Title */}
              <div className="text-xl font-semibold mb-5">
                {task?.taskTitle.slice(0, 50)}..
              </div>
              <div className="text-gray-500 text-sm mb-3">
                <p>
                  Time Elapsed: Elapsed Time:{" "}
                  {elapsedTime[task._id] && (
                    <>
                      {elapsedTime[task._id].hours}h{" "}
                      {elapsedTime[task._id].minutes}m{" "}
                      {elapsedTime[task._id].seconds}s
                    </>
                  )}
                </p>
              </div>

              <div className="flex mb-3 items-center">
                <span className="text-gray-500 text-sm mr-2">Assigned to:</span>
                <h1 className="text-sm bg-blue-100 text-blue-400 font-bold flex items-center justify-center rounded-full px-4 py-1 border-2 border-white">
                  {task?.assignedTo}
                </h1>
              </div>

              {/* Task Details */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-gray-600 text-sm">
                  <span className="mr-1">
                    <VscFolderActive />
                  </span>
                  <span className="mr-5"> Activity: </span>
                  {/* Stage Selector */}
                  <Select
                    onValueChange={(newStage) => {
                      setStage(newStage); // Update local state
                      handleStageChange(task, newStage); // Send the stage update request
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a Stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Todo</SelectLabel>
                        <SelectItem value="in progress">In Progress</SelectItem>
                        <SelectItem value="done">Completed</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Delete and Edit Icons */}
              <div className="flex justify-between gap-1">
                <button
                  onClick={() => handleStopTimer(task)}
                  disabled={stoppedTimersState[task._id]} // Disable button when timer is stopped
                  className={`text-sm h-9 mt-2 px-2 rounded 
                                        ${
                                          stoppedTimersState[task._id]
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : "bg-red-500"
                                        } 
                      text-white`}
                >
                  Stop Timer
                </button>

                <div {...getRootProps()} className="text-center cursor-pointer">
                  <input
                    {...getInputProps({
                      onChange: (event) => {
                        const files = event.target.files;
                        if (files.length > 0) {
                          console.log(
                            "Before calling onDrop - Task ID:",
                            task._id
                          );
                          onDrop(Array.from(files), task._id); // Pass task ID to onDrop
                        }
                      },
                    })}
                  />

                  {isDragActive ? (
                    <AiOutlineCloudUpload
                      size={48}
                      className="text-green-500"
                    />
                  ) : (
                    <AiOutlineCloudUpload size={48} className="text-gray-500" />
                  )}
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <div className="p-2 border bg-blue-200 rounded-sm">
                    <span onClick={() => handleDelete(task)}>
                      <RiDeleteBin6Line />
                    </span>
                  </div>
                  <div className="p-2 border bg-blue-200 rounded-sm">
                    <Link to={`/dashboard/updateTask/${task._id}`}>
                      <FaEdit />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg col-span-full m-20">
          No task assign to you.
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default TeamTask;
