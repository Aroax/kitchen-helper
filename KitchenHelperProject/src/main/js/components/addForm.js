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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const locations = [
  {
    value: null,
    label: "Not selected.."
  },
  {
    value: "Fridge",
    label: "Fridge"
  },
  {
    value: "Cupboard",
    label: "Cupboard"
  },
  {
    value: "Freezer",
    label: "Freezer"
  }
];

export default function addToPantryForm(props) {
  const classes = useStyles();

  const [location, setLocation] = React.useState();
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
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
            helperText="Ingredient name"
            variant="outlined"
            color="secondary"
            defaultValue=""
            value={props.name} onChange={props.onNameChange}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <TextField
            type="number"
            label="Weight"
            variant="outlined"
            color="secondary"
            helperText="in grams"
            onChange={props.onWeightChange}
          />
        </FormControl>
      </Grid>
      {/* <Grid item>
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <TextField
             
            label="Food category"
            
            variant="outlined"
            color="secondary"
            value={props.category} onChange={props.onFoodCategoryChange}
          />
        </FormControl>
      </Grid> */}
      <Grid item>
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <TextField
            select
            value={location}
            onChange={props.onLocationChange}
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
            type="date"
            variant="outlined"
            color="secondary"
            helperText="Enter best before date"
            onChange={props.onExpiryChange}
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
            color="secondary"
            onClick={props.onButtonClick}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
