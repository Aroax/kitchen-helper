import React from "react";
import axios from "axios";
import Recipe from "./recipe"
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

const userRecipes = (props) => {

  const getUserRecipes = () => {
    return props.recipes.map((recipe) => {
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

      const button = (props.type === "saved" ? 
        <IconButton aria-label="add to favourites" onClick={addToFavouriteRecipes}>
          <FavoriteIcon color="secondary" />
        </IconButton>
        :
        <div></div>)

      return (
        <div>
          <Recipe data={recipeObject} userId={props.user.id} button={button}></Recipe>
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