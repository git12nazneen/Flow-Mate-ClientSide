import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useEffect } from "react";

const ToDoList = () => {
  const { teamName } = useLoaderData();
  const axiosCommon = UseAxiosCommon();
  const stage = "todo";
  useEffect(() => {
    console.log("teamName from loader:", teamName);
  }, [teamName]); // Add teamName as a dependency to log only when it changes
  // Fetch tasks using TanStack Query
  const {
    data: tasks = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tasks", teamName, stage],
    queryFn: async () => {
      if (teamName) {
        const { data } = await axiosCommon.get(
          `/createTask/tasksByStage/${teamName}/${stage}`
        );
        return data;
      } else {
        throw new Error("Team name is missing");
      }
    },
    enabled: !!teamName,
  });

  console.log(tasks);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error loading tasks:", error);
    return <div>Error loading tasks: {error.message}</div>; // Show the error message
  }

  return (
    <div className="p-4 w-80 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        To Do
      </h2>

      {/* Show message if there are no completed tasks */}
      {tasks.length === 0 ? (
        <div className="text-gray-500">No completed tasks</div>
      ) : (
        tasks.map((todo) => (
          <div
            key={todo._id} // Use _id for uniqueness
            className="p-2 mb-2 bg-gray-100 rounded-md flex justify-between items-center"
          >
            <span
              className={`text-gray-800 ${
                todo.completed ? "line-through" : ""
              }`}
            >
              {todo.taskTitle.slice(0, 35)} {/* Display the title */}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default ToDoList;
