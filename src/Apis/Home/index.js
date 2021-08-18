import axios from "axios";
import { connection_string } from "../../Utils/connectionString";

export const getCurrentMonthsExpense = () => {
  const Token = localStorage.getItem("Token");
  return axios({
    url: `${connection_string}/home/month-expense`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
};

export const getTodaysExpense = () => {
  const Token = localStorage.getItem("Token");
  return axios({
    url: `${connection_string}/home/today-expense`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
};

export const getMonthlyAndAvgMonthly = () => {
  const Token = localStorage.getItem("Token");
  return axios({
    url: `${connection_string}/home/avg-expense`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
};

export const getMonthDebitCredit = () => {
  const Token = localStorage.getItem("Token");
  return axios({
    url: `${connection_string}/home/avg-dual`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
};
