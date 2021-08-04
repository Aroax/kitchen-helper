import React, { useState, useEffect } from "react";

import axios from "axios";


const MealPlanner = (props) => {
    // const mealPlanner = props.user.mealPlanner;
    const [mealPlanner, setMealPlanner] = useState(props.user.mealPlanner);
    let allMealPlanIngredients = [];

    const getMealPlannerRecipes = () => {
        return mealPlanner.map((recipe) => {
          return (
            <div>
                <table>
                    <Recipe data={recipe} />
                </table>
            
          <button onClick={ () => { removeFromMealPlanner(recipe) } }>Remove From Meal Planner</button>
            <br></br>
          </div>
          )
        });
      }

      const Recipe = (props) => {
        //   console.log('in recipe props', props);
          return (
              <div>
                  <tr>
                  <h3>{props.data.recipeName}</h3>
                  </tr>
              </div>
    
          )
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
            <button onClick={ () => { addAllRecipesToShoppingList() } }>Add All to Shopping List</button>
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