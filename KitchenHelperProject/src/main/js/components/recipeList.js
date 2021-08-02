import React, { useState, useEffect } from "react";
import Ingredient from "./ingredient";
import axios from "axios";

const RecipeList = (props) => {


    // console.log('props', props);
  const customRecipes = props.user.customRecipes;
  console.log('customRecipes', customRecipes)
  let requiredIngredients = [];
  let food_app_ID = "d3e7d692";
  let food_app_key = "8147d1ff5bab97e50f29cc6c98459afd";
  let food_api_url = "https://api.edamam.com/api/food-database/v2/parser";


  
  const getCustomRecipes = () => {
    return customRecipes.map((recipe) => {
      return (
        <div>
            <table>
                <Recipe data={recipe} />
            </table>
        
      <button onClick={ () => { compareIngredientsAndBuild(recipe) } }>Add Recipe to Shopping List</button>
      </div>
      )
    });
  }

//   const getRecipeIngredients = () => {

//   }

  const compareIngredientsAndBuild = (recipe) => {
    requiredIngredients = recipe.ingredients;
    addToShoppingList();
  }

  const Recipe = (props) => {
      console.log('in recipe props', props);
      return (
          <div>
              <tr>
              {props.data.recipeName}
              
              {/* <Ingredient data={ingredient} userId={props.user.id}></Ingredient> */}
              </tr>
          </div>

      )
  }

  const addToShoppingList = () => {
    // event.preventDefault();
    console.log(requiredIngredients);
    axios({
      method: 'patch',
      url: `/users/${props.user.id}/shopping-list/add-multiple`,
      headers: { 'Content-Type': 'application/json' },
      data: requiredIngredients
    }).then((response) => {
        console.log(response);
        // location.reload();
    })
  }

  const View = () => {
    return (
        <div>
          {getCustomRecipes()}
        </div>
      );
  }

  // Render below

  return (
      <div>
        <View />
      </div>
    );
}

export default RecipeList;
