import React from "react";
import Ingredient from "./ingredient";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  container: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
}));

const ShoppingList = (props) => {
  const classes = useStyles();
  let ingredientsList = props.user.shoppingList;

  const updateWeightNeeded = (foodId, weightNeeded) => {
    const updatedIngredientsList = ingredientsList;
    updatedIngredientsList.forEach((ingredient) => {
      if (ingredient.foodId === foodId) {
        ingredient.weightNeeded = weightNeeded;
      }
    });
    ingredientsList = updatedIngredientsList;
  }

  const getIngredients = (shoppingList) => {
    return shoppingList.map((ingredient) => {
      return (
        <Grid item xs={12} sm={6} md={4}>
          <Ingredient data={ingredient} weightNeeded={ingredient.weightNeeded} type="shopping-list" updateWeightNeeded={updateWeightNeeded} onRemoveClick={() => { removeFromShoppingList(event, ingredient)}}></Ingredient>
        </Grid>
      )

    });
  }

  const addShoppingListToPantry = () => {
    console.log(ingredientsList);
    axios({
      method: 'patch',
      url: `/users/${props.user.id}/pantry/add-from-shopping-list`,
      headers: { 'Content-Type': 'application/json' },
      data: ingredientsList
    }).then((response) => {
      console.log(response);
      props.refreshUser();
    })
  }

  const removeFromShoppingList = (event, ingredient) => {
    event.preventDefault();
    axios({
      method: 'patch',
      url: `/users/${props.user.id}/shopping-list/remove`,
      headers: { 'Content-Type': 'application/json' },
      data: ingredient
    }).then((response) => {
      console.log(response);
      props.refreshUser();
    })
  }


  return (
    <div className={classes.container}>
      <div className={classes.toolbar} />
      <h1>Shopping List</h1>
      <Grid container direction="row" alignItems="flex-start" spacing={1}>
        {getIngredients(ingredientsList)}
      </Grid>
      <button onClick={addShoppingListToPantry}>Purchased All</button>
    </div>
  );
}

export default ShoppingList;
