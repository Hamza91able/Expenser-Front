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
  Checkbox,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useMutation } from "react-query";
import { addExpense } from "../Apis/Ledger";
import Success from "../Components/Modal.Success";
import Error from "../Components/Modal.Error";
import { CircularLoading } from "../Components/CircularLoading";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useRecoilState } from "recoil";
import { userState } from "../Recoil/Auth";

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

function AddExpense({ history }) {
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
    price: "",
    date: "",
    type: "Debit",
    note: "",
    remove: false,
  });
  const [user, setUser] = useRecoilState(userState);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isLoading } = useMutation((data) => addExpense(data), {
    onSuccess: (res) => {
      if (res?.data?.balance) setUser({ ...user, balance: res?.data?.balance });
      Success(res?.data?.message);
      history.replace("/ledger");
    },
    onError: (err) => Error(err?.response?.data?.message),
  });

  return (
    <>
      <Paper className={`${mainPaper} user-menu`}>
        <List>
          <ListItem>
            <ListItemAvatar onClick={() => history.replace("/ledger")}>
              <ArrowBackIcon className={backIcon} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography className={mainHeading} style={{ paddingLeft: 0 }}>
                  LEDGER
                </Typography>
              }
            />
          </ListItem>
        </List>
        <Typography className={secondHeading}>ADD EXPENSE</Typography>
        <Container maxWidth="lg">
          <Grid container style={{ marginLeft: 20, marginTop: 20 }}>
            <Grid item xs={12} md={3}>
              <Typography className={categoryHeading}>NAME</Typography>
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
              <Typography className={categoryHeading}>PRICE</Typography>
              <input
                type="number"
                className={searchBarInput}
                name="price"
                value={data?.price}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container style={{ marginLeft: 20, marginTop: 20 }}>
            <Grid item xs={12} md={3}>
              <Typography className={categoryHeading}>DATE</Typography>
              <input
                type="datetime-local"
                className={searchBarInput}
                name="date"
                value={data?.date}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container style={{ marginLeft: 20, marginTop: 20 }}>
            <Grid item xs={12} md={3}>
              <Typography className={categoryHeading}>Type</Typography>
              <FormControl component="fieldset" style={{ marginLeft: 10 }}>
                <RadioGroup
                  aria-label="type"
                  name="type"
                  value={data?.type}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Credit"
                    control={<Radio />}
                    label="Credit"
                  />
                  <FormControlLabel
                    value="Debit"
                    control={<Radio />}
                    label="Debit"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          {data?.type === "Debit" && (
            <Grid container style={{ marginLeft: 20, marginTop: 20 }}>
              <Grid item xs={12} md={3}>
                <Typography className={categoryHeading}>
                  REMOVE FROM BALANCE?
                </Typography>
                <FormControlLabel
                  style={{ marginLeft: 10 }}
                  control={
                    <Checkbox
                      checked={data?.remove}
                      onChange={(e) =>
                        setData({ ...data, remove: e.target.checked })
                      }
                      name="remove"
                    />
                  }
                  label="Yes"
                />
              </Grid>
            </Grid>
          )}
          <Grid container style={{ marginLeft: 20, marginTop: 20 }}>
            <Grid item xs={12} md={3}>
              <Typography className={categoryHeading}>NOTE</Typography>
              <textarea
                type="search"
                className={searchBarInput}
                style={{ borderRadius: 0, maxWidth: "100%" }}
                name="note"
                value={data?.note}
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

export default AddExpense;
