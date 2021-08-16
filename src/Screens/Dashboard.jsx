import { Avatar, Container, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RevenueGraph from "../Components/RevenueGraph";
import MultiGraph from "../Components/MultiGraph";
import { useQuery } from "react-query";
import {
  getCurrentMonthsExpense,
  getMonthlyAndAvgMonthly,
  getTodaysExpense,
} from "../Apis";
import { userState } from "../Recoil/Auth";
import { useRecoilValue } from "recoil";
import { formatter } from "../Utils/numberFormatter";

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    borderRadius: 30,
    padding: 30,
  },
  mainHeading: {
    fontWeight: "bold",
    fontSize: 32,
    color: "#48105b",
    fontFamily: "A Love Of Thunder !important",
  },
  statsAvatarYear: {
    width: 160,
    height: 160,
    fontSize: 14,
    background: "white",
    color: "#48105b",
    border: "15px solid #48105b",
  },
  statsCard: {
    padding: 20,
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    width: "100%",
    height: 308,
    [theme.breakpoints.up("md")]: {
      //   width: 386,
    },
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  incomeText: {
    color: "#48105b",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "jostmed !important",
  },
}));

function Dashboard(props) {
  const classes = useStyles();
  const {
    mainPaper,
    mainHeading,
    statsAvatarYear,
    statsCard,
    center,
    incomeText,
  } = classes;
  const user = useRecoilValue(userState);

  const { data: monthly_expense, isLoading: monthly_expense_loading } =
    useQuery("monthly_expense", getCurrentMonthsExpense);

  const { data: today_expense, isLoading: today_expense_loading } = useQuery(
    "today_expense",
    getTodaysExpense
  );

  const {
    data: monthly_and_avg_monthly,
    isLoading: monthly_and_avg_monthly_loading,
  } = useQuery("monthly_and_avg_monthly", getMonthlyAndAvgMonthly);

  return (
    <>
      <Paper className={mainPaper}>
        <Typography className={mainHeading}>QUICK STATS</Typography>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <Paper className={statsCard} elevation={3}>
              <Grid container>
                <Grid item xs={12} className={center}>
                  <Avatar className={statsAvatarYear}>
                    {user?.salary ? formatter.format(user?.salary) : 0}
                  </Avatar>
                </Grid>
                <Grid item xs={12} className={center} style={{ marginTop: 20 }}>
                  <Typography className={incomeText}>Monthly Salary</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item md={4} xs={12}>
            <Paper className={statsCard} elevation={3}>
              <Grid container>
                <Grid item xs={12} className={center}>
                  <Avatar className={statsAvatarYear}>
                    {user?.goal ? formatter.format(user?.goal) : 0}
                  </Avatar>
                </Grid>
                <Grid item xs={12} className={center} style={{ marginTop: 20 }}>
                  <Typography className={incomeText}>Yearly Goal</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item md={4} xs={12}>
            <Paper className={statsCard} elevation={3}>
              <Grid container>
                <Grid item xs={12} className={center}>
                  <Avatar className={statsAvatarYear}>
                    {monthly_expense?.data?.result[0]?.price
                      ? formatter.format(
                          monthly_expense?.data?.result[0]?.price
                        )
                      : 0}
                  </Avatar>
                </Grid>
                <Grid item xs={12} className={center} style={{ marginTop: 20 }}>
                  <Typography className={incomeText}>
                    Current Month's Expense
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item md={4} xs={12}>
            <Paper className={statsCard} elevation={3}>
              <Grid container>
                <Grid item xs={12} className={center}>
                  <Avatar className={statsAvatarYear}>
                    {today_expense?.data?.result[0]?.price
                      ? formatter.format(today_expense?.data?.result[0]?.price)
                      : 0}
                  </Avatar>
                </Grid>
                <Grid item xs={12} className={center} style={{ marginTop: 20 }}>
                  <Typography className={incomeText}>
                    Today's Expense
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item md={4} xs={12}>
            <Paper className={statsCard} elevation={3}>
              <Grid container>
                <Grid item xs={12} className={center}>
                  <Avatar
                    className={statsAvatarYear}
                    style={{
                      color: monthly_and_avg_monthly?.data?.is_achivable
                        ? "light green"
                        : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {monthly_and_avg_monthly?.data?.is_achivable
                      ? "Achivable"
                      : "Not Achivable"}
                  </Avatar>
                </Grid>
                <Grid item xs={12} className={center} style={{ marginTop: 20 }}>
                  <Typography className={incomeText}>
                    Current Goal Estimation
                    {!monthly_and_avg_monthly?.data?.is_achivable &&
                      monthly_and_avg_monthly?.data?.short && (
                        <div style={{ textAlign: "center" }}>
                          Short By: {monthly_and_avg_monthly?.data?.short}
                        </div>
                      )}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item md={4} xs={12}>
            <Paper className={statsCard} elevation={3}>
              <Grid container>
                <Grid item xs={12} className={center}>
                  <Avatar className={statsAvatarYear}>
                    {monthly_and_avg_monthly?.data?.avg
                      ? formatter.format(monthly_and_avg_monthly?.data?.avg)
                      : 0}
                  </Avatar>
                </Grid>
                <Grid item xs={12} className={center} style={{ marginTop: 20 }}>
                  <Typography className={incomeText}>
                    Average Monthly Expense
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Typography className={mainHeading} style={{ marginTop: 30 }}>
            Monthly Expense Graph
          </Typography>
          <Container maxWidth="lg">
            <RevenueGraph expense={monthly_and_avg_monthly?.data?.arr} />
          </Container>
          <Typography className={mainHeading} style={{ marginTop: 60 }}>
            Income/Outcome Graph
          </Typography>
          <Container maxWidth="lg">
            <MultiGraph />
          </Container>
        </Grid>
      </Paper>
    </>
  );
}

export default Dashboard;
