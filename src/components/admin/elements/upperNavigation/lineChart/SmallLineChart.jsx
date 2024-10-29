import { Line } from "react-chartjs-2"; // Import Line chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PropTypes from "prop-types";
// Register the required components for the line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SmallLineChart = ({ data }) => {
  // Prepare data for the line chart
  const chartData = {
    labels: ["Paid Users", "Logged In Users", "Subscription Users"], // Updated labels
    datasets: [
      {
        label: "User Count",
        data: [data.paidUsers, data.loggedInUsers, data.subscriptionUsers],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        fill: true, // Fill under the line
        pointBackgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
        ], // Different colors for each point
        pointBorderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
        ], // Border color for each point
        pointBorderWidth: 3,
        pointRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top", // Adjust legend for better placement
      },
    },
  };

  return (
    <div className="flex justify-center w-full">
      <div className=" h-96 w-full sm:w-[400px] md:w-[500px] lg:w-[600px] p-3 lg:p-10">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default SmallLineChart;

SmallLineChart.propTypes = {
  data: PropTypes.object.isRequired,
};
