// import { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const ActivityChart = () => {
//   const { user } = useSelector((state) => state.auth);
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     if (!user) return;

//     axios
//       .get("https://flowmate-a-team-collaboration-tool.vercel.app/timerData")
//       .then((response) => {
//         const allData = response.data;

//         const filteredData = allData.filter(
//           (item) => item.workerMail === user.email
//         );

//         const labels = filteredData.map((item) => item.taskTitle);
//         const elapsedHours = filteredData.map(
//           (item) =>
//             item.elapsedTime.hours +
//             item.elapsedTime.minutes / 60 +
//             item.elapsedTime.seconds / 3600
//         );

//         setChartData({
//           labels,
//           datasets: [
//             {
//               label: "Elapsed Time (Hours)",
//               data: elapsedHours,
//               backgroundColor: "rgba(56, 189, 248, 0.8)", // Sky-500 color
//               borderColor: "rgba(56, 189, 248, 1)",
//               borderWidth: 2,
//               borderSkipped: false,
//               borderRadius: 5, // Rounded corners
//             },
//           ],
//         });
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, [user]); // Effect runs when user changes

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: true,
//         labels: {
//           font: {
//             size: window.innerWidth < 768 ? 10 : 12, // Adjust font size based on screen width
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//         ticks: {
//           font: {
//             size: window.innerWidth < 768 ? 8 : 10, // Smaller font for mobile screens
//           },
//         },
//       },
//       y: {
//         beginAtZero: true,
//         grid: {
//           display: true,
//         },
//         ticks: {
//           stepSize: 1,
//           font: {
//             size: window.innerWidth < 768 ? 8 : 10,
//           },
//         },
//       },
//     },
//   };

//   return (
//     <>
//     {/* <h2 className="text-center text-2xl font-bold pt-5 mt-5 mb-10">Task Distribution</h2> */}
//     <div className="w-full h-72 md:h-80 lg:h-72 xl:h-[390px] p-4 bg-white rounded-md">
//       {chartData ? (
//         <Bar data={chartData} options={options} />
//       ) : (
//         <p>Loading chart...</p>
//       )}
//     </div>
//     </>
//   );
// };

// export default ActivityChart;

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const ActivityChart = () => {
  const { user } = useSelector((state) => state.auth);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!user) return;

    axios
      .get("https://flowmate-a-team-collaboration-tool.vercel.app/timerData")
      .then((response) => {
        const allData = response.data;

        const filteredData = allData.filter(
          (item) => item.workerMail === user.email
        );

        const labels = filteredData.map((item) => item.taskTitle);
        const elapsedHours = filteredData.map(
          (item) =>
            item.elapsedTime.hours +
            item.elapsedTime.minutes / 60 +
            item.elapsedTime.seconds / 3600
        );
        const taskCount = filteredData.map((_, index) => index + 1); // Example line data

        setChartData({
          labels,
          datasets: [
            {
              label: "Elapsed Time (Hours)",
              data: elapsedHours,
              borderColor: "rgba(56, 189, 248, 1)", // Sky-500 color for line
              backgroundColor: "rgba(56, 189, 248, 0.3)", // Transparent color for area
              borderWidth: 2,
              fill: true, // Fills the area below the line
              tension: 0.4, // Adds slight curve to line
              yAxisID: "y",
            },
            {
              label: "Task Count",
              data: taskCount,
              borderColor: "rgba(234, 88, 12, 1)", // Orange color for line chart
              backgroundColor: "rgba(234, 88, 12, 0.3)", // Optional, won't be filled
              borderWidth: 2,
              fill: false, // No fill for line chart
              tension: 0.4,
              yAxisID: "y1",
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [user]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 8 : 10,
          },
        },
      },
      y: {
        beginAtZero: true,
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Elapsed Time (Hours)",
        },
        ticks: {
          stepSize: 1,
          font: {
            size: window.innerWidth < 768 ? 8 : 10,
          },
        },
      },
      y1: {
        beginAtZero: true,
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Task Count",
        },
        grid: {
          drawOnChartArea: false, // only draw grid lines for one axis
        },
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 8 : 10,
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-72 md:h-80 lg:h-72 xl:h-[390px] p-4 bg-white rounded-md">
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default ActivityChart;
