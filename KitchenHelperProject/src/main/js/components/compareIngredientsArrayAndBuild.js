

const compareIngredientsArrayAndBuild = (pantry, recipe) => {
    let found;
    let requiredIngredients = [];

    // console.log('recipe', recipe);
    // console.log('pantry', pantry);
    // console.log('top of compare', requiredIngredients);
    // console.log('recipe ingredients', recipe.ingredients);
    
    recipe.ingredients.map((recipeIngredient) => {
        found = false;
        pantry.forEach((pantryIngredient) => {
            // console.log('recipe Ing', recipeIngredient);
            // console.log('pantry Ing', pantryIngredient);
            if (recipeIngredient.foodId === pantryIngredient.foodId) {
                found = true;
                console.log(found, recipeIngredient);
                addRequiredAmount(recipeIngredient, pantryIngredient);
            }; 
        });
        found ? null : requiredIngredients.push(recipeIngredient);
        // console.log('at ternary', recipeIngredient);

    })
    // console.log('end of compare', requiredIngredients);
    
  

  const addRequiredAmount = (recipeIng, pantryIng) => {
    console.log('top of amount reqIng', requiredIngredients);
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


  const addToShoppingList = () => {
    // event.preventDefault();
    // console.log('required ingredients in addToShoppingList', requiredIngredients);
    axios({
      method: 'patch',
      url: `/users/${props.user.id}/shopping-list/add-multiple`,
      headers: { 'Content-Type': 'application/json' },
      data: requiredIngredients
    }).then((response) => {
        console.log(response);
        // location.reload();
    })
  }

    // return requiredIngredients;
}

export default compareIngredientsArrayAndBuild;