import React from "react";
import Recipe from "./recipe"

const savedRecipes = (props) => {

  const getSavedRecipes = () => {
      console.log(props);
    return props.user.savedRecipes.map((recipe) => {
      console.log(recipe);
      recipe.label = recipe.recipeName;
      const ingredients = recipe.ingredients.map((ingredient) => {
        return (
          {
            foodId: ingredient.foodId,
            name: ingredient.name,
            weight: ingredient.weight,
            image: ingredient.imageUrl,
            foodCategory: ingredient.foodCategory,
            text: ingredient.text
          }
        )
      })
      console.log('savedRecipes ingredients: ', ingredients);
      recipe.ingredients = ingredients;
      const recipeObject = {
        recipe: recipe
      }
      console.log(recipeObject);

      return (
        <div>
          <Recipe data={recipeObject} userId={props.user.id}></Recipe>
        </div>
      )
    });
  }

  return (
    <div>
        <table>
          {getSavedRecipes()}
        </table>
    </div>
  )

}

export default savedRecipes;