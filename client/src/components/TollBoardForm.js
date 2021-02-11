import { Button, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { VehicleCard } from "./VehicleCard";

export function TollBoardForm({ onTransactionComplete }) {
  const classes = useStyles();
  const [vehicleNo, setVehicleNo] = useState("");
  const [collectionEstimate, setCollectionPreview] = useState(false);

  const onEntryFormSubmit = (e) => {
    if (e) e.preventDefault();
    setCollectionPreview(false);

    fetch(`/api/transactions/estimate/${vehicleNo}`)
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          setCollectionPreview(res);
        } else {
          alert(res.error)
        }
      });
  };

  const processTransaction = (estimate, tripSelected) => {
    const transactionData = {
      vehicleNo: estimate.vehicleNo,
    };
    if (estimate.transactionAction == "COLLECT" && tripSelected) {
      transactionData.amount = tripSelected.price;
      transactionData.tripType = tripSelected.tripType;
    }

    fetch("/api/transactions/collect", {
      method: "post",
      body: JSON.stringify(transactionData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          setCollectionPreview(res);
          onTransactionComplete();
          setVehicleNo("");
          printReceipt();
        }
      });
  };
  const printReceipt = () => {
    var content = document.getElementById("estimate-card");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
    setCollectionPreview(false);
  };

  return (
    <Paper className={classes.collectionEntryPannel}>
      <form
        noValidate
        autoComplete="off"
        onSubmit={onEntryFormSubmit}
        className={classes.collectionEntryForm}
      >
        <TextField
          id="vehicle-number"
          label="Vehicle No"
          variant="outlined"
          className={classes.collectionEntryFormText}
          onChange={(e) => setVehicleNo(e.target.value)}
          value={vehicleNo}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.collectionEntryFormButton}
        >
          Entry
        </Button>
      </form>
      {collectionEstimate && (
        <VehicleCard
          id={"estimate-card"}
          className={classes.collectionEntryPreviewCard}
          data={collectionEstimate}
          processTransaction={processTransaction}
        ></VehicleCard>
      )}
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  collectionEntryPannel: {
    width: "50%",
    marginBottom: 30,
    padding: 20,
    alignSelf: "center",
    minHeight: 200,
  },
  collectionEntryForm: {
    textAlign: "center",
    marginBottom: 30,
  },
  collectionEntryPreviewCard: {
    justifyContent: "center",
  },
  collectionEntryFormText: {
    marginRight: 15,
    marginLeft: 15,
  },
  collectionEntryFormButton: {
    marginTop: 10,
    marginBottom: 10,
  },
}));
