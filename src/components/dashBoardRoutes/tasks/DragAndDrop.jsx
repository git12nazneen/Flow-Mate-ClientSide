import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";

const DragAndDropTaskManager = () => {
  const { teamName } = useLoaderData();
  const axiosCommon = UseAxiosCommon();

  const [taskLists, setTaskLists] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });

  // Fetch tasks by stage
  const fetchTasksByStage = async (stage) => {
    if (!teamName) throw new Error("Team name is missing");
    const { data } = await axiosCommon.get(`/createTask/tasksByStage/${teamName}/${stage}`);
    return data;
  };

  // Fetch tasks for each stage

  const { data: todoTasks = [] } = useQuery({
    queryKey: ["tasks", teamName, "todo"],
    queryFn: () => fetchTasksByStage("todo"),
    enabled: !!teamName,
  });

  const { data: inProgressTasks = [] } = useQuery({
    queryKey: ["tasks", teamName, "inProgress"],
    queryFn: () => fetchTasksByStage("inProgress"),
    enabled: !!teamName,
  });

  const { data: completedTasks = [] } = useQuery({
    queryKey: ["tasks", teamName, "completed"],
    queryFn: () => fetchTasksByStage("done"),
    enabled: !!teamName,
  });

  // Update task lists when data changes
  useEffect(() => {
    setTaskLists({
      todo: todoTasks,
      inProgress: inProgressTasks,
      completed: completedTasks,
    });
  }, [todoTasks, inProgressTasks, completedTasks]);

  // Function to update task stage in backend
  const updateTaskStage = async (taskId, newStage) => {
    // console.log("Updating task stage:", taskId, newStage);


    const update = { newStage };

    try {
      const response = await axiosCommon.put(`/createTask/updateStage/${taskId}`, update);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error updating task stage:", error.response.data);
        return { error: error.response.data };
      } else {
        console.error("Error updating task stage:", error.message);
        return { error: "Network error or server not responding" };
      }
    }
  };

  // Handle drag start
  const onDragStart = (e, id, stage) => {
    e.dataTransfer.setData("task", JSON.stringify({ id, stage }));
  };

  // Handle drag over
  const onDragOver = (e) => e.preventDefault();

  // Handle drop
  const onDrop = async (e, targetStage) => {
    e.preventDefault();
    const { id, stage: currentStage } = JSON.parse(e.dataTransfer.getData("task"));

    if (currentStage !== targetStage) {
      const taskToMove = taskLists[currentStage].find((task) => task._id === id);

      // Update backend and then frontend state
      const updateResult = await updateTaskStage(id, targetStage);

      if (updateResult) {
        setTaskLists((prev) => ({
          ...prev,
          [currentStage]: prev[currentStage].filter((task) => task._id !== id),
          [targetStage]: [...prev[targetStage], { ...taskToMove, stage: targetStage }],
        }));
      }
    }
  };

  return (
    <div className="p-8 flex flex-col md:flex-row gap-4 justify-center">
      {["todo", "inProgress", "completed"].map((stage) => (
        <div
          key={stage}
          className="w-full md:w-1/3 bg-white p-4 rounded-lg border shadow-md"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, stage)}
        >
          <h4 className="text-lg font-semibold text-gray-700 text-center mb-3 capitalize">
            {stage.replace(/([A-Z])/g, " $1")}
          </h4>
          <ul className="space-y-2">
            {taskLists[stage].map((task) => (
              <li
                key={task._id}
                draggable
                onDragStart={(e) => onDragStart(e, task._id, stage)}
                className="bg-gray-100 p-3 rounded-md shadow-md cursor-move border"
              >
                {task.taskTitle.slice(0, 50)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DragAndDropTaskManager;
