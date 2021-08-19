import { Avatar, Container, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RevenueGraph from "../Components/RevenueGraph";
import MultiGraph from "../Components/MultiGraph";
import { useQuery } from "react-query";
import {
  getCurrentMonthsExpense,
  getMonthDebitCredit,
  getMonthlyAndAvgMonthly,
  getTodaysExpense,
} from "../Apis";
import { userState } from "../Recoil/Auth";
import { useRecoilValue } from "recoil";
import { formatter } from "../Utils/numberFormatter";
import StatCard from "../Components/StatCard";

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

  const { data: month_debit_credit, isLoading: month_debit_credit_loading } =
    useQuery("get_month_debit_credit", getMonthDebitCredit);

  return (
    <>
      <Paper className={mainPaper}>
        <Typography className={mainHeading} style={{ marginBottom: 30 }}>
          QUICK STATS
        </Typography>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <StatCard
              text="Monthly Salary"
              data={user?.salary ? formatter.format(user?.salary) : 0}
              color="mdl-color--purple"
              icon="monetization_on"
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <StatCard
              text="Yearly Goal"
              data={user?.goal ? formatter.format(user?.goal) : 0}
              color="mdl-color--blue-700"
              icon="attach_money"
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <StatCard
              text="Current Month's Expense"
              data={
                monthly_expense?.data?.result[0]?.price
                  ? formatter.format(monthly_expense?.data?.result[0]?.price)
                  : 0
              }
              color="mdl-color--red-700"
              icon="money_off"
            />
          </Grid>

          <Grid item md={4} xs={12}>
            <StatCard
              text="Today's Expense"
              data={
                today_expense?.data?.result[0]?.price
                  ? formatter.format(today_expense?.data?.result[0]?.price)
                  : 0
              }
              color="mdl-color--orange-700"
              icon="account_balance_wallet"
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <StatCard
              text="Current Goal Estimation"
              extra={
                !monthly_and_avg_monthly?.data?.is_achivable &&
                monthly_and_avg_monthly?.data?.short && (
                  <div>
                    Short By:{" "}
                    {formatter.format(monthly_and_avg_monthly?.data?.short)}
                  </div>
                )
              }
              data={
                monthly_and_avg_monthly?.data?.is_achivable
                  ? "Achivable"
                  : "Not Achivable"
              }
              color="mdl-color--darkblack-700"
              icon="account_balance"
              secondaryColor={
                monthly_and_avg_monthly?.data?.is_achivable
                  ? "#B4FEE7"
                  : "#B80454"
              }
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <StatCard
              text="Average Monthly Expense"
              data={
                monthly_and_avg_monthly?.data?.avg
                  ? formatter.format(monthly_and_avg_monthly?.data?.avg)
                  : 0
              }
              color="mdl-color--purple-700"
              icon="summarize"
            />
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
            <MultiGraph month_debit_credit={month_debit_credit?.data?.arr} />
          </Container>
        </Grid>
      </Paper>
    </>
  );
}

export default Dashboard;
