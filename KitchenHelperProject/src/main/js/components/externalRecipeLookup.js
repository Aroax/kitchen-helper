import React from "react";
import axios from "axios";
import Recipe from "./recipe"
import Grid from "@material-ui/core/Grid";
import SearchBar from "./searchBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  recipes: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

const externalRecipeLookup = (props) => {
  const classes = useStyles();
  const [searchedRecipe, setSearchedRecipe] = React.useState();

  // let recipeList;
  let recipeSearch;
  let recipe_app_ID = "c6766451";
  let recipe_app_key = "874a579490214f41f2f047c715767f92";
  let recipe_api_url = "https://api.edamam.com/api/recipes/v2?type=public";

  const recipeLookup = (event) => {
    event.preventDefault();

    axios({
      method: 'get',
      url: `${recipe_api_url}&q=${recipeSearch}&app_id=${recipe_app_ID}&app_key=${recipe_app_key}`
      // headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      // console.log(response.data.hits);
      setSearchedRecipe(response.data.hits);
      // getRecipes(response.data.hits);
    });
  }

  const handleRecipeLookupNameChange = (event) => {
    recipeSearch = event.target.value;
  }

  const getRecipes = (recipes) => {
    return recipes.map((recipe) => {
      return (
        <Grid item xs={12} sm={6} md={3}>
          <Recipe data={recipe} userId={props.user.id} refreshUser={props.refreshUser}></Recipe>
        </Grid>
      )
    });
  }

  return (
    <main className={classes.recipes}>
    <h2>Search Online Recipes</h2>
    <h3>Try a recipe name, dish type or a main ingredient</h3>
      <SearchBar
        color="secondary"
        label="Search for recipes"
        onClick={recipeLookup}
        onChange={handleRecipeLookupNameChange}
      />
      {searchedRecipe ?
        (<Grid container direction="row" alignItems="flex-start" spacing={2}>
          {getRecipes(searchedRecipe)}
        </Grid>)
        : <div></div>}
    </main>
  )

}

export default externalRecipeLookup;
