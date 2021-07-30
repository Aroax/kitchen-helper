import React from "react";
import axios from "axios";
import Recipe from "./recipe"

const recipes = () => {

  const [searchedRecipe, setSearchedRecipe] = React.useState();

  // let recipeList;
  let recipeSearch;
  let food_app_ID = "c6766451";
  let food_app_key = "874a579490214f41f2f047c715767f92";
  let recipe_api_url = "https://api.edamam.com/api/recipes/v2?type=public";

  const recipeLookup = (event) => {
    event.preventDefault();
    // useEffect(() => {
    axios({
      method: 'get',
      url: `${recipe_api_url}&q=${recipeSearch}&app_id=${food_app_ID}&app_key=${food_app_key}`
      // headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      console.log(response.data.hits);
      setSearchedRecipe(response.data.hits);
      // recipeList = response.data.hits;
      // getRecipes(response.data.hits);
    
    });
    // }, [])
  }

  const handleRecipeLookupNameChange = (event) => {
    recipeSearch = event.target.value;
  }

  const getRecipes = (recipes) => {
    return recipes.map((recipe) => {
      return (
        <div>
          <Recipe data={recipe} ></Recipe>
        </div>
      )
    });
  }

  return (
    <div>
      <form onSubmit={recipeLookup}>
        <input type="text" placeholder="Search recipes" onChange={handleRecipeLookupNameChange}></input>
        <input type="submit" value="search" />
      </form>
      {searchedRecipe ?
        (<table>
          {getRecipes(searchedRecipe)}
        </table>)
        :
        <div></div> }
    </div>
  )

}

export default recipes;