import React from "react";
import axios from "axios";
import Recipe from "./recipe"
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

const userRecipes = (props) => {

  let requiredIngredients = [];
  let pantry = props.user.pantry;
  
  const getUserRecipes = () => {
    return props.recipes.map((recipe) => {
      recipe.label = recipe.recipeName;
      const ingredients = recipe.ingredients.map((ingredient) => {
        return (
          {
            foodId: ingredient.foodId,
            name: ingredient.name,
            weight: ingredient.weight,
            weightNeeded: ingredient.weightNeeded,
            image: ingredient.imageUrl,
            foodCategory: ingredient.foodCategory,
            text: ingredient.text
          }
        )
      });
      
      recipe.ingredients = ingredients;
      const recipeObject = {
        recipe: recipe
      }

      const addToFavouriteRecipes = () => {
        event.preventDefault();
        axios({
          method: 'patch',
          url: `/users/${props.user.id}/recipes/favourites/add`,
          headers: { 'Content-Type': 'application/json' },
          data: {
              recipeName: recipe.label,
              recipeId: recipe.recipeId,
              ingredients: recipe.ingredients,
              image: recipe.image,
              yield: recipe.yield,
              url: recipe.url,
              source: recipe.source
          }
        }).then((response) => {
            console.log(response);
        })
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

      const button = (props.type === "saved" ? 
        <IconButton aria-label="add to favourites" onClick={addToFavouriteRecipes}>
          <FavoriteIcon color="secondary" />
        </IconButton>
        :
        <div></div>)

      const actionButtons = (
        <div>
          <button onClick={ () => { compareIngredientsAndBuild(recipe) } }>Add Recipe to Shopping List</button>
          <button onClick={ () => { cookRecipe(recipe) } }>Cook Now! (subtract items)</button>
        </div>
      )

      return (
        <div>
          <Recipe data={recipeObject} userId={props.user.id} button={button} actionButtons={actionButtons}></Recipe>
        </div>
      )
    });
  }

  return (
    <div>
        <table>
          {getUserRecipes()}
        </table>
    </div>
  )

}

export default userRecipes;