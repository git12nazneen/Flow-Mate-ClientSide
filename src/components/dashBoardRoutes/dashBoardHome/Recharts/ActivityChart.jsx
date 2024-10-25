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
      .get("http://localhost:5000/timerData")
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
              borderRadius: {
                topLeft: 0,
                topRight: 0,
                bottomLeft: 0,
                bottomRight: 0,
              },
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
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px", overflow: "auto" }}>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default ActivityChart;
