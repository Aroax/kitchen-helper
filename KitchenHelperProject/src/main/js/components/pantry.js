import React, { useState } from "react";
import Ingredient from "./ingredient";
import axios from "axios";

const pantry = (props) => {
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [location, setLocation] = useState("");
  const [weight, setWeight] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const ingredientsList = props.user.pantry;

  const getIngredients = (pantry) => {
    return pantry.map((ingredient) => {
      return <Ingredient data={ingredient}></Ingredient>
    });
  }

  const addIngredient = () => {
    if (showForm === false) {
      setShowForm(true);
    } else {
      setShowForm(false);
    };
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleFoodCategoryChange = (event) => {
    setFoodCategory(event.target.value);
  }

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  }

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  }

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  }

  const addToPantry = () => {
    axios({
      method: 'patch',
      url: `/users/61010f43206992434aa26ea8/pantry/add`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        foodId: '899',
        name: name,
        foodCategory: foodCategory,
        location: location,
        weight: weight,
        imageUrl: imageUrl,
        expiry: new Date(),
      }
    }).then((response) => {
        console.log(response);
        location.reload();
    })
  }

  const Form = () => {
    return (
      <div>
        <form>
          <input type="text" onChange={handleNameChange}></input>
          <input type="text" onChange={handleFoodCategoryChange}></input>
          <input type="text" onChange={handleLocationChange}></input>
          <input type="text" onChange={handleWeightChange}></input>
          <input type="text" onChange={handleImageUrlChange}></input>
        </form>
        <button onClick={addToPantry}>Add To Pantry</button>
      </div>
    )
  }
  
  return (
    <div className="container">
      {showForm ? <Form /> : null}
      <button onClick={addIngredient}>Add Ingredient</button>
      <table>
        {getIngredients(ingredientsList)}
      </table>
    </div>
    );
}
 
export default pantry;
