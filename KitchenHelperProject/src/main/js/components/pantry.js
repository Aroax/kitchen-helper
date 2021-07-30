import React, { useState, useEffect } from "react";
import Ingredient from "./ingredient";
import axios from "axios";

const pantry = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [storedIngredient, setStoredIngredient] = useState();

  const [foodId, setFoodId] = useState("899");
  const [name, setName] = useState("test_ingredient");
  const [foodCategory, setFoodCategory] = useState("test");
  const [location, setLocation] = useState("unknown");
  const [weight, setWeight] = useState("99");
  const [imageUrl, setImageUrl] = useState("http://www.amityinternational.com/wp-content/uploads/2019/02/product-placeholder.jpg");

  const ingredientsList = props.user.pantry;
  let lookupName;
  let food_app_ID = "d3e7d692";
  let food_app_key = "8147d1ff5bab97e50f29cc6c98459afd";
  let food_api_url = "https://api.edamam.com/api/food-database/v2/parser"

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

  const handleLookupNameChange = (event) => {
    event.preventDefault();
    lookupName = event.target.value;
  }

  const addStoredToPantry = () => {
    setFoodId(storedIngredient.foodId);
    setName(storedIngredient.label);
    setFoodCategory(storedIngredient.category);
    setImageUrl(storedIngredient.image);
    addToPantry();
  }

  const addToPantry = () => {
    event.preventDefault();
    axios({
      method: 'patch',
      url: `/users/${props.user.id}/pantry/add`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        foodId: foodId,
        name: name,
        foodCategory: foodCategory,
        location: location,
        weight: weight,
        imageUrl: imageUrl,
        expiry: new Date(),
      }
    }).then((response) => {
        console.log(response);
    })
    setTimeout(location.reload.bind(location), 3000);
  }

  const ingredientLookup = () => {
    useEffect(() => {
      axios({
        method: 'get',
        url: `${food_api_url}?app_id=${food_app_ID}&app_key=${food_app_key}&ingr=${lookupName}&nutrition-type=cooking`,
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
          // console.log(response);
          // console.log(response.data);
          // console.log(response.data.parsed);
          // console.log(response.data.parsed[0]);
          console.log(response.data.parsed[0].food);
          setStoredIngredient(response.data.parsed[0].food);
          console.log(storedIngredient);
      });
    }, [])
  }

  const Lookup = () => {
    return (
      <div>
        <form onSubmit={ingredientLookup}>
          <input type="text" placeholder="Ingredient name" onChange={handleLookupNameChange}></input>
          <input type="submit" value="search" />
        </form>
      </div>
    )
  }

  const Form = () => {
    console.log(props.user.id);
    return (
      <div>
        <form>
          <input type="text" placeholder="Name" onChange={handleNameChange}></input>
          <input type="text" placeholder="Food Category" onChange={handleFoodCategoryChange}></input>
          <input type="text" placeholder="Storage Location" onChange={handleLocationChange}></input>
          <input type="text" placeholder="Weight" onChange={handleWeightChange}></input>
          <input type="hidden" placeholder="Image URL" onChange={handleImageUrlChange}></input>
        </form>
        <button onClick={addToPantry}>Add To Pantry</button>

      </div>
    )
  }

  const LookupDisplayConfirmation = () => {
    return(
      <div>
      <Ingredient data={storedIngredient} />
      <button onClick={addStoredToPantry}>Add this ingredient to pantry</button>
      </div>
    )
  }

  // Render below

  return (
    <div className="container">
      {showForm ? <Form /> : null}
      <p><Lookup /></p>
      {storedIngredient ? <LookupDisplayConfirmation /> : <div>storage empty</div> }
      <button onClick={addIngredient}>Add Ingredient</button>
      <table>
        {getIngredients(ingredientsList)}
      </table>
    </div>
    );
}

export default pantry;
