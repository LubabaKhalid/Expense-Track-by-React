import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Summary = ({ expenses }) => {
  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const grouped = {};
  expenses.forEach((e) => {
    const cat = e.category?.trim() || "Others";
    grouped[cat] = (grouped[cat] || 0) + Number(e.amount);
  });

  const labels = Object.keys(grouped);
  const dataValues = Object.values(grouped);

  const colorPalette = [
    "#007bff", "#28a745", "#ffc107", "#dc3545",
    "#6f42c1", "#17a2b8", "#fd7e14", "#20c997",
    "#6610f2", "#e83e8c"
  ];

  const backgroundColors = labels.map((_, i) => colorPalette[i % colorPalette.length]);

  const pieData = {
    labels,
    datasets: [
      {
        label: "Amount by Category",
        data: dataValues,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: "Amount Spent",
        data: dataValues,
        backgroundColor: backgroundColors,
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className="my-4 text-center">
      <h4>Total Spent: {total.toFixed()}</h4>
      <div className="row justify-content-center mt-4">
        <div className="col-md-6 mb-4">
          <h5>Pie Chart</h5>
          <div style={{ maxWidth: "300px", margin: "0 auto" }}>
            <Pie data={pieData} />
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <h5>Bar Chart</h5>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default Summary;
