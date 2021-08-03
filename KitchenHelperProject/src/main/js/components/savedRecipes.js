import React from "react";
import Recipe from "./recipe"

const savedRecipes = (props) => {

  const getSavedRecipes = () => {
      console.log(props);
    return props.user.savedRecipes.map((recipe) => {
        console.log(recipe);
      return (
        <div>
          <Recipe data={recipe} userId={props.user.id}></Recipe>
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