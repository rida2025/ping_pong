import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, plugins, Ticks } from 'chart.js';
import styl from './CurveChart.module.css';
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

const CurveChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.time),
    datasets: [
      {
        label: 'Wins',
        data: data.map(item => item.wins),
        borderColor: '#25233C',
        backgroundColor: '#25233C5d',
        fill: true,
      },
      {
        label: 'Losses',
        data: data.map(item => item.losses),
        borderColor: '#7667D9',
        backgroundColor: '#7768d91d',
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
          text: 'Time',
          color: 'white',
        },
        ticks: {
            color: '#FFFFFF'
        },
        grid: {
          color: '#FFFFFF',
        },
        border: {
          color: '#FFFFFF',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Wins / Losses',
          color: 'white',
        },
        ticks: {
            color: '#FFFFFF'
        },
        grid: {
          color: '#FFFFFF',
        },
        border: {
          color: '#FFFFFF',
        },
        beginAtZero: true,
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

export default CurveChart;
