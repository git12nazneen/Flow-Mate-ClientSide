

import { useNavigate } from "react-router-dom";
import line from '../../../assets/line.png.png'
import { useQuery } from "@tanstack/react-query";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useSelector } from "react-redux";
import { useState } from "react";

const DashBoardCards = () => {
  const navigate = useNavigate();

  // Sample card data (could be dynamic or fetched from API)
  const axiosCommon = UseAxiosCommon();
  const userEmail = useSelector((state) => state.auth.user?.email);

  const [error, setError] = useState(null);
  console.log(error)


  // Fetching paid user data
  const {
    data: task = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["task"],

    queryFn: async () => {
      const res = await axiosCommon.get("/createTask");
      console.log(res)
      return res.data;
    },

    onError: (error) => {
      setError(error.message);
    },
  });

  // Handle loading state
  if (isLoading) {
    return <div>Loading paid user data...</div>;
  }

  // Handle error state
  if (isError) {
    return <div>Error fetching paid user data.</div>;
  }

  const handleCardClick = (path) => {
    navigate(path); // Navigate to the respective page when a card is clicked
  };

  const filteredTodos = task.filter(
    (todo) => todo.stage === "todo" && todo.email === userEmail // Adjust the filter condition
  );

  return (

    <div>
      <div className="lg:flex lg:justify-between gap-6 pb-10">
        {task[0] && (
          <div className="flex flex-col lg:flex-row lg:w-full lg:justify-between bg-white hover:shadow-md rounded-lg overflow-hidden shadow-lg">
            <div
              onClick={() => handleCardClick(task[0].navigateTo)}
              className="lg:ml-8 cursor-pointer text-black p-4 lg:p-6 w-full lg:w-1/2 flex flex-col items-center lg:items-start hover:scale-105 transform transition-transform duration-300"
            >
              <div className="text-sm lg:text-base mb-4 lg:mb-6 font-semibold text-gray-600 text-center lg:text-left">
                des:{task[1].assignedTo}
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-2 lg:mb-4 text-center lg:text-left">
                {task.length}
              </h2>
              <p className="text-lg lg:text-xl text-center lg:text-left">
                {task[0].title}
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                className="h-40 lg:h-60 w-80 lg:w-96 object-contain"
                src={line}
                alt=""
              />
            </div>
            <p>hello</p>
          </div>
        )}
      </div>



      {/* show 3 data */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
        {task.slice(-3).map((task, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(task.navigateTo)}
            className={`cursor-pointer ${task.color} text-black rounded-lg shadow-lg p-4 lg:p-6 w-full lg:w-[276px] flex flex-col items-center lg:items-start hover:scale-105 transform transition-transform duration-300 hover:shadow-gray-200`}
          >
            <div className="text-sm mx-auto lg:text-base mb-4 lg:mb-6 font-bold text-gray-600 text-center lg:text-left">
              Name: {filteredTodos.assignedTo}
            </div>
            <p className="text-lg lg:text-xl text-center mx-auto lg:text-left">
              {filteredTodos.teamName}
            </p>
            <p className="text-lg lg:text-xl text-center mx-auto lg:text-left">
              {filteredTodos.stage}
            </p>
            <h2 className="mx-auto text-4xl lg:text-5xl font-bold mb-2 lg:mb-4 text-center lg:text-left">
              {filteredTodos.length}
            </h2>
          </div>
        ))}
      </div>




    </div>
  );
};

export default DashBoardCards;





// // export default DashBoardCards;
// import { useQuery } from "@tanstack/react-query";
// import { useSelector } from "react-redux"; // Assuming you're using Redux to get user data

// // Function to fetch tasks from your API
// const fetchTasks = async () => {
//   const response = await fetch('https://flowmate-a-team-collaboration-tool.vercel.app/createTask');
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };

// const DashBoardCards = () => {
//   // Get the user's email from the Redux store
//   const userEmail = useSelector((state) => state.auth.user?.email); // Adjust according to your state structure

//   // Fetch tasks using TanStack Query
//   const { data: tasks = [], isLoading, error } = useQuery({
//     queryKey: ['tasks'],
//     queryFn: fetchTasks,
//   });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading tasks</div>;
//   }

//   // Filter tasks based on the current user's email and "todo" stage
//   const filteredTodos = tasks.filter(
//     (todo) => todo.stage === "todo" && todo.email === userEmail // Adjust the filter condition
//   );

//   return (
//     <div className="p-4 w-80 mx-auto bg-white rounded-lg shadow-md">
//       <h2 className="text-lg font-semibold text-gray-700 mb-4">Todos for {userEmail}</h2>

//       {/* Show message if there are no todos */}
//       {filteredTodos.length === 0 ? (
//         <div className="text-gray-500">No tasks added recently for this user</div>
//       ) : (
//         // Display the filtered todos
//         filteredTodos.map((todo) => (
//           <div
//             key={todo._id} // Use _id for uniqueness
//             className="p-2 mb-2 bg-gray-100 rounded-md flex justify-between items-center"
//           >
//             <span
//               className={`text-gray-800 ${todo.completed ? "line-through" : ""}`}
//             >
//               {todo.taskTitle.slice(0, 35)} {/* Display the task title */}
//             </span>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default DashBoardCards;
