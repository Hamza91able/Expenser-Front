import React from "react";
import { Button, Grid, IconButton, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import EmailIcon from "@material-ui/icons/Email";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import LockIcon from "@material-ui/icons/Lock";

export default function Register({
  classes,
  handleClickShowPassword,
  handleMouseDownPassword,
  values,
  setValues,
}) {
  return (
    <>
      <FormControl className={classes.formControl}>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <EmailIcon className={classes.iconStyle} />
            </InputAdornment>
          }
          placeholder="Enter Email Address"
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          value={values.email}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <LockIcon className={classes.iconStyle} />
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
                  <Visibility className={classes.iconStyle} />
                ) : (
                  <VisibilityOff className={classes.iconStyle} />
                )}
              </IconButton>
            </InputAdornment>
          }
          placeholder="Enter Password"
          onChange={(e) => setValues({ ...values, password: e.target.value })}
          value={values.password}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <LockIcon className={classes.iconStyle} />
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
                  <Visibility className={classes.iconStyle} />
                ) : (
                  <VisibilityOff className={classes.iconStyle} />
                )}
              </IconButton>
            </InputAdornment>
          }
          placeholder="Confirm Password"
          onChange={(e) =>
            setValues({ ...values, confirm_password: e.target.value })
          }
          value={values.confirm_password}
        />
      </FormControl>
    </>
  );
}
