import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";

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

const LineChart = ({ daily_expense }) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Expense",
        data: [],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  });

  useEffect(() => {
    if (daily_expense?.length > 0) {
      const _data = { ...data };
      const labels = [];
      const data_expense = [];
      daily_expense.forEach((expense) => {
        labels.push(moment(expense.first).format("MMMM-DD"));
        data_expense.push(expense.price);
      });
      _data.labels = labels;
      _data.datasets[0].data = data_expense;
      setData(_data);
    }
  }, [daily_expense]);

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
