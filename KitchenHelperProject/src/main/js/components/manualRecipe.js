import React, { useState } from "react";
import Ingredient from "./ingredient";
import RecipeList from "./recipeList";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
}));

const ManualRecipe = (props) => {
  const [storedIngredient, setStoredIngredient] = useState();
  let draftRecipe = props.user.draftRecipe;
  let lookupName;
  let currentWeightNeeded;
  let draftRecipeName;
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
      recipeName : draftRecipeName,
      ingredients : draftRecipe
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
        <div>
          <table>
            {getIngredients(draftRecipe)}
          </table>
        </div>
      )
  }

  const getIngredients = (recipe) => {
    return recipe.map((ingredient) => {
      return (
        <div>
          <Ingredient data={ingredient} userId={props.user.id} weightNeeded={ingredient.weightNeeded}></Ingredient>
          {console.log(ingredient)}
          <button onClick={() => {removeIngredientFromDraftRecipe(ingredient)} }>Remove Ingredient</button>
          {/* Edit quantity button function required: */}
          <button onClick="">Change Quantity</button>
        </div>
      )
    });
  }


  const Lookup = () => {
    return (
      <div>
        <h3>Enter each ingredient for the recipe</h3>
        <form onSubmit={ingredientLookup}>
          <input type="text" placeholder="Enter ingredient" onChange={handleLookupNameChange}></input>
          <input type="text" placeholder="Weight required (in grams)" onChange={handleWeightNeededChange}></input>
          <input type="submit" value="search" />
        </form>
      </div>
    )
  }

  const SaveRecipeButton = () => {
    return ( 
      <div>
      <form onSubmit={addDraftToCustomRecipes}>
        <input type="text" placeholder="Give your recipe a name" onChange={handleDraftRecipeNameChange}></input>
        {/* <input type="text" placeholder="Weight required (in grams)" onChange={handleWeightNeededChange}></input> */}
        <input type="submit" value="Save Recipe" />
      </form>
    </div>
     );
  }

  return (
    <div className="container">
      <div className={classes.toolbar}/>
      <h2>Add a Custom Recipe</h2>
      <Lookup />
      <br></br>
      <DisplayRecipe />
      <SaveRecipeButton />
      <hr />
      <RecipeList user={props.user} refreshUser={props.refreshUser}/>
    </div>
  );
}

export default ManualRecipe;
