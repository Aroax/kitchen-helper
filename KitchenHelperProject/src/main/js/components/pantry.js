import React from "react";
import Ingredient from "./ingredient";

const pantry = (props) => {
  const ingredientsList = props.user.pantry;

  const getIngredients = (pantry) => {
    return pantry.map((ingredient) => {
      return <Ingredient data={ingredient}></Ingredient>
    });
  }
  
  return (
    <div className="container">
      <p>{props.user.displayName}</p>
      <table>
        {getIngredients(ingredientsList)}
      </table>
    </div>
    );
}
 
export default pantry;
