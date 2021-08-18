import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";

const options = {
  scales: {
    yAxes: [
      {
        type: "linear",
        display: true,
        position: "left",
        id: "y-axis-1",
      },
      {
        type: "linear",
        display: true,
        position: "right",
        id: "y-axis-2",
        gridLines: {
          drawOnArea: false,
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
        yAxisID: "y-axis-1",
      },
      {
        label: "Credit",
        data: [],
        fill: false,
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgba(54, 162, 235, 0.2)",
        yAxisID: "y-axis-2",
      },
    ],
  });

  useEffect(() => {
    const debit = [];
    const credit = [];
    console.log(month_debit_credit)
    month_debit_credit?.forEach((set) => {
      debit.push(set?.debit);
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

  return <Line data={data} options={options} />;
};

export default MultiGraph;
