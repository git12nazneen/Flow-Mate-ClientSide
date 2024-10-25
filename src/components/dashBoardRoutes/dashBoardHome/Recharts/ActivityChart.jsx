import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";

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

        setChartData({
          labels,
          datasets: [
            {
              label: "Elapsed Time (Hours)",
              data: elapsedHours,
              backgroundColor: "rgba(56, 189, 248, 0.8)", // Sky-500 color
              borderColor: "rgba(56, 189, 248, 1)",
              borderWidth: 2,
              borderSkipped: false,
              borderRadius: 5, // Rounded corners
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [user]); // Effect runs when user changes

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12, // Adjust font size based on screen width
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
            size: window.innerWidth < 768 ? 8 : 10, // Smaller font for mobile screens
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
        ticks: {
          stepSize: 1,
          font: {
            size: window.innerWidth < 768 ? 8 : 10,
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-64 md:h-80 lg:h-96 xl:h-[500px] p-4">
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default ActivityChart;
