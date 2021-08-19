import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import EmailIcon from "@material-ui/icons/Email";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import LockIcon from "@material-ui/icons/Lock";

import ForgetPassword from "./ForgotPassword";

import SideLoginImage from "../Assets/Images/side-login.jpg";
import BackgroundImage from "../Assets/Images/background-graph.jpg";
import Logo from "../Assets/Images/logo.png";
import Register from "./Register";

import { useMutation, useQuery } from "react-query";
import { login, register_user } from "../Apis";
import { CircularLoading } from "../Components/CircularLoading";
import Success from "../Components/Modal.Success";
import Error from "../Components/Modal.Error";
import { useRecoilState } from "recoil";
import { loggedInState, userState } from "../Recoil/Auth";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: "no-repeat, repeat",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainPaper: {
    width: "100%",
    height: "100vh",
    borderRadius: 10,
    [theme.breakpoints.up("md")]: {
      width: 1110,
      height: 730,
    },
  },
  sideImage: {
    maxHeight: "100%",
    maxWidth: "100%",
    height: "100%",
    width: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  logo: {
    maxHeight: "100%",
    maxWidth: "100%",
    marginTop: 50,
    height: 100,
    width: "auto",
  },
  loginTypography: {
    fontSize: 43,
    marginTop: 30,
    fontWeight: "bold",
    color: "#48105b",
    fontFamily: "A Love Of Thunder !important",
  },
  subText: {
    fontSize: 16,
    color: "#808080",
    fontFamily: "A Love Of Thunder !important",
  },
  formControl: {
    width: "100%",
    marginTop: 30,
  },
  iconStyle: {
    color: "#8950a3",
  },
  forgotTypography: {
    color: "#13C9EF",
    fontSize: 15,
    marginTop: 10,
    float: "right",
    fontWeight: "bold",
    cursor: "pointer",
  },
  loginBtn: {
    width: "100%",
    marginTop: 30,
    padding: 20,
    borderRadius: 30,
    background: "#8950a3",
    color: "white",
    fontSize: 16,
    "&:hover": {
      background: "#8950a3",
      color: "white",
    },
  },
  registerTypography: {
    color: "#13C9EF",
    fontSize: 15,
    marginTop: 30,
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

function Login({ setLogged_in }) {
  const classes = useStyles();
  const {
    mainDiv,
    mainPaper,
    sideImage,
    logo,
    loginTypography,
    subText,
    formControl,
    iconStyle,
    forgotTypography,
    loginBtn,
    registerTypography,
  } = classes;
  const [user, setUser] = useRecoilState(userState);
  const [forgot, setForgot] = React.useState(false);
  const [login_form, setLoginForm] = React.useState(true);
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    confirm_password: "",
    showPassword: false,
  });
  const { isLoading, isError, isSuccess, mutate } = useMutation(
    (data) => register_user(data),
    {
      retry: false,
      onSuccess: (res) => {
        Success(res?.data?.message);
        setLoginForm(true);
      },
      onError: (err) => Error(err?.response?.data?.message),
    }
  );

  const { mutate: mutateLogin, isLoading: isLoadingLogin } = useMutation(
    (data) => login(data),
    {
      retry: false,
      onSuccess: (res) => {
        localStorage.setItem("Token", res.data.token);
        window.location.reload();
        // setLogged_in(true);
      },
      onError: (err) => Error(err?.response?.data?.message),
    }
  );

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={mainDiv}>
      <Paper className={mainPaper}>
        <Grid container style={{ height: "100%" }}>
          <Grid item xs={0} md={6} style={{ height: "100%" }}>
            <img src={SideLoginImage} className={sideImage} />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              textAlign: "center",
              padding: 60,
              paddingTop: 23,
            }}
          >
            <img src={Logo} className={logo} />
            <Typography className={loginTypography}>
              {login_form ? "LOGIN" : "REGISTER"}
            </Typography>
            <Typography className={subText}>
              {login_form ? "Login To Your Account" : "Register a Free Account"}
            </Typography>

            {login_form ? (
              <>
                <FormControl className={formControl}>
                  <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                      <InputAdornment position="start">
                        <EmailIcon className={iconStyle} />
                      </InputAdornment>
                    }
                    placeholder="Enter Email Address"
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                    value={values.email}
                  />
                </FormControl>
                <FormControl className={formControl}>
                  <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                      <InputAdornment position="start">
                        <LockIcon className={iconStyle} />
                      </InputAdornment>
                    }
                    type={values.showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility className={iconStyle} />
                          ) : (
                            <VisibilityOff className={iconStyle} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter Password"
                    onChange={(e) =>
                      setValues({ ...values, password: e.target.value })
                    }
                    value={values.password}
                  />
                </FormControl>
              </>
            ) : (
              <Register
                classes={classes}
                handleClickShowPassword={handleClickShowPassword}
                handleMouseDownPassword={handleMouseDownPassword}
                values={values}
                setValues={setValues}
              />
            )}
            {login_form && !isLoading && !isLoadingLogin && (
              <Grid
                container
                style={{
                  marginTop: 20,
                }}
              >
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <Typography
                    className={forgotTypography}
                    onClick={() => setForgot(true)}
                  >
                    Forgot Password?
                  </Typography>
                  {forgot && <ForgetPassword setForgot={setForgot} />}
                </Grid>
              </Grid>
            )}
            {isLoading || isLoadingLogin ? (
              <Button variant="contained" className={loginBtn} disabled>
                <CircularLoading />
              </Button>
            ) : (
              <Button
                variant="contained"
                className={loginBtn}
                onClick={() => {
                  if (!login_form) mutate(values);
                  else mutateLogin(values);
                }}
              >
                {login_form ? "LOGIN" : "REGISTER"}
              </Button>
            )}
            {!isLoading && !isLoadingLogin && (
              <Typography
                className={registerTypography}
                onClick={() => setLoginForm(!login_form)}
              >
                {!login_form
                  ? "Already a Member? Login Here"
                  : "New Here? Regsiter a Free Account"}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default withRouter(Login);
