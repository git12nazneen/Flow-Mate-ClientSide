import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the required components for the pie chart
ChartJS.register(ArcElement, Tooltip, Legend);
import PropTypes from "prop-types";
const PieChartInteraction = ({ data }) => {
  // Prepare data for the pie chart
  console.log(data);

  const chartData = {
    labels: ["Contact Requests", "Tasks Created", "Teams"],
    datasets: [
      {
        label: "Counts",
        data: [data.contactUs, data.tasks, data.teams],
        backgroundColor: [
          "rgba(135, 206, 250, 0.6)", // Light Blue (SkyBlue)
          "rgba(75, 192, 192, 0.2)", // Tasks Created
          "rgba(153, 102, 255, 0.3)", // Teams
        ],
        borderColor: [
          "rgba(135, 206, 250, 1)", // Border for Light Blue (SkyBlue)
          "rgba(75, 192, 192, 1)", // Border for Tasks Created
          "rgba(153, 102, 255, 1)", // Border for Teams
        ],

        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex justify-center items-center h-96 w-full sm:w-[450px] md:w-[500px] bg-white rounded-lg shadow-md p-2 lg:p-10">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PieChartInteraction;
PieChartInteraction.propTypes = {
  data: PropTypes.object,
};
