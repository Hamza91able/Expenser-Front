import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30,
    marginBottom: 30,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    display: "block",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function MobileLedgerCard({
  name,
  price,
  ledger_type,
  date,
  note,
}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} elevation={3}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
          style={{
            color: ledger_type === "Debit" ? "red" : "#017f51",
            fontWeight: "bold",
          }}
        >
          {ledger_type}
        </Typography>
        <Typography variant="h5" component="h2" style={{ fontWeight: "bold" }}>
          {name}
        </Typography>
        <Button
          disableRipple={true}
          disabled
          endIcon={
            ledger_type === "Debit" ? (
              <ArrowDropDownIcon />
            ) : (
              <ArrowDropUpIcon />
            )
          }
          style={{
            color: ledger_type === "Debit" ? "red" : "#017f51",
            marginLeft: -8,
          }}
        >
          {price}
        </Button>
        <Typography
          variant="subtitle2"
          component="p"
          style={{ fontWeight: "600" }}
        >
          {note}
        </Typography>
        <br />
        <Typography variant="caption" component="p">
          {date}
        </Typography>
      </CardContent>
    </Card>
  );
}
