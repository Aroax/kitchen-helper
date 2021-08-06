import React, { useState } from "react";
import Ingredient from "./ingredient";
import Form from "./addForm";
import { Divider, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PrimaryButton from "./buttonPrimary";
import axios from "axios";
import SearchBar from "./searchBar";

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
  },
  lookup: {
    marginTop: theme.spacing(2)
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
  const placeholderImage = "https://www.teahub.io/photos/full/17-174123_green-light-texture-light-green-light-background-texture.jpg";

  const ingredientsList = props.user.pantry;
  let lookupName;
  let food_app_ID = "d3e7d692";
  let food_app_key = "8147d1ff5bab97e50f29cc6c98459afd";
  let food_api_url = "https://api.edamam.com/api/food-database/v2/parser";
  
  
  const getIngredients = (pantry) => {
    return pantry.map((ingredient) => {
      return (
        <Grid item xs={12} sm={6} md={4}>
          <Ingredient data={ingredient} bool={true} type="pantry" userId={props.user.id} weight={ingredient.weight} location={ingredient.location} onRemoveClick={() => { removeFromPantry(event, ingredient) }}></Ingredient>
        </Grid>
      )
    });
  }

  const removeFromPantry = (event, ingredient) => {
    console.log('removing', ingredient);
    event.preventDefault();
    axios({
      method: 'patch',
      url: `/users/${props.user.id}/pantry/remove`,
      headers: { 'Content-Type': 'application/json' },
      data: ingredient
    }).then((response) => {
      console.log(response);
      props.refreshUser();
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
    addIngredient();
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
        imageUrl: (imageUrl ? imageUrl : placeholderImage),
        expiry: expiry,
      }
    }).then((response) => {
      console.log(response);
      props.refreshUser();
    })
  }

  const ingredientLookup = () => {
    event.preventDefault();
    axios({
      method: 'get',
      url: `${food_api_url}?app_id=${food_app_ID}&app_key=${food_app_key}&ingr=${lookupName}&nutrition-type=cooking`,
    }).then((response) => {
      console.log(response.data.parsed[0].food.foodId);

      setStoredToState(response.data.parsed[0].food);
      setStoredIngredient(response.data.parsed[0].food);
      storedIngredient ? console.log(storedIngredient) : console.log("empty");
    });
  }

  const Lookup = () => {
    return (
      <Grid container className={classes.lookup}>
        <SearchBar
          label="Search for ingredient"
          color="secondary"
          onClick={ingredientLookup}
          onChange={handleLookupNameChange}
        />
      </Grid>
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

  // Render below
  const classes = useStyles();

  return (
    <main className={classes.pantry}>
      <div className={classes.toolbar} />
      <h1>My Pantry</h1>
      <PrimaryButton text="Add Ingredient" color="primary" onClick={addIngredient} />
      <br/>
      {showLookup ? <Lookup /> : null}
      {storedIngredient ? form : <div></div>}
      <br/>
      <Divider/>
      <br/>
      <Grid container direction="row" alignItems="flex-start" spacing={1}>
        {getIngredients(ingredientsList)}
      </Grid>
    </main>
  );
}

export default pantry;
