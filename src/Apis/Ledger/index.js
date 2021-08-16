import axios from "axios";
import { connection_string } from "../../Utils/connectionString";

export const addExpense = (data) => {
  const Token = localStorage.getItem("Token");
  return axios({
    url: `${connection_string}/ledger/`,
    method: "POST",
    data,
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
};

export const getLedger = (
  page,
  perPage,
  searchString,
  from,
  to,
  ledger_type
) => {
  const Token = localStorage.getItem("Token");
  return axios({
    url: `${connection_string}/ledger/`,
    method: "GET",
    params: {
      page,
      perPage,
      searchString,
      from,
      to,
      ledger_type,
    },
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
};
