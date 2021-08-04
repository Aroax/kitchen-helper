import React, { useState, useEffect } from "react";

import axios from "axios";
import compareIngredientsArrayAndBuild from "./compareIngredientsArrayAndBuild";


const MealPlanner = (props) => {
  // const mealPlanner = props.user.mealPlanner;
  const [mealPlanner, setMealPlanner] = useState(props.user.mealPlanner);
  
  const [assignedMeals, setAssigedMeals] = useState(
    {
      Unassigned: [],
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    }
  );

  let allMealPlanIngredients = [];

  const sortMealPlannerRecipes = () => {
    mealPlanner.forEach((recipe) => {
      // console.log('for each recipe', recipe);
      // console.log('monday', assignedMeals.monday);
      // console.log('assignedMeals', assignedMeals);
      recipe.mealPlannerDay ? recipe.mealPlannerDay : recipe.mealPlannerDay = "Unassigned";
      switch (recipe.mealPlannerDay) {
        case "Monday":
          assignedMeals.Monday.push(recipe);
          break;
        case "Tuesday":
          assignedMeals.Tuesday.push(recipe);
          break;
        case "Wednesday":
          assignedMeals.Wednesday.push(recipe);
          break;
        case "Thursday":
          assignedMeals.Thursday.push(recipe);
          break;
        case "Friday":
          assignedMeals.Friday.push(recipe);
          break;
        case "Saturday":
          assignedMeals.Saturday.push(recipe);
          break;
        case "Sunday":
          assignedMeals.Sunday.push(recipe);
          break;
        default:
          assignedMeals.Unassigned.push(recipe);
          break;
      }
    });
  }

  const dayDisplay = (meals) => {
    // console.log('meals in day display', meals)
    return(
      meals.map((recipe) => {
        return(
        <div>
        <table>

          <Recipe data={recipe} />
          Day: {recipe.mealPlannerDay}
          <br></br>

          <label for="day"> Assign Day: </label>
          <select onChange={() => { assignDay(event, recipe) }}>
            <option value="Unassigned">Please Select...</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </table>

        <button onClick={() => { removeFromMealPlanner(recipe) }}>Remove From Meal Planner</button>
        <br></br>
      </div>
      )
    })
    )
  }

      const displayAssignedMeals = () => {
        sortMealPlannerRecipes();
        // console.log('in displayAssignedMeals', assignedMeals);

        return Object.entries(assignedMeals).map(([day, meals]) => {
          return (
            <div>
              <hr/>
              <h2>{day}</h2>
              {dayDisplay(meals)}
              <br></br>
              <hr/>
              </div>
          )});
      }

      const getMealPlannerRecipes = () => {
        
        return ( mealPlanner.map((recipe) => {
          
          
          return (
            <div>
              <table>

                <Recipe data={recipe} />
                Day: {recipe.mealPlannerDay}
                <br></br>

                <DayDropDown />                

              </table>

              <button onClick={() => { removeFromMealPlanner(recipe) }}>Remove From Meal Planner</button>
              <br></br>
            </div>
          )
        }));
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

      const DayDropDown = () => {
        return (
          <div>
          <label for="day"> Assign Day: </label>
          <select onChange={() => { assignDay(event, recipe) }}>
            <option value="unassigned">Please Select...</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          </div>
        );
      }

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
          sortMealPlannerRecipes();
          // location.reload();
        })
      }

      const removeFromMealPlanner = (recipe) => {
        // console.log('remove this recipe');
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
        let total = [];
        mealPlanner.map((recipe) => {  
          // console.log(`top of map, ${allMealPlanIngredients}`);
           total = compareIngredientsArrayAndBuild(total, recipe.ingredients, true);
          // console.log('comparison', comparison);
          // total.forEach((ingredient) => {
          //   // console.log('ingredient', ingredient);
          //   allMealPlanIngredients.push(ingredient);
          // });
            // console.log(`in loop, ${allMealPlanIngredients}`);
          });
        console.log('finished iterating total', total);
  


        // let pantry = props.user.pantry;
        // let vettedIngredients = compareIngredientsArrayAndBuild(pantry, allMealPlanIngredients)
        // console.log('allMealPlanIngredients in axios', allMealPlanIngredients);
        // console.log('vetted ingredients', vettedIngredients);
        // axios({
        //   method: 'patch',
        //   url: `/users/${props.user.id}/shopping-list/add-multiple`,
        //   headers: { 'Content-Type': 'application/json' },
        //   data: vettedIngredients
        // }).then((response) => {
        //   console.log(response);
        //   // location.reload();
        // })
      }


      const View = () => {
        return (
          <div>
            <h1>Meal Planner</h1>
            <button onClick={() => { addAllRecipesToShoppingList() }}>Add All Recipes to Shopping List</button>
            <br></br>
            {/* {getMealPlannerRecipes()} */}
            {displayAssignedMeals()}
            <br></br>
            <br></br>
            <button onClick={() => { addAllRecipesToShoppingList() }}>Add All Recipes to Shopping List</button>
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