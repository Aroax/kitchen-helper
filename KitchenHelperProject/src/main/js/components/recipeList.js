import React from "react";
import Recipe from "./recipe";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const RecipeList = (props) => {
  let customRecipes = props.user.customRecipes;
  let requiredIngredients = [];
  let pantry = props.user.pantry;

  const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    container: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3)
    },
    divider: {
      padding: theme.spacing(0.15),
      margin: "50px 0"
    }
  }));
  const classes = useStyles();

  const button = (<div></div>);

  const getCustomRecipes = () => {
    return customRecipes.map((recipe) => {
      const actionButtons = (
        <div>
          <button onClick={() => { compareIngredientsAndBuild(recipe) }}>Add Recipe to Shopping List</button>
          <button onClick={() => { cookRecipe(recipe) }}>Cook Now! (subtract items)</button>
          <button onClick={() => { addRecipeToMealPlanner(recipe) }}>Add to meal planner</button>
        </div>
      )

      recipe.label = recipe.recipeName;
      const ingredients = recipe.ingredients.map((ingredient) => {
        return (
          {
            foodId: ingredient.foodId,
            name: ingredient.name,
            weight: ingredient.weight,
            weightNeeded: ingredient.weightNeeded,
            image: ingredient.imageUrl,
            imageUrl: ingredient.imageUrl,
            foodCategory: ingredient.foodCategory,
            text: ingredient.text
          }
        )
      });

      recipe.ingredients = ingredients;
      const recipeObject = {
        recipe: recipe
      }

      return (
        <Grid item xs={12} sm={6} md={4}>
          <Recipe data={recipeObject} userId={props.user.id} button={button} actionButtons={actionButtons} refreshUser={props.refreshUser}></Recipe>
        </Grid>
      )
    });
  }

  const cookRecipe = (recipe) => {
    axios({
      method: 'patch',
      url: `/users/${props.user.id}/pantry/subtract-by-recipe`,
      headers: { 'Content-Type': 'application/json' },
      data: recipe
    }).then((response) => {
        console.log(response);
        props.refreshUser();
    });
  }

  const compareIngredientsAndBuild = (recipe) => {
    let found;
    
    recipe.ingredients.map((recipeIngredient) => {
        found = false;
        pantry.forEach((pantryIngredient) => {
            if (recipeIngredient.foodId === pantryIngredient.foodId) {
                found = true;
                addRequiredAmount(recipeIngredient, pantryIngredient);
            }; 
        });
        found ? null : requiredIngredients.push(recipeIngredient);

    })
    addToShoppingList();
  }

  const addRequiredAmount = (recipeIng, pantryIng) => {
    (pantryIng.weight >= recipeIng.weightNeeded) ? null : modifyIngredient(recipeIng, pantryIng);
  }

  const modifyIngredient = (recipeIng, pantryIng) => {
      let weightNeeded = recipeIng.weightNeeded - pantryIng.weight;
      let modifiedIngredient = recipeIng;
      modifiedIngredient.weightNeeded = weightNeeded;
      requiredIngredients.push(modifiedIngredient);
  }

  const addToShoppingList = () => {
    console.log('required ingredients in addToShoppingList', requiredIngredients);
    axios({
      method: 'patch',
      url: `/users/${props.user.id}/shopping-list/add-multiple`,
      headers: { 'Content-Type': 'application/json' },
      data: requiredIngredients
    }).then((response) => {
        console.log(response);
        props.refreshUser();
    })
  }

  const addRecipeToMealPlanner = (recipe) => {
    recipe.mealPlannerDay = "Unassigned";
    axios({
        method: 'patch',
        url: `/users/${props.user.id}/mealplanner/add`,
        headers: { 'Content-Type': 'application/json' },
        data: recipe
      }).then((response) => {
          console.log(response);
          props.refreshUser();
      });
}

  // Render below
  return (
    <main className={classes.container}>
      <div className={classes.toolbar} />
      <h2>My Custom Recipes</h2>
      <Grid container direction="row" alignItems="flex-start" spacing={1}>
        {getCustomRecipes()}
      </Grid>
    </main>
    );
}

export default RecipeList;
