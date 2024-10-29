import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';

const ActivityChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetching data from the provided endpoint
    axios.get('http://localhost:5000/timerData')
      .then((response) => {
        const data = response.data;

        // Preparing data for chart
        const labels = data.map((item) => item.taskTitle);
        const elapsedHours = data.map((item) => 
          item.elapsedTime.hours + item.elapsedTime.minutes / 60 + item.elapsedTime.seconds / 3600
        );

        setChartData({
          labels,
          datasets: [{
            label: 'Elapsed Time (Hours)',
            data: elapsedHours,
            backgroundColor: 'rgba(56, 189, 248, 0.8)', // Sky-500 color
            borderColor: 'rgba(56, 189, 248, 1)',
            borderWidth: 2,
            borderSkipped: false,
            // Mimic triangular effect by adjusting borderRadius
            borderRadius: {
              topLeft: 0,
              topRight: 0,    // One side rounded more to form a triangle
              bottomLeft: 0,
              bottomRight: 0,
            }
          }]
        });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true
        },
        ticks: {
          stepSize: 10
        }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};
export default ActivityChart;