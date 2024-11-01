// import React, { useEffect, useState } from 'react';
// import { Pie, Bar } from 'react-chartjs-2';
// import { Chart as ChartJS } from 'chart.js/auto';  // Ensures chart.js elements are loaded
// import UseAxiosCommon from '@/hooks/UseAxiosCommon';
// import { useSelector } from 'react-redux';
// import { useQuery } from '@tanstack/react-query';

// const UserContributionSummary = () => {
//   // Get user email from Redux state
//   const userEmail = useSelector((state) => state.auth.user?.email);
//   const [contributions, setContributions] = useState(null);
//   const axiosCommon = UseAxiosCommon();

//   useEffect(() => {
//     const fetchContributions = async () => {
//       if (!userEmail) return; // Prevent API call if userEmail is not available
//       try {
//         const response = await axiosCommon.get(`/users/file-count/${userEmail}`);
//         setContributions(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching contributions:', error);
//       }
//     };

//     fetchContributions();
//   }, [userEmail, axiosCommon]);

//   // Fetch total task data using useQuery
//   const { data: totalTask = {} } = useQuery({
//     queryKey: ["totalTask"],
//     queryFn: async () => {
//       const { data } = await axiosCommon.get(`/createTask/task-count/${userEmail}`);
//       console.log(data);
//       return data;
//     },
//     enabled: !!userEmail, // Only fetch if userEmail is available
//   });

//   // Display a loading message while data is being fetched
//   if (!contributions || !totalTask) {
//     return <div>Loading...</div>;
//   }

//   // Prepare data for the Pie chart
//   const pieData = {
//     labels: ['Tasks Completed', 'Files Uploaded'],
//     datasets: [{
//       data: [
//         totalTask.totalTasks || 0, // Default to 0 if undefined
//         contributions.fileCount || 0,       // Default to 0 if undefined

//       ],
//       backgroundColor: ['#FF6384', '#36A2EB',],
//       hoverBackgroundColor: ['#FF6384', '#36A2EB'],
//     }]
//   };

//   // Prepare data for the Bar chart (total tasks)
//   const barData = {
//     labels: ['Total Tasks', 'file-count'],
//     datasets: [{
//       label: 'Task Overview',
//       data: [
//         totalTask.totalTasks || 0,              // Total tasks
//         contributions.fileCount || 0,          // Tasks in progress
//         // To-do tasks
//       ],
//       backgroundColor: ['#4BC0C0', '#FF9F40'],
//       hoverBackgroundColor: ['#4BC0C0', '#FF9F40'],
//     }]
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto p-4">
//       <h2 className="text-center text-2xl font-bold mb-6">User Contribution Summary</h2>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Pie Chart for Contributions */}
//         <div className="relative w-full h-96 p-4 bg-white shadow-md rounded-md">
//           <Pie data={pieData} options={options} />
//         </div>

//         {/* Bar Chart for Total Task Data */}
//         <div className="relative w-full h-96 p-4 bg-white shadow-md rounded-md">
//           <Bar data={barData} options={options} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserContributionSummary;

import React, { useEffect, useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2'; // Use Line for area, Doughnut for selection
import { Chart as ChartJS } from 'chart.js/auto';
import UseAxiosCommon from '@/hooks/UseAxiosCommon';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

const UserContributionSummary = () => {
  const userEmail = useSelector((state) => state.auth.user?.email);
  const [contributions, setContributions] = useState(null);
  const axiosCommon = UseAxiosCommon();

  useEffect(() => {
    const fetchContributions = async () => {
      if (!userEmail) return;
      try {
        const response = await axiosCommon.get(`/users/file-count/${userEmail}`);
        setContributions(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching contributions:', error);
      }
    };

    fetchContributions();
  }, [userEmail, axiosCommon]);

  const { data: totalTask = {} } = useQuery({
    queryKey: ["totalTask"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/createTask/task-count/${userEmail}`);
      // console.log(data);
      return data;
    },
    enabled: !!userEmail,
  });

  if (!contributions || !totalTask) {
    return <div>Loading...</div>;
  }

  // Data for Area (Line) Chart
  const areaData = {
    labels: ['Total Tasks', 'Files Uploaded'],
    datasets: [{
      label: 'User Contributions',
      data: [
        totalTask.totalTasks || 0,
        contributions.fileCount || 0,
      ],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: true,
      tension: 0.4,
    }]
  };

  // Data for Doughnut Chart
  const doughnutData = {
    labels: ['Tasks Completed', 'Files Uploaded'],
    datasets: [{
      data: [
        totalTask.totalTasks || 0,
        contributions.fileCount || 0,
      ],
      backgroundColor: ['#dbf2f2', '#36A2EB'],
      hoverBackgroundColor: ['#7f8bdb', '#36A2EB'],
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className=" max-w-6xl mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-6">User Contribution Summary</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Area Chart for Contributions */}
        <div className="relative w-full h-96 p-4 bg-white shadow-md rounded-md">
          <Line data={areaData} options={options} />
        </div>

        {/* Doughnut Chart for Total Task Data */}
        <div className="relative w-full h-96 p-4 bg-white shadow-md rounded-md">
          <Doughnut data={doughnutData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default UserContributionSummary;
