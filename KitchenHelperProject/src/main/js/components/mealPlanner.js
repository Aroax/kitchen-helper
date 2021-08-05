import React, { useState } from "react";
import axios from "axios";
import compareIngredientsArrayAndBuild from "./compareIngredientsArrayAndBuild";
import { getShoppingList, buildShoppingListFromMealPlanner }from "./utilities/amalgamate";

const MealPlanner = (props) => {
  let pantry = props.user.pantry;
  let allMealPlanIngredients = [];
  let requiredIngredients = [];
  let mealPlanner = props.user.mealPlanner;
  let assignedMeals = {
    Unassigned: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  }

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
          props.refreshUser();
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
          props.refreshUser();
        })
      }

      const removeAllFromMealPlanner = () => {
        axios({
          method: 'patch',
          url: `/users/${props.user.id}/mealplanner/remove-all`,
          headers: { 'Content-Type': 'application/json' },
          data: mealPlanner
        }).then((response) => {
          console.log(response);
          props.refreshUser();
        })
      }


      const addAllRecipesToShoppingList = () => {
        // let requiredIngredients = [];
        let result = [];
        mealPlanner.forEach((recipe) => {  
          // console.log('top of map, allMealPlanIngredients', allMealPlanIngredients);
           result = buildShoppingListFromMealPlanner(allMealPlanIngredients, recipe.ingredients);
          //  console.log('result after call:', result);

           result.forEach((ingredient) => {
            allMealPlanIngredients.push(ingredient);
          //  console.log('total after second iteration:', allMealPlanIngredients);
          });
        
           });
           
          // total = getShoppingList();
        // console.log('finished iterating total', allMealPlanIngredients);
  


        
        let vettedIngredients = compareIngredientsAndBuild(allMealPlanIngredients)
        console.log('allMealPlanIngredients in axios', allMealPlanIngredients);
        console.log('vetted ingredients', vettedIngredients);
        axios({
          method: 'patch',
          url: `/users/${props.user.id}/shopping-list/add-multiple`,
          headers: { 'Content-Type': 'application/json' },
          data: vettedIngredients
        }).then((response) => {
          console.log(response);
          props.refreshUser();
        })
      }

      const compareIngredientsAndBuild = (ingredients) => {
        let found;
       
        // console.log('pantry', pantry);
        // console.log('top of compare', requiredIngredients);
        
        
        ingredients.map((recipeIngredient) => {
            found = false;
            pantry.forEach((pantryIngredient) => {
                // console.log('recipe Ing', recipeIngredient);
                // console.log('pantry Ing', pantryIngredient);
                if (recipeIngredient.foodId === pantryIngredient.foodId) {
                    found = true;
                    // console.log(found, recipeIngredient);
                    addRequiredAmount(recipeIngredient, pantryIngredient);
                }; 
            });
            found ? null : requiredIngredients.push(recipeIngredient);
            // console.log('at ternary', recipeIngredient);
    
        })
        // console.log('end of compare', requiredIngredients);
        return requiredIngredients;
      }
    
      const addRequiredAmount = (recipeIng, pantryIng) => {
        // console.log('top of amount reqIng', requiredIngredients);
        // let weightNeeded;
        (pantryIng.weight >= recipeIng.weightNeeded) ? null : modifyIngredient(recipeIng, pantryIng);
      }
    
        const modifyIngredient = (recipeIng, pantryIng) => {
            
            let weightNeeded = recipeIng.weightNeeded - pantryIng.weight;
            let modifiedIngredient = recipeIng;
            modifiedIngredient.weightNeeded = weightNeeded;
            // console.log('mod Ing inside anon', modifiedIngredient);
            requiredIngredients.push(modifiedIngredient);
        }


      const View = () => {
        return (
          <div>
            <h1>Meal Planner</h1>
            <button onClick={() => { addAllRecipesToShoppingList() }}>Add All Recipes to Shopping List</button>
            <br></br>
            <button onClick={() => { removeAllFromMealPlanner() }}>Clear Meal Planner</button>
            <br></br>
            {/* {getMealPlannerRecipes()} */}
            {displayAssignedMeals()}
            <br></br>
            <br></br>
            <button onClick={() => { addAllRecipesToShoppingList() }}>Add All Recipes to Shopping List</button>
            <br></br>
            <button onClick={() => { removeAllFromMealPlanner() }}>Clear Meal Planner</button>
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
