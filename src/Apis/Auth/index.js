import axios from "axios";
import { connection_string } from "../../Utils/connectionString";

export const register_user = (data) => {
  return axios({
    url: `${connection_string}/auth/user/register`,
    method: "POST",
    data,
  });
};

export const login = (data) => {
  return axios({
    url: `${connection_string}/auth/user/login`,
    method: "POST",
    data,
  });
};

export const me = () => {
  const Token = localStorage.getItem("Token");
  return axios({
    url: `${connection_string}/profile/user/me`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
};
