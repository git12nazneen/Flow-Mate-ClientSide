import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
  TASK: 'task',
};

const TaskItem = ({ task, index, moveTask }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: task._id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 mb-2 bg-gray-100 rounded-md flex justify-between items-center ${isDragging ? "opacity-50" : ""}`}
    >
      <span className={`text-gray-800 ${task.completed ? "line-through" : ""}`}>
        {task.taskTitle.slice(0, 35)}
      </span>
    </div>
  );
};

const TaskList = ({ tasks, moveTask }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = tasks.length;

      // If the item is dropped on itself, do nothing
      if (dragIndex === hoverIndex) {
        return;
      }

      // Move the task in the list
      moveTask(dragIndex, hoverIndex);

      // Update the index for the dragged item
      item.index = hoverIndex;
    },
  }));

  return (
    <div ref={drop} className="p-4 w-full bg-white rounded-lg shadow-md">
      {tasks.length === 0 ? (
        <div className="text-gray-500">No tasks available</div>
      ) : (
        tasks.map((task, index) => (
          <TaskItem key={task._id} task={task} index={index} moveTask={moveTask} />
        ))
      )}
    </div>
  );
};

const DragAndDrop = () => {
  const { teamName } = useLoaderData();
  const axiosCommon = UseAxiosCommon();

  // Function to fetch tasks by stage
  const fetchTasksByStage = async (stage) => {
    if (teamName) {
      const { data } = await axiosCommon.get(`/createTask/tasksByStage/${teamName}/${stage}`);
      return data;
    } else {
      throw new Error("Team name is missing");
    }
  };

  // Fetch tasks for each stage using TanStack Query
  const {
    data: todoTasks = [],
    isLoading: isLoadingTodo,
    error: errorTodo,
    refetch: refetchTodo,
  } = useQuery({
    queryKey: ["tasks", teamName, "todo"],
    queryFn: () => fetchTasksByStage("todo"),
    enabled: !!teamName,
  });

  const {
    data: inProgressTasks = [],
    isLoading: isLoadingInProgress,
    error: errorInProgress,
    refetch: refetchInProgress,
  } = useQuery({
    queryKey: ["tasks", teamName, "in progress"],
    queryFn: () => fetchTasksByStage("in progress"),
    enabled: !!teamName,
  });

  const {
    data: completedTasks = [],
    isLoading: isLoadingCompleted,
    error: errorCompleted,
    refetch: refetchCompleted,
  } = useQuery({
    queryKey: ["tasks", teamName, "done"],
    queryFn: () => fetchTasksByStage("done"),
    enabled: !!teamName,
  });

  // Log the team name
  useEffect(() => {
    console.log("teamName from loader:", teamName);
  }, [teamName]);

  // Render loading states
  if (isLoadingTodo || isLoadingInProgress || isLoadingCompleted) {
    return <div>Loading...</div>;
  }

  // Render error states
  if (errorTodo || errorInProgress || errorCompleted) {
    console.error("Error loading tasks:", errorTodo || errorInProgress || errorCompleted);
    return (
      <div>
        Error loading tasks:{" "}
        {errorTodo?.message || errorInProgress?.message || errorCompleted?.message}
      </div>
    );
  }

  // Handle task movement
  const moveTask = (fromIndex, toIndex) => {
    // Logic to move task and update the backend after UI update
    const taskToMove = todoTasks[fromIndex];
    const newTasks = [...todoTasks];
    newTasks.splice(fromIndex, 1);
    newTasks.splice(toIndex, 0, taskToMove);

    updateTaskStage(taskToMove._id, "todo"); // Add logic to update stage if necessary
    refetchTodo(); // Refetch after moving the task
  };

  // Separate function for updating the task stage on the server
  const updateTaskStage = async (taskId, newStage) => {
    try {
      await axiosCommon.put("/createTask/updateStage", {
        id: taskId,
        newStage,
      });
      console.log("Task stage updated:", taskId, "to", newStage);

      // Refetch to get updated tasks after the API call completes
      refetchTodo();
      refetchInProgress();
      refetchCompleted();
    } catch (error) {
      console.error("Error updating task stage:", error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-3 px-5 py-10">

        {/* To Do List */}
        <h2 className="text-lg font-semibold text-gray-700 mb-4">To Do</h2>
        <TaskList tasks={todoTasks} moveTask={moveTask} />

        {/* In Progress Tasks */}
        <h2 className="text-lg font-semibold text-gray-700 mb-4">In Progress</h2>
        <TaskList tasks={inProgressTasks} moveTask={moveTask} />

        {/* Completed Tasks */}
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Completed</h2>
        <TaskList tasks={completedTasks} moveTask={moveTask} />

      </div>
    </DndProvider>
  );
};

export default DragAndDrop;
