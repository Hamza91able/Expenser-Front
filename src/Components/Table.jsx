import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Table.css";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import DatePicker from "react-datepicker";
import { useDebouncedEffect } from "./useDebounceEffect";
import moment from "moment";
import MobileLedgerCard from "./MobileLedgerCard";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { formatter } from "../Utils/numberFormatter";

const useStyles = makeStyles((theme) => ({
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
  },
  stats: {
    color: "#666666",
    textTransform: "capitalize",
    fontSize: 14,
    fontWeight: "bold",
  },
  searchBar: {
    float: "right",
    [theme.breakpoints.down("sm")]: {
      float: "unset",
    },
  },
  searchBarInput: {
    borderRadius: 50,
    paddingRight: 32,
    height: 45,
    border: "1px solid #BABFC7",
    marginLeft: 10,
    outline: "none",
    backgroundSize: 20,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "90%",
    paddingLeft: 11,
    [theme.breakpoints.down("sm")]: {
      marginTop: 10,
      width: "100%",
    },
  },
  applyBtn: {
    backgroundColor: "#8950a3",
    color: "white",
    fontSize: 14,
    borderRadius: 30,
    padding: 15,
    width: 200,
    "&:hover": {
      backgroundColor: "#48105b",
    },
    marginTop: -20,
    fontFamily: "jostmed !important",
    [theme.breakpoints.up("sm")]: {
      marginTop: 0,
    },
    marginTop: 30,
  },
  userMenu: {
    color: "#48105b",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#8950a3",
      color: "white",
    },
  },
  item: {
    padding: 0,
  },
  mobileMargin: {
    [theme.breakpoints.up("sm")]: {
      marginTop: 0,
    },
    marginTop: 30,
  },
  hideMobile: {
    [theme.breakpoints.up("sm")]: {
      display: "inline-table",
    },
    display: "none",
  },
}));

function Table({
  headings,
  data,
  setFrom,
  from,
  setTo,
  to,
  setSearchString,
  setPerPage,
  perPage,
  ledger_type,
  setType,
}) {
  const classes = useStyles();
  const { stats, searchBar, searchBarInput, applyBtn } = classes;
  const [internal_search, setInternalSearch] = useState("");

  useDebouncedEffect(
    () => setSearchString(internal_search),
    [internal_search],
    500
  );

  return (
    <>
      <>
        <div style={{ marginTop: 70, marginBottom: 30 }}>
          <Grid container>
            <Grid item xs={12} md={2}>
              <Typography className={stats}>Sort By:</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <DatePicker
                className={searchBarInput}
                style={{ width: "100%" }}
                onChange={(date) => {
                  console.log(date);
                  setFrom(date);
                }}
                selected={from}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <DatePicker
                className={searchBarInput}
                onChange={(date) => setTo(date)}
                selected={to}
              />
            </Grid>
            <Grid item xs={12} md={3} className={classes.mobileMargin}>
              <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ width: "100%" }}
                value={ledger_type}
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Credit">Credit</MenuItem>
                <MenuItem value="Debit">Debit</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </div>
        <Typography className={stats}>
          <Grid container>
            <Grid item xs={12} md={6}>
              Show{" "}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className={stats}
                style={{
                  marginLeft: 5,
                  marginRight: 5,
                }}
                value={perPage}
                onChange={(e) => setPerPage(e.target.value)}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>{" "}
              Entries
            </Grid>
            <Grid item xs={12} md={6} className={classes.mobileMargin}>
              <label className={searchBar}>
                <input
                  type="search"
                  placeholder="Search"
                  className={searchBarInput}
                  onChange={(e) => setInternalSearch(e.target.value)}
                  value={internal_search}
                  autoComplete="off"
                />
              </label>
            </Grid>
          </Grid>
        </Typography>
        {data?.map((data) => (
          <MobileLedgerCard
            name={data?.name}
            price={formatter.format(data?.price)}
            ledger_type={data?.ledger_type}
            date={moment(data?.date).format("LL | hh:mm A")}
            note={
              data?.note?.length > 30
                ? `${data?.note?.substring(0, 25)}....`
                : data?.note
            }
          />
        ))}
        <table style={{ width: "100%" }} className={classes.hideMobile}>
          <thead>
            <tr role="row">
              {headings?.map((heading) => (
                <th
                  rowSpan={1}
                  colSpan={1}
                  style={{
                    width: 87,
                    fontWeight: "bold",
                  }}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((data) => (
              <tr
                key={data?._id}
                role="row"
                style={{
                  borderRadius: 15,
                  boxShadow: "1px 1px 13px #c8c8c8",
                }}
              >
                <td style={{ fontWeight: "bold" }}>{data?.name}</td>
                <td>
                  <Button
                    disableRipple={true}
                    disabled
                    endIcon={
                      data?.ledger_type === "Debit" ? (
                        <ArrowDropDownIcon />
                      ) : (
                        <ArrowDropUpIcon />
                      )
                    }
                    style={{
                      color: data?.ledger_type === "Debit" ? "red" : "#017f51",
                    }}
                  >
                    {formatter.format(data?.price)}
                  </Button>
                </td>
                <td
                  style={{
                    color: data?.ledger_type === "Debit" ? "red" : "#017f51",
                    fontWeight: "bold",
                  }}
                >
                  {data?.ledger_type}
                </td>
                <td>{moment(data?.date).format("LL | hh:mm A")}</td>
                <td>
                  {data?.note?.length > 30
                    ? `${data?.note?.substring(0, 25)}....`
                    : data?.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </>
  );
}

export default Table;
