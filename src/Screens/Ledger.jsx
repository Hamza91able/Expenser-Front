import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import Table from "../Components/Table";
import { useQuery } from "react-query";
import { queryClient } from "..";
import { getLedger } from "../Apis";
import { CircularLoading } from "../Components/CircularLoading";
import Pagination from "../Components/Pagination";

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
    [theme.breakpoints.up("sm")]: {
      marginTop: 0,
    },
    marginTop: 60,
  },
  blockedUserBtn: {
    padding: 15,
    borderRadius: 30,
    color: "#FF0101",
    backgroundColor: "white",
    border: "3px solid #FF0101",
    fontWeight: "bold",
    fontFamily: "EB Garamond !important",
    fontSize: 16,
    "&:hover": {
      backgroundColor: "#FF0101",
      color: "white",
    },
    float: "right",
    width: "auto",
    [theme.breakpoints.up("sm")]: {
      float: "right",
      width: 200,
    },
  },
  stats: {
    color: "#666666",
    textTransform: "capitalize",
    fontSize: 14,
    fontWeight: "bold",
  },
}));

function Ledger(props) {
  const classes = useStyles();
  const { mainPaper, mainHeading, secondHeading, blockedUserBtn, stats } =
    classes;
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [search_string, setSearchString] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [ledger_type, setType] = useState("");

  const { isFetching, isLoading, data, refetch } = useQuery(
    ["ledger", page, perPage, search_string, from, to, ledger_type],
    () => getLedger(page, perPage, search_string, from, to, ledger_type),
    { keepPreviousData: true }
  );

  // Prefetch the next page!
  useEffect(() => {
    if (data?.data?.ledger?.hasNextPage) {
      queryClient.prefetchQuery(
        ["ledger", page + 1, perPage, search_string, from, to],
        () => getLedger(page + 1, perPage, search_string, from, to)
      );
    }
  }, [data, page, queryClient]);

  return (
    <>
      <Paper className={mainPaper}>
        <Typography className={mainHeading}>
          LEDGER
          <Button
            variant="contained"
            className={blockedUserBtn}
            onClick={() => props.history.push(`/ledger/add`)}
          >
            ADD
          </Button>
        </Typography>
        <Typography className={secondHeading}>USER LISTING</Typography>
        <Container
          maxWidth="lg"
          style={{ marginTop: 30 }}
          className="bottom-controls"
        >
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 500,
              }}
            >
              <CircularLoading />
            </div>
          ) : (
            <>
              <Table
                headings={["TITLE", "PRICE", "TYPE", "DATE", "NOTE"]}
                data={data?.data?.ledger?.docs}
                setFrom={setFrom}
                from={from}
                setTo={setTo}
                to={to}
                setSearchString={setSearchString}
                search_string={search_string}
                setPerPage={setPerPage}
                perPage={perPage}
                ledger_type={ledger_type}
                setType={setType}
              />
              <Grid container>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <Pagination
                    page={page}
                    pageCount={data?.data?.ledger?.totalPages}
                    setPage={setPage}
                  />
                </Grid>
              </Grid>
            </>
          )}
        </Container>
      </Paper>
    </>
  );
}

export default Ledger;
