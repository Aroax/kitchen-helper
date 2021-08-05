import React, { useState, useEffect } from "react";
import Ingredient from "./ingredient";
import Form from "./form";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PrimaryButton from "./buttonPrimary";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  pantry: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  divider: {
    padding: theme.spacing(0.15),
    margin: "50px 0"
  }
}));

const pantry = (props) => {
  const [showLookup, setShowLookup] = useState(false);
  const [storedIngredient, setStoredIngredient] = useState();

  const [foodId, setFoodId] = useState("899");
  const [name, setName] = useState("test_ingredient");
  const [foodCategory, setFoodCategory] = useState("test");
  const [location, setLocation] = useState("unknown");
  const [weight, setWeight] = useState("99");
  const [expiry, setExpiry] = useState(new Date());
  const [imageUrl, setImageUrl] = useState("http://www.amityinternational.com/wp-content/uploads/2019/02/product-placeholder.jpg");

  const ingredientsList = props.user.pantry;
  let lookupName;
  let food_app_ID = "d3e7d692";
  let food_app_key = "8147d1ff5bab97e50f29cc6c98459afd";
  let food_api_url = "https://api.edamam.com/api/food-database/v2/parser";

  const getIngredients = (pantry) => {
    return pantry.reverse().map((ingredient) => {
      return (
        <Grid item xs={12} sm={6} md={4}>
          <Ingredient data={ingredient} userId={props.user.id} weight={ingredient.weight} weight={ingredient.weight} location={ingredient.location}></Ingredient>
        </Grid>
      )
    });
  }

  const addToShoppingList = (event, ingredient) => {
    console.log(ingredient);
    event.preventDefault();
    axios({
      method: 'patch',
      url: `/users/${props.user.id}/shopping-list/add`,
      headers: { 'Content-Type': 'application/json' },
      data: ingredient
    }).then((response) => {
      console.log(response);
      // location.reload();
    })
  }

  const addIngredient = () => {
    if (showLookup === false) {
      setShowLookup(true);
    } else {
      setShowLookup(false);
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

  const handleExpiryChange = (event) => {
    setExpiry(event.target.value);
  }

  const handleLookupNameChange = (event) => {
    // event.preventDefault();
    lookupName = event.target.value;
  }

  const setStoredToState = (edamamResult) => {
    setFoodId(edamamResult.foodId);
    setName(edamamResult.label);
    setFoodCategory(edamamResult.category);
    setImageUrl(edamamResult.image);
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
        expiry: expiry,
      }
    }).then((response) => {
        console.log(response);
        props.refreshUser();
    })
  }

  const ingredientLookup = () => {
    event.preventDefault();
    // useEffect(() => {
    axios({
      method: 'get',
      url: `${food_api_url}?app_id=${food_app_ID}&app_key=${food_app_key}&ingr=${lookupName}&nutrition-type=cooking`,
      // headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      console.log(response.data.parsed[0].food.foodId);

      setStoredToState(response.data.parsed[0].food);
      setStoredIngredient(response.data.parsed[0].food);
      storedIngredient ? console.log(storedIngredient) : console.log("empty");
    });
    // }, [])
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

  const form =
    <Form
      onNameChange={handleNameChange}
      onFoodCategoryChange={handleFoodCategoryChange}
      onLocationChange={handleLocationChange}
      onWeightChange={handleWeightChange}
      onImageUrlChange={handleImageUrlChange}
      onExpiryChange={handleExpiryChange}
      onButtonClick={addToPantry}
      name={name}
      category={foodCategory}
      weight={weight}
      imageUrl={imageUrl}
    />

  // const LookupDisplayConfirmation = () => {
  //   return(
  //     <div>
  //     <Ingredient data={storedIngredient} />
  //       <button onClick={addToPantry}>Add this ingredient to pantry</button>
  //     </div>
  //   )
  // }

  // Render below
  const classes = useStyles();

  return (
    <main className={classes.pantry}>
      <div className={classes.toolbar} />
      {showLookup ? <Lookup /> : null}
      {storedIngredient ? form : <div>storage empty</div>}
      <PrimaryButton text="Add Ingredient" color="primary" onClick={addIngredient} />
      <Grid container direction="row" alignItems="flex-start" spacing={1}>
        {getIngredients(ingredientsList)}
      </Grid>
    </main>
  );
}

export default pantry;
