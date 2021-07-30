import React, { useState } from "react";
import Ingredient from "./ingredient";
import Form from "./form";
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
      url: `/users/${props.user.id}/pantry/add`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        foodId: '899',
        name: name,
        foodCategory: foodCategory,
        location: location,
        weight: weight,
        imageUrl: "http://www.amityinternational.com/wp-content/uploads/2019/02/product-placeholder.jpg",
        expiry: new Date(),
      }
    }).then((response) => {
        console.log(response);
    })
    setTimeout(location.reload.bind(location), 3000);
  }

  const form = <Form 
      onNameChange={handleNameChange} 
      onFoodCategoryChange={handleFoodCategoryChange}
      onLocationChange={handleLocationChange}
      onWeightChange={handleWeightChange}
      onImageUrlChange={handleImageUrlChange}
      onButtonClick={addToPantry}
    />

  return (
    <div className="container">
      { showForm ? form : null }
      <button onClick={addIngredient}>Add Ingredient</button>
      <table>
        {getIngredients(ingredientsList)}
      </table>
    </div>
    );
}

export default pantry;
