import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useMutation } from "react-query";
import Success from "../Components/Modal.Success";
import Error from "../Components/Modal.Error";
import { CircularLoading } from "../Components/CircularLoading";
import { updateProfile } from "../Apis";
import { useRecoilState } from "recoil";
import { userState } from "../Recoil/Auth";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    borderRadius: 30,
    paddingBottom: 30,
  },
  mainHeading: {
    fontWeight: "bold",
    fontSize: 32,
    color: "#48105b",
    padding: 30,
    fontFamily: "A Love Of Thunder !important",
  },
  secondHeading: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    backgroundColor: "#8950a3",
    padding: 10,
    paddingLeft: 30,
    fontFamily: "A Love Of Thunder !important",
  },
  searchBarInput: {
    borderRadius: 50,
    paddingRight: 32,
    height: 45,
    border: "1px solid #BABFC7",
    outline: "none",
    paddingLeft: 11,
    marginLeft: 10,
    width: "100%",
    marginTop: 10,
  },
  categoryHeading: {
    color: "#48105b",
    fontSize: 16,
    fontFamily: "A Love Of Thunder !important",
  },
  addBtn: {
    height: 55,
    background: "#8950a3",
    color: "white",
    border: "2px solid #8950a3",
    fontWeight: "bold",
    borderRadius: 50,
    width: 117,
    marginLeft: 10,
    marginTop: 30,
    "&:hover": {
      color: "#8950a3",
      background: "white",
    },
  },
  backIcon: {
    fontSize: 42,
    color: "#48105b",
    marginTop: 7,
    cursor: "pointer",
  },
}));

function Profile({ history }) {
  const classes = useStyles();
  const {
    mainPaper,
    mainHeading,
    secondHeading,
    searchBarInput,
    categoryHeading,
    addBtn,
    backIcon,
  } = classes;
  const [data, setData] = useState({
    name: "",
    salary: "",
    goal: "",
    balance: ""
  });
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    setData({
      name: user?.name,
      salary: user?.salary,
      goal: user?.goal,
      balance: user?.balance,
    });
  }, [user]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isLoading } = useMutation((data) => updateProfile(data), {
    onSuccess: (res) => {
      Success(res?.data?.message);
      setUser(res?.data?.user);
    },
    onError: (err) => Error(err?.response?.data?.message),
  });

  return (
    <>
      <Paper className={`${mainPaper} user-menu`}>
        <List>
          <ListItem>
            <ListItemAvatar onClick={() => history.replace("/")}>
              <ArrowBackIcon className={backIcon} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography className={mainHeading} style={{ paddingLeft: 0 }}>
                  PROFILE
                </Typography>
              }
            />
          </ListItem>
        </List>
        <Typography className={secondHeading}>SET GOALS</Typography>
        <Container maxWidth="lg">
          <Grid container style={{ marginLeft: 20, marginTop: 20 }}>
            <Grid item xs={12} md={3}>
              <Typography className={categoryHeading}>Name</Typography>
              <input
                type="text"
                className={searchBarInput}
                name="name"
                value={data?.name}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container style={{ marginLeft: 20, marginTop: 20 }}>
            <Grid item xs={12} md={3}>
              <Typography className={categoryHeading}>
                Monthly Salary
              </Typography>
              <input
                type="number"
                className={searchBarInput}
                name="salary"
                value={data?.salary}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container style={{ marginLeft: 20, marginTop: 20 }}>
            <Grid item xs={12} md={3}>
              <Typography className={categoryHeading}>Yearly Goal</Typography>
              <input
                type="number"
                className={searchBarInput}
                name="goal"
                value={data?.goal}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container style={{ marginLeft: 20, marginTop: 20 }}>
            <Grid item xs={12} md={3}>
              <Typography className={categoryHeading}>
                Current Account Balance
              </Typography>
              <input
                type="number"
                className={searchBarInput}
                name="balance"
                value={data?.balance}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          {isLoading ? (
            <Button variant="contained" className={addBtn} disabled>
              <CircularLoading />
            </Button>
          ) : (
            <Button className={addBtn} onClick={() => mutate(data)}>
              ADD
            </Button>
          )}
        </Container>
      </Paper>
    </>
  );
}

export default Profile;
