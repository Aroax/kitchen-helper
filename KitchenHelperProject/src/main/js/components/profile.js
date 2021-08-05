import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from 'react';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  listContainer: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

const listContainerDisplay = (props) => {
  const classes = useStyles();

  return (
    <main className={classes.listContainer}>
      <div className={classes.toolbar} />
      <Grid container direction="column" alignItems="flex-start" spacing={1}>
        <h1>Profile</h1>
        <Typography variant="p">Welcome, {props.user}!</Typography>
      </Grid>
    </main>
  );
};
export default listContainerDisplay;
