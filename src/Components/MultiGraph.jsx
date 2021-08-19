import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

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

const MultiGraph = ({ month_debit_credit }) => {
  const [data, setData] = useState({
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
        label: "Debit",
        data: [],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
      },
      {
        label: "Credit",
        data: [],
        backgroundColor: "rgb(0,128,0)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const debit = [];
    const credit = [];
    month_debit_credit?.forEach((set) => {
      debit.push(-set?.debit);
      credit.push(set?.credit);
    });
    const _datasets = [...data.datasets];
    _datasets[0].data = debit;
    _datasets[1].data = credit;
    setData({
      ...data,
      datasets: _datasets,
    });
  }, [month_debit_credit]);

  return <Bar data={data} options={options} />;
};

export default MultiGraph;
