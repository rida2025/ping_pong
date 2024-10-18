import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Ticks } from 'chart.js';
import styl from './CurveLevel.module.css';
import { BsBack } from 'react-icons/bs';
import { color } from 'chart.js/helpers';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const CurveLevel = ({ data }) => {
  const chartData = {
    labels: data.map(item => `Level ${item.level}`),
    datasets: [
      {
        label: 'Time to Change Levels',
        data: data.map(item => item.time),
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.3)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Levels',
          color: 'white',
        },
        ticks: {
            color: 'white',
        },        grid: {
          color: '#FFFFFF',
        },
        border: {
          color: '#FFFFFF',
        },
      },
      y: {
          title: {
              display: true,
              text: 'Time to Change Levels (hours/days)',
              color: 'white',
          },
          beginAtZero: true,
          ticks: {
              color: 'white',
          },
          grid: {
            color: '#FFFFFF',
          },
          border: {
            color: '#FFFFFF',
          },
      },
    },
    plugins: {
        legend: {
            labels: {
                color: '#FFFFFF'
            },
        },
    }
};

return (
    <div className={styl.chartContainer}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default CurveLevel;
