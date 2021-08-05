
const compareIngredientsArrayAndBuild = (pantry, ingredients) => {
    let found;
    let requiredIngredients = [];
    // console.log('recipe', recipe);
    // console.log('pantry', pantry);
    // console.log('top of compare', requiredIngredients);
    // console.log('recipe ingredients', recipe.ingredients);
    
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

export default compareIngredientsArrayAndBuild;