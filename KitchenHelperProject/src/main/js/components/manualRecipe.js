import React, { useState, useEffect } from "react";
import Ingredient from "./ingredient";
import axios from "axios";

const ManualRecipe = (props) => {
  const [storedIngredient, setStoredIngredient] = useState();
  const [recipe, setRecipe] = useState([]);

  const [foodId, setFoodId] = useState("899");
  const [name, setName] = useState("test_ingredient");
  const [foodCategory, setFoodCategory] = useState("test");
  const [location, setLocation] = useState("unknown");
  const [weight, setWeight] = useState("99");
  const [expiry, setExpiry] = useState(new Date());
  const [imageUrl, setImageUrl] = useState("http://www.amityinternational.com/wp-content/uploads/2019/02/product-placeholder.jpg");

  const ingredientsList = props.user.pantry;
  let lookupName;
  let currentWeightNeeded;
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
        // headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
          // console.log(response);
          // console.log(response.data);
          // console.log(response.data.parsed);
          // console.log(response.data.parsed[0]);
          console.log(response.data.parsed[0].food);
          let ingredient = response.data.parsed[0].food;
          ingredient.weightNeeded = currentWeightNeeded;
          console.log(ingredient);
          let newRecipe = props.ongoingRecipe;
          newRecipe.push(ingredient);
          props.updateOngoingRecipe(newRecipe);
          console.log(newRecipe);
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
      url: `/users/${props.user.id}/customrecipes/add`,
      headers: { 'Content-Type': 'application/json' },
      data: currentRecipe
      }
    }).then((response) => {
        console.log(response);
    })
    // setTimeout(location.reload.bind(location), 3000);
  }

  const displayRecipe = () => {
    setRecipe(ongoingRecipe);
    return props.ongoingRecipe.map((ingredient) => {
      return (
        <div>
        <tr>
          <td><img src={ingredient.image} height="200px" width="250px"></img></td>
          <td>{ingredient.label}</td>
          <td>{ingredient.category}</td>
          <td>{ingredient.weightNeeded}g</td>
          <td>test</td>
        </tr>
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
    setRecipe(props.ongoingRecipe);
    return (
    <table>
      {recipe.count > 0 ? displayRecipe : "please add more ingredients"}
      {displayRecipe}
    </table>
    )
  }

  return (
    <div className="container">
      <Lookup />
      <RecipeList />

    </div>
  );

}




export default ManualRecipe;
