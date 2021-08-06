import React, { useState } from "react";
import Ingredient from "./ingredient";
import RecipeList from "./recipeList";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PrimaryButton from "./buttonPrimary";
import Divider from "@material-ui/core/Divider";
import SearchBar from "./searchBar";
import TextField from "@material-ui/core/TextField";

const ManualRecipe = (props) => {
  const [storedIngredient, setStoredIngredient] = useState();
  let draftRecipe = props.user.draftRecipe;
  let lookupName;
  let currentWeightNeeded;
  let draftRecipeName;
  let draftRecipeYield;
  let food_app_ID = "d3e7d692";
  let food_app_key = "8147d1ff5bab97e50f29cc6c98459afd";
  let food_api_url = "https://api.edamam.com/api/food-database/v2/parser";

  const classes = useStyles();

  const handleLookupNameChange = (event) => {
    lookupName = event.target.value;
  }

  const handleWeightNeededChange = (event) => {
    currentWeightNeeded = event.target.value;
  }

  const handleDraftRecipeNameChange = (event) => {
    draftRecipeName = event.target.value;
  }

  const handleDraftRecipeYieldChange = (event) => {
    draftRecipeYield = event.target.value;
  }

  

  const ingredientLookup = () => {
    event.preventDefault();
    axios({
      method: 'get',
      url: `${food_api_url}?app_id=${food_app_ID}&app_key=${food_app_key}&ingr=${lookupName}&nutrition-type=cooking`,
    }).then((response) => {
      console.log(response);
      console.log(response.data.parsed[0].food);
      let ingredient = response.data.parsed[0].food;
      setStoredIngredient(ingredient);
      addToDraftRecipeDb(ingredient);
      // draftRecipe.push(ingredient)
    });
  }

  const addDraftToCustomRecipes = () => {
    event.preventDefault();
    // const newObjectId = new newObjectId();
    console.log('storedIngredient', storedIngredient);
    console.log('draftRecipe', draftRecipe);
    let customRecipe = {
      recipeName: draftRecipeName,
      image: "https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1669&q=80",
      yield: draftRecipeYield,
      ingredients: draftRecipe
    };
    axios({
      method: 'patch',
      url: `/users/${props.user.id}/recipes/custom/add`,
      headers: { 'Content-Type': 'application/json' },
      data: customRecipe
    }).then((response) => {
      console.log(response);
      props.refreshUser();
    })
  }

  const addToDraftRecipeDb = (ingredient) => {
    event.preventDefault();
    console.log(ingredient);
    axios({
      method: 'patch',
      url: `/users/${props.user.id}/recipes/draft/add`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        foodId: ingredient.foodId,
        name: ingredient.label,
        foodCategory: ingredient.category,
        weightNeeded: currentWeightNeeded,
        imageUrl: ingredient.image
      }
    }).then((response) => {
      console.log(response);
      props.refreshUser();
    })
  }

  const removeIngredientFromDraftRecipe = (ingredient) => {
    event.preventDefault();
    console.log(ingredient);
    axios({
      method: 'patch',
      url: `/users/${props.user.id}/recipes/draft/remove`,
      headers: { 'Content-Type': 'application/json' },
      data: ingredient
    }).then((response) => {
      console.log(response);
      props.refreshUser();
    })
  }

  const DisplayRecipe = () => {
    return (
      <Grid container direction="row" spacing={2} alignItems="flex-start">
        {getIngredients(draftRecipe)}
      </Grid>
    )
  }

  const getIngredients = (recipe) => {
    return recipe.map((ingredient) => {
      return (
        <Grid item>
          <Ingredient data={ingredient} userId={props.user.id} weightNeeded={ingredient.weightNeeded} onRemoveClick={() => { removeIngredientFromDraftRecipe(ingredient)} }></Ingredient>
          {/* Edit quantity button function required: */}
          <Grid container direction="row" alignItems="flex-start" spacing={1}>
            <Grid item>
              {/* <PrimaryButton onClick={() => { removeIngredientFromDraftRecipe(ingredient) }} text="Remove Ingredient" ></PrimaryButton> */}
            </Grid>
            <Grid item>
              <PrimaryButton color="secondary" onClick={() => console.log("not functional")} text="Change Quantity"></PrimaryButton>
            </Grid>
          </Grid>
        </Grid>
      )
    });
  }


  const Lookup = () => {
    return (
      <Grid container direction="column" spacing={1} style={{ marginBottom: 10 }}>
        <h3>Enter each ingredient for the recipe</h3>
        <Grid item xs={12}>
          <TextField
            label="Enter ingredient" color="secondary" variant="outlined" style={{ marginRight: 10 }} onChange={handleLookupNameChange}
          />
          <TextField type="number" label="Weight required (in grams)" color="secondary" variant="outlined" style={{ marginRight: 10, width: "30%" }} onChange={handleWeightNeededChange}
          />
          <PrimaryButton color="primary" text="Add Ingredient" onClick={ingredientLookup} />
        </Grid>
      </Grid>
    )
  }

  const SaveRecipeButton = () => {
    return (
      <Grid container direction="row" spacing={1} style={{ marginBottom: 10 }}>
        <Grid item xs={12}>
          <TextField
            label="Give your recipe a name" color="secondary" variant="outlined" style={{ marginRight: 10, width: "50%" }} onChange={handleDraftRecipeNameChange}
          />
          <TextField
            label="Serves how many people?" color="secondary" variant="outlined" style={{ marginRight: 10, width: "50%" }} onChange={handleDraftRecipeYieldChange}
          />
        </Grid>
        <Grid item xs={12}>
          <PrimaryButton color="primary" text="save recipe" onClick={addDraftToCustomRecipes} />
        </Grid>
      </Grid>
    );
  }

  return (
    <div className={classes.recipes}>
      <div className={classes.toolbar} />
      <h2>Add a Custom Recipe</h2>
      <Lookup />
      <br />
      <DisplayRecipe />
      <br />
      <SaveRecipeButton />
      <br />
      <Divider />
      <br />
      <RecipeList user={props.user} refreshUser={props.refreshUser} />
    </div>
  );
}

export default ManualRecipe;

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  recipes: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));