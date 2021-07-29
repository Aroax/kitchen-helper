import React from "react";
import Ingredient from "./ingredient";

const ShoppingList = (props) => {
  const ingredientsList = props.user.shoppingList;

  const getIngredients = (shoppingList) => {
    return shoppingList.map((ingredient) => {
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
 
export default ShoppingList;
