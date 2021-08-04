import React, { useState, useEffect } from "react";

import axios from "axios";


const MealPlanner = (props) => {
  // const mealPlanner = props.user.mealPlanner;
  const [mealPlanner, setMealPlanner] = useState(props.user.mealPlanner);
  const [daySelector, setDaySelector] = useState([
    {
      label: "Luke Skywalker",
      value: "Luke Skywalker"
    },
    { label: "C-3PO", value: "C-3PO" },
    { label: "R2-D2", value: "R2-D2" }
  ]);

  let allMealPlanIngredients = [];

  const getMealPlannerRecipes = () => {
    
    return mealPlanner.map((recipe) => {
      const day = recipe.mealPlannerDay ? recipe.mealPlannerDay : "unassigned";
      return (
        <div>
          <table>
            
            <Recipe data={recipe} />
            Day: {day} 
            <br></br>
    
      <label for="day"> Assign Day: </label><select value="please select" onChange={() => {assignDay(event, recipe)}}>
           <option value="Monday">Monday</option>
           <option value="Tuesday">Tuesday</option>
           <option value="Wednesday">Wednesday</option>
        </select>
          </table>

          <button onClick={() => { removeFromMealPlanner(recipe) }}>Remove From Meal Planner</button>
          <br></br>
        </div>
      )
    });
  }

  const Recipe = (recipeProps) => {
    //   console.log('in recipe props', props);
    return (
      <div>
        <tr>
          <h3>{recipeProps.data.recipeName}</h3>
        </tr>
      </div>

    )
  }

  // const DayDropDown = (dropdownProps) => {
  //   return (
  //     <form >
  //     <select onChange={() => {assignDay(dropdownProps.data.recipe, value)}}>
  //       {daySelector.map(({ label, value }) => (
  //         <option key={value} value={value}>
  //           {label}
  //         </option>
  //       ))}
  //     </select>
  //     </form>
  //   );
  // }

  const assignDay = (event, recipe) => {
    event.preventDefault();
    recipe.mealPlannerDay = event.target.value;
    // console.log('recipe', recipe);
    // console.log('event value', event.target.value);
    axios({
      method: 'patch',
      url: `/users/${props.user.id}/mealplanner/update-recipe`,
      headers: { 'Content-Type': 'application/json' },
      data: recipe
    }).then((response) => {
      console.log(response);
      // location.reload();
    })
  }

  const removeFromMealPlanner = (recipe) => {
    console.log('remove this recipe');
    axios({
      method: 'patch',
      url: `/users/${props.user.id}/mealplanner/remove`,
      headers: { 'Content-Type': 'application/json' },
      data: recipe
    }).then((response) => {
      console.log(response);
      setMealPlanner(props.user.mealPlanner);
      // location.reload();
    })
  }


  const addAllRecipesToShoppingList = () => {
    mealPlanner.map((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        allMealPlanIngredients.push(ingredient);
        console.log(`added ${ingredient.name} to array`);
      })
    })
    console.log('allMealPlanIngredients', allMealPlanIngredients);
    axios({
      method: 'patch',
      url: `/users/${props.user.id}/shopping-list/add-multiple`,
      headers: { 'Content-Type': 'application/json' },
      data: allMealPlanIngredients
    }).then((response) => {
      console.log(response);
      // location.reload();
    })
  }


  const View = () => {
    return (
      <div>
        <h1>Meal Planner</h1>
        <br></br>
        {getMealPlannerRecipes()}
        <br></br>
        <button onClick={() => { addAllRecipesToShoppingList() }}>Add All to Shopping List</button>
      </div>
    );
  }

  return (
    <div className="container">
      <View />
    </div>
  );
}

export default MealPlanner;