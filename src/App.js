import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { me } from "./Apis";
import ResponsiveDrawer from "./Components/Drawer";
import { loggedInState, userState } from "./Recoil/Auth";
import Login from "./Screens/Login";
import Logo from "./Assets/Images/logo.png";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useRecoilState(userState);
  const [logged_in, setLogged_in] = useRecoilState(loggedInState);

  useEffect(() => {
    const Token = localStorage.getItem("Token");
    if (Token) {
      mutate();
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, []);

  const { mutate } = useMutation(() => me(), {
    retry: false,
    onSuccess: (res) => {
      setUser(res?.data?.user);
      setLogged_in(true);
      setLoading(false);
    },
    onError: (err) => {
      localStorage.clear();
      setLoading(false);
      setLogged_in(false);
    },
  });

  if (loading)
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={Logo}
          style={{
            height: 128,
            width: 300,
          }}
        />
      </div>
    );

  return !logged_in ? (
    <Login setLogged_in={setLogged_in} />
  ) : (
    <ResponsiveDrawer setLogged_in={setLogged_in} />
  );
}
