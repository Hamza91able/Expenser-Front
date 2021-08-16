import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles((theme) => ({
  mainHeading: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 36,
    color: "#48105b",
  },
  searchBarInput: {
    borderRadius: 50,
    paddingRight: 32,
    height: 45,
    border: "1px solid #BABFC7",
    outline: "none",
    paddingLeft: 11,
    width: "90%",
    background: "#f6f4f4",
    color: "#4b4b4b",
  },
  resendCode: {
    textAlign: "right",
    color: "#13c9ef",
    fontWeight: "bold",
    marginTop: 10,
    cursor: "pointer",
  },
  conBtn: {
    background: "#8950a3",
    color: "white",
    borderRadius: 50,
    fontWeight: 600,
    width: "100%",
    height: 60,
    "&:hover": {
      background: "#8950a3",
      color: "white",
    },
    marginTop: 20,
    marginBottom: 20,
  },
  backBtn: {
    color: "#48105b",
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  formControl: {
    width: "100%",
    marginTop: 30,
  },
  iconStyle: {
    color: "#8950a3",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ForgetPassword(props) {
  const classes = useStyles();
  const {
    mainHeading,
    searchBarInput,
    resendCode,
    conBtn,
    backBtn,
    formControl,
    iconStyle,
  } = classes;
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);

  const [values, setValues] = React.useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

  const handleClose = () => {
    props.setForgot(false);
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(1);
    }
    if (step === 2) {
      setStep(2);
    }
    if (step === 3) {
      setStep(3);
    }
    if (step === 4) {
      handleClose();
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const renderNewPassword = () => {
    return (
      <>
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
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            value={values.password}
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
              setValues({ ...values, confirmPassword: e.target.value })
            }
            value={values.confirmPassword}
          />
        </FormControl>
      </>
    );
  };

  return (
    <div>
      <Dialog
        open
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-slide-title">
          <Typography className={mainHeading}>Password Recovery</Typography>
        </DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          {step === 1 ? (
            <>
              <input
                type="email"
                className={searchBarInput}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter Email Address"
              />
            </>
          ) : step === 2 ? (
            <>
              <input
                type="number"
                className={searchBarInput}
                onChange={(e) => setCode(e.target.value)}
                value={code}
                placeholder="Enter Verification Code"
              />
              <Typography className={resendCode}>Resend Code</Typography>
            </>
          ) : (
            renderNewPassword()
          )}
          {props.recoveryLoading ? (
            <Button className={conBtn}>
              <CircularProgress style={{ color: "white" }} />
            </Button>
          ) : step !== 3 ? (
            <Button className={conBtn} onClick={handleNextStep}>
              CONTINUE
            </Button>
          ) : (
            <Button className={conBtn} onClick={handleNextStep}>
              UPDATE
            </Button>
          )}
          <Button
            className={backBtn}
            startIcon={<ArrowBackIcon />}
            onClick={handleClose}
          >
            Back To Login
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ForgetPassword;
