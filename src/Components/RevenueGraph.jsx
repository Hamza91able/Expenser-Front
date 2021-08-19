import React from "react";
import { Bar } from "react-chartjs-2";

const RevenueGraph = ({ expense }) => {
  const data = {
    labels: [
      "January",
      "Fabruary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Rupees",
        data: expense,
        backgroundColor: [
          "rgba(255, 36, 0, 0.2)",
          "rgba(255, 36, 0, 0.2)",
          "rgba(205, 92, 92, 0.2)",
          "rgba(124, 10, 2, 0.2)",
          "rgba(194, 24, 7, 0.2)",
          "rgba(224, 17, 95, 0.2)",
          "rgba(128, 0, 0, 0.2)",
          "rgba(178, 34, 34, 0.2)",
          "rgba(164, 90, 82, 0.2)",
          "rgba(150, 0, 24, 0.2)",
          "rgba(234, 60, 83, 0.2)",
          "rgba(126, 25, 27, 0.2)",
        ],
        borderColor: [
          "rgba(126, 25, 27, 0.2)",
          "rgba(234, 60, 83, 0.2)",
          "rgba(150, 0, 24, 0.2)",
          "rgba(164, 90, 82, 0.2)",
          "rgba(178, 34, 34, 0.2)",
          "rgba(128, 0, 0, 0.2)",
          "rgba(224, 17, 95, 0.2)",
          "rgba(194, 24, 7, 0.2)",
          "rgba(124, 10, 2, 0.2)",
          "rgba(205, 92, 92, 0.2)",
          "rgba(255, 36, 0, 0.2)",
          "rgba(255, 36, 0, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Bar data={data} options={options} style={{ height: "100vh" }} />
    </>
  );
};

export default RevenueGraph;
