import React from 'React';

import ExternalRecipeLookup from "./externalRecipeLookup"
import ManualRecipe from "./manualRecipe";
import MealPlanner from './mealPlanner';
import RecipeList from './recipeList';

const RecipesHub = (props) => {

    
     
   

    return ( 
        <div className='container'>
            <h1>Recipes Hub</h1>
            <ExternalRecipeLookup user={props.user}/>
            <hr />
            {props.user ?  <ManualRecipe user={props.user} /> : <div>Loading...</div>}
            <hr />
            
            <hr />
            <MealPlanner user={props.user} />
            {/* <savedRecipes />
            <customRecipes  /> */}
        </div>
     );
}
 
export default RecipesHub;