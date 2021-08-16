import axios from "axios";
import { connection_string } from "../../Utils/connectionString";

export const updateProfile = (data) => {
  const Token = localStorage.getItem("Token");
  return axios({
    url: `${connection_string}/profile/user/update`,
    method: "POST",
    data,
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
};
