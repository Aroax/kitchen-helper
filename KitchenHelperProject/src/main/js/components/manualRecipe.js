import React, { useState, useEffect } from "react";
import Ingredient from "./ingredient";
import axios from "axios";

const ManualRecipe = (props) => {
  const [storedIngredient, setStoredIngredient] = useState();
  const [draftRecipe, setDraftRecipe] = useState(props.user.draftRecipe);

  const [foodId, setFoodId] = useState("899");
  const [name, setName] = useState("test_ingredient");
  const [foodCategory, setFoodCategory] = useState("test");
  const [location, setLocation] = useState("unknown");
  const [weight, setWeight] = useState("99");
  const [expiry, setExpiry] = useState(new Date());
  const [imageUrl, setImageUrl] = useState("http://www.amityinternational.com/wp-content/uploads/2019/02/product-placeholder.jpg");

  const ingredientsList = props.user.draftRecipe;
  let lookupName;
  let currentWeightNeeded;
  let currentIngredientId;
  let food_app_ID = "d3e7d692";
  let food_app_key = "8147d1ff5bab97e50f29cc6c98459afd";
  let food_api_url = "https://api.edamam.com/api/food-database/v2/parser";


  const handleLookupNameChange = (event) => {
    // event.preventDefault();
    lookupName = event.target.value;
  }

  const handleWeightNeededChange = (event) => {
    // event.preventDefault();
    currentWeightNeeded = event.target.value;
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
          addToDraftRecipeDb(ingredient);
          // draftRecipe.push(ingredient)
      });
  }

  const setStoredToState = (edamamResult) => {
    setFoodId(edamamResult.foodId);
    setName(edamamResult.label);
    setFoodCategory(edamamResult.category);
    setImageUrl(edamamResult.image);
  }

  const addToMyRecipes = () => {
    event.preventDefault();
    axios({
      method: 'patch',
      url: `/users/${props.user.id}/recipes/custom/add`,
      headers: { 'Content-Type': 'application/json' },
      data: draftRecipe
    }).then((response) => {
        console.log(response);
    })
    // setTimeout(location.reload.bind(location), 3000);
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
    })
    // setTimeout(location.reload.bind(location), 3000);
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
        <Ingredient data={ingredient} userId={props.user.id}></Ingredient>
        <button onClick="">Remove Ingredient</button>
      </div>
      )
    });
  }


  const Lookup = () => {
    return (
      <div>
        <form onSubmit={ingredientLookup}>
          <input type="text" placeholder="Enter ingredient" onChange={handleLookupNameChange}></input>
          <input type="text" placeholder="Weight required (in grams)" onChange={handleWeightNeededChange}></input>
          <input type="submit" value="search" />
        </form>
      </div>
    )
  }

  const RecipeList = () => {
    // setDraftRecipe(draftRecipe);
    return (
      <div>
        <table>

          {displayRecipe}
        </table>
        <button onClick={addToMyRecipes}>Save Recipe</button>
      </div>
    )
  }
  console.log(props.user.draftRecipe);

  return (
    <div className="container">
      <Lookup />
      <br></br>
      <DisplayRecipe />
      
    </div>
  );

}




export default ManualRecipe;
