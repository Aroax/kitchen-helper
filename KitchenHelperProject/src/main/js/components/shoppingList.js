import React from "react";
import Ingredient from "./pantry/ingredient";
import axios from "axios";

const ShoppingList = (props) => {
  const ingredientsList = props.user.shoppingList;

  const getIngredients = (shoppingList) => {
    return shoppingList.map((ingredient) => {
      return <Ingredient data={ingredient} weightNeeded={ingredient.weightNeeded}></Ingredient>
    });
  }

  const addShoppingListToPantry = () => {
    console.log(ingredientsList);
    axios({
      method: 'patch',
      url: `/users/${props.user.id}/pantry/add-from-shopping-list`,
      headers: { 'Content-Type': 'application/json' },
      data: ingredientsList
    }).then((response) => {
        console.log(response);
        // location.reload();
    })
  }

  
  return (
    <div className="container">
      <table>
        {getIngredients(ingredientsList)}
      </table>
      <button onClick={addShoppingListToPantry}>Purchased All</button>
    </div>
    );
}
 
export default ShoppingList;
