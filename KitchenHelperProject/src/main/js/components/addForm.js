import FormControl from "@material-ui/core/FormControl";
import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import PrimaryButton from "./buttonPrimary";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: "25ch"
  },
  col: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const locations = [
  {
    value: "User Fridge",
    label: "Fridge"
  },
  {
    value: "User Cupboard",
    label: "Cupboard"
  },
  {
    value: "User Freezer",
    label: "Freezer"
  },
  {
    value: "Not Applicable",
    label: "N/A"
  }
];

export default function addToPantryForm() {
  const classes = useStyles();

  const [location, setlocation] = React.useState();
  const handleLocationChange = (event) => {
    setlocation(event.target.value);
  };

  return (
    <Grid container spacing={1} className={classes.col}>
      <h3>Ingredient details</h3>
      <Grid item>
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <TextField
            id="outlined-basic"
            label="Ingredient name"
            variant="outlined"
            color="secondary"
            defaultValue=""
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <TextField
            id="outlined-basic"
            label="Weight"
            variant="outlined"
            color="secondary"
            helperText="in grams"
            value=""
          />
          {/* <FormHelperText id="outlined-weight-helper-text">
            grams
          </FormHelperText> */}
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <TextField
            id="outlined-basic"
            label="Food category"
            defaultValue=""
            variant="outlined"
            color="secondary"
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <TextField
            id="outlined-select-currency-native"
            select
            value={location}
            onChange={handleLocationChange}
            SelectProps={{
              native: true
            }}
            helperText="Select storage location"
            variant="outlined"
            color="secondary"
          >
            {locations.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <TextField
            id="outlined-basic"
            type="date"
            variant="outlined"
            color="secondary"
            helperText="Enter best before date"
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <PrimaryButton
            text="add to pantry"
            color="primary"
            onClick={() => console.log("button clicked")}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
