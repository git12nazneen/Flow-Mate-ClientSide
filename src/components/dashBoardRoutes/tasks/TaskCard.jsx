import { useQuery } from "@tanstack/react-query";
import { VscFolderActive } from "react-icons/vsc";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

import { RiDeleteBin6Line } from "react-icons/ri";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import Swal from "sweetalert2";
import { Link, useLoaderData } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import Button2COmmon from "@/components/button2Commo.jsx/Button2COmmon";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BounceLoader } from "react-spinners";
import axios from "axios";

// TaskCard Component
const TaskCard = () => {
  const axiosCommon = UseAxiosCommon();

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const {
    register,
    handleSubmit,

    reset,
  } = useForm();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  // track user
  const user = useSelector((state) => state.auth.user);
  const email = user?.email;
  const [elapsedTime, setElapsedTime] = useState({}); // Track elapsed time for tasks
  const [timers, setTimers] = useState({}); // Track timers for each task
  const [stoppedTimersState, setStoppedTimersState] = useState({}); //for disable timer

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

  const [stage, setStage] = useState(""); // Track the stage change
  const {
    isLoading,
    error,
    data: createTask,
    refetch,
  } = useQuery({
    queryKey: ["createTask", searchQuery, sortOption,email], // Include search and sort in the query key
    queryFn: async () => {
      const res = await fetch(
        `https://flowmate-a-team-collaboration-tool.vercel.app/createTask?search=${searchQuery}&sort=${sortOption}=&email=${email}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
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
        if (res.data.message === 'Task deleted successfully') {
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

  // Function to stop the timer and store the stopped state in localStorage
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
        const response = await axiosCommon.post(`timerData`, dataToSend);
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

  // Timer handling in useEffect
  useEffect(() => {
    if (createTask) {
      const stoppedTimers =
        JSON.parse(localStorage.getItem("stoppedTimers")) || {};
      setStoppedTimersState(stoppedTimers);
      createTask.forEach((task) => {
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
  }, [createTask]);

  const exportToCSV = () => {
    // Use SweetAlert2 to open a modal with input field for team name
    Swal.fire({
      title: "Enter Team Name",
      input: "text",
      inputPlaceholder: "Team name",
      showCancelButton: true,
      confirmButtonText: "Export",
      showLoaderOnConfirm: true,
      preConfirm: (teamName) => {
        return new Promise((resolve) => {
          if (!teamName) {
            Swal.showValidationMessage("Please enter a valid team name.");
            return;
          }
          resolve(teamName);
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const teamName = result.value;

        // Ensure that `createTask` is loaded
        if (!createTask || createTask.length === 0) {
          Swal.fire({
            icon: "error",
            title: "No Tasks Available",
            text: "No tasks have been loaded or there is a network issue.",
          });
          return;
        }

        // Filter tasks by the provided team name
        const filteredTasks = createTask.filter(
          (task) => task.teamName === teamName
        );

        if (filteredTasks.length === 0) {
          Swal.fire({
            icon: "info",
            title: "No tasks found",
            text: `No tasks found for team "${teamName}".`,
          });
          return; // Exit if no tasks match the team name
        }

        // Map the filtered tasks to prepare them for CSV export
        const tasks = filteredTasks.map((task) => ({
          TaskTitle: task.taskTitle,
          AssignedTo: task.assignedTo,
          Stage: task.stage,
          Priority: task.priority,
          AssignedMail: task.workerMail,
          StartDate: task.startDate,
          TeamName: task.teamName, // Include team name for reference
        }));

        // Convert tasks to CSV format
        const csv = Papa.unparse(tasks);

        // Create a downloadable link for the CSV file
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `${teamName}_tasks.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        Swal.fire({
          icon: "success",
          title: "CSV Exported",
          text: `Tasks for team "${teamName}" have been exported successfully.`,
        });
      }
    });
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

          // Upload file to Cloudinary with resource_type "auto" for all file types
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dadvrb8ri/upload`, // Cloudinary upload URL
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
              params: { resource_type: "auto" }, // Automatically detects the type of the file
            }
          );
          console.log("Cloudinary upload response:", response.data);

          // Return the secure URL to access the file
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
    return <div>Error loading tasks</div>;
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <section className="bg-white rounded-2xl">
          <div className="container flex flex-col items-center px-4 py-4 mx-auto text-center">
            <h2 className="max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white">
              Boost Your Team's Productivity to the{" "}
              <span className="text-blue-500">Next Level.</span>
            </h2>

            <p className="max-w-4xl mt-6 text-center text-gray-500 dark:text-gray-300">
              Get all of task in a specific team in a single click.
            </p>

            <div className="flex justify-center items-center my-3">
              <Button
                className="bg-blue-500 text-white p-2 rounded-md"
                onClick={exportToCSV}
              >
                Export Team Tasks as CSV
              </Button>
            </div>
          </div>
        </section>
        <div>
          <h2 className="font-semibold my-3 text-2xl  text-gray-800 dark:text-white text-center">
            Get the specific task you are looking for
          </h2>
          {/* Search and sort */}
          <div className="flex justify-center items-center mt-2 gap">
            {/* Search Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mr-4">
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
            {/* Reset Button */}
            <div className="">
              <Button
                onClick={handleReset}
                className="ml-4 px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-red-500 rounded-md hover:bg-red-400 focus:bg-red-400 focus:outline-none"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 items-center bg-gray-100 gap-6 p-4">
        {/* Iterate  each task */}
        {!createTask || createTask.length === 0 ? (
          <div className="text-center text-gray-500 text-lg col-span-full">
            Create task for your team member.
          </div>
        ) : (
          createTask?.map(
            (task, index) =>
              task.email=== user.email&& (
                <div
                  key={index}
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
                    Elapsed Time:{" "}
                    {elapsedTime[task._id] && (
                      <>
                        {elapsedTime[task._id].hours}h{" "}
                        {elapsedTime[task._id].minutes}m{" "}
                        {elapsedTime[task._id].seconds}s
                      </>
                    )}
                  </div>

                  <div className="flex mb-3 items-center">
                    <span className="text-gray-500 text-sm mr-2">
                      Assigned to:
                    </span>
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
                            <SelectItem value="in progress">
                              In Progress
                            </SelectItem>
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
                    <div
                      {...getRootProps()}
                      className="text-center cursor-pointer"
                    >
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
                        <AiOutlineCloudUpload
                          size={48}
                          className="text-gray-500"
                        />
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
              )
          )
        )}
      </div>
    </div>
  );
};

export default TaskCard;
