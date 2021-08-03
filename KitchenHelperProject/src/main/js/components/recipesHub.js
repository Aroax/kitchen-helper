import React from 'React';

import ExternalRecipeLookup from "./externalRecipeLookup"
import ManualRecipe from "./manualRecipe";

const RecipesHub = (props) => {

    const saveRecipeToMealPlanner = () => {
        return ( 
            null
         );
    }
     
   

    return ( 
        <div className='container'>
            <ExternalRecipeLookup user={props.user}/>
            <hr />
            {props.user ?  <ManualRecipe user={props.user} /> : <div>Loading...</div>}
            <savedRecipes />
            <customRecipes  />
        </div>
     );
}
 
export default RecipesHub;