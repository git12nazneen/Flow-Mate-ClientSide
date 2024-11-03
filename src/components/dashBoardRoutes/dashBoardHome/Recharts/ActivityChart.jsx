import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const ActivityChart = () => {
  const { user } = useSelector((state) => state.auth);
  // console.log("user", user); // Log user for debugging
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!user) return;

    axios
      .get("https://flowmate-a-team-collaboration-tool.vercel.app/timerData")
      .then((response) => {
        const allData = response.data;
        // console.log("Fetched Data:", allData); // Debugging fetched data

        const filteredData = allData.filter(
          (item) => item.workerMail === user.email
        );

        if (filteredData.length === 0) {
          console.warn("No data found for the current user’s email.");
        }

        const labels = filteredData.map((item) => item.taskTitle.slice(0, 10));
        const elapsedHours = filteredData.map((item) => {
          if (!item.elapsedTime) {
            console.warn("Missing elapsedTime for:", item);
            return 0; // Handle missing elapsedTime data
          }
          return (
            item.elapsedTime.hours +
            item.elapsedTime.minutes / 60 +
            item.elapsedTime.seconds / 3600
          );
        });

        const taskCount = filteredData.map((_, index) => index + 1);

        setChartData({
          labels,
          datasets: [
            {
              label: "Elapsed Time (Hours)",
              data: elapsedHours,
              borderColor: "rgba(56, 189, 248, 1)",
              backgroundColor: "rgba(56, 189, 248, 0.3)",
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              yAxisID: "y",
            },
            {
              label: "Task Count",
              data: taskCount,
              borderColor: "rgba(234, 88, 12, 1)",
              backgroundColor: "rgba(234, 88, 12, 0.3)",
              borderWidth: 2,
              fill: false,
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
          drawOnChartArea: false,
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
