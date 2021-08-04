import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Backdrop, Fade, Grid } from "@material-ui/core";
import AddForm from "./addForm";
import PrimaryButton from "./buttonPrimary";
import SearchBar from "./searchBar";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    borderRadius: "7px",
    boxShadow: theme.shadows[6],
    padding: theme.spacing(4, 5)
  },
  lookup: {
    marginTop: theme.spacing(2)
  }
}));

export default function TransitionsModal({onSubmit, onChange}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showLookup, setShowLookup] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addIngredient = () => {
    if (showLookup === false) {
      setShowLookup(true);
    } else {
      setShowLookup(false);
    }
  };

  const Lookup = (
    <Grid className={classes.lookup}>
      <SearchBar
        label="Search for ingredient"
        color="secondary"
        onClick={handleOpen}
        onSubmit={ingredientLookup}
        onChange={handleLookupNameChange}
      />
    </Grid>
  );

  return (
    <div>
      <PrimaryButton
        text="Add ingredient"
        onClick={addIngredient}
        color="primary"
      />
      {showLookup ? Lookup : null}
      <Modal
        aria-labelledby=""
        aria-describedby=""
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AddForm />
            {/* {Lookup} */}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
