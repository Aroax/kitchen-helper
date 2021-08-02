import React, { useState, useEffect } from "react";
import Ingredient from "./ingredient";
import axios from "axios";

const RecipeList = (props) => {


    // console.log('props', props);
  const customRecipes = props.user.customRecipes;
//   console.log('customRecipes', customRecipes)
  let requiredIngredients = [];
  let pantry = props.user.pantry;
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
      <button onClick={ () => { cookRecipe(recipe) } }>Cook Now! (subtract items)</button>
      </div>
      )
    });
  }

  const cookRecipe = (recipe) => {
      console.log(recipe);
    axios({
        method: 'patch',
        url: `/users/${props.user.id}/pantry/subtract-by-recipe`,
        headers: { 'Content-Type': 'application/json' },
        data: recipe
      }).then((response) => {
          console.log(response);
          // location.reload();
      });
  }

  const compareIngredientsAndBuild = (recipe) => {
    let found;
    console.log('recipe', recipe);
    console.log('pantry', pantry);
    console.log('top of compare', requiredIngredients);
    
    recipe.ingredients.map((recipeIngredient) => {
        found = false;
        pantry.forEach((pantryIngredient) => {
            // console.log('recipe Ing', recipeIngredient);
            // console.log('pantry Ing', pantryIngredient);
            if (recipeIngredient.foodId === pantryIngredient.foodId) {
                found = true;
                addRequiredAmount(recipeIngredient, pantryIngredient);
            }; 
        });
        found ? null : requiredIngredients.push(recipeIngredient);

    })
    console.log('end of compare', requiredIngredients);
    addToShoppingList();
  }

  const addRequiredAmount = (recipeIng, pantryIng) => {
    console.log('top of amount reqIng', requiredIngredients);
    // let weightNeeded;
    (pantryIng.weight >= recipeIng.weightNeeded) ? null : modifyIngredient(recipeIng, pantryIng);
  }

    const modifyIngredient = (recipeIng, pantryIng) => {
        
        let weightNeeded = recipeIng.weightNeeded - pantryIng.weight;
        let modifiedIngredient = recipeIng;
        modifiedIngredient.weightNeeded = weightNeeded;
        // console.log('mod Ing inside anon', modifiedIngredient);
        requiredIngredients.push(modifiedIngredient);
    }
        
        
    
    // console.log('modified Ing', modifiedIngredient);
    
    // console.log('modified Ing plus weight', modifiedIngredient);
    
    // console.log('bottom of amount reqIng', requiredIngredients);
  
  

  const Recipe = (props) => {
    //   console.log('in recipe props', props);
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
