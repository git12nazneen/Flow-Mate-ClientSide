import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";

// Function to fetch tasks from your API
const fetchTasks = async () => {
  const response = await fetch('https://flowmate-a-team-collaboration-tool.vercel.app/createTask');
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  return response.json();
};

const Completed = () => {
  const { teamName } = useLoaderData(); 

  // Fetch tasks using TanStack Query
  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading todos</div>;
  }

  // Filter todos to get only those that are completed
  const filteredTodos = tasks.filter(
    (todo) => todo.stage === "done" && todo.teamName === teamName
  );

  return (
    <div className="p-4 w-80 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Completed</h2>

      {/* Show message if there are no completed todos */}
      {filteredTodos.length === 0 ? (
        <div className="text-gray-500">No completed tasks</div>
      ) : (
        // Existing completed todos
        filteredTodos.map((todo) => (
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

export default Completed;
