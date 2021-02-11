import logo from "./logo.svg";
import Container from "@material-ui/core/Container";
import { TextField, Button, Typography, Paper, Grid } from "@material-ui/core";
import { VehicleCard } from "./components/VehicleCard";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TollBoardForm } from "./components/TollBoardForm";

export function TollBoard() {
  const [recentTransactions, setRecentTransactions] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    loadRecents();
  }, []);

  const loadRecents = () => {
    fetch("/api/transactions/recents")
      .then((res) => res.json())
      .then((res) => setRecentTransactions(res));
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <TollBoardForm onTransactionComplete={loadRecents}></TollBoardForm>
      <Paper className={classes.recentsContainer}>
        <Typography variant="h4" className={classes.heading}>
          Recents
        </Typography>
        <Grid justify="normal" container spacing={24}>
          {recentTransactions.map((transaction) => (
            <Grid item>
              <VehicleCard data={transaction}></VehicleCard>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: 20,
  },
  recentsContainer: {
    padding: 20,
  },
  heading: {
    marginBottom: 15,
  },
}));
