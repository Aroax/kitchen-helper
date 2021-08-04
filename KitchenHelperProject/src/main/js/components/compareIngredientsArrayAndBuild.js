

const compareIngredientsArrayAndBuild = (pantry, ingredients, recursive=false) => {
    let found;
    let requiredIngredients = pantry;


    // console.log('ingredients', ingredients);
    // console.log('pantry', pantry);
    // console.log('top of compare', requiredIngredients);
    
    
    ingredients.map((recipeIngredient) => {
        // console.log('recipe ingredient', recipeIngredient);
        found = false;
        if (pantry.length > 0) {
        pantry.forEach((pantryIngredient) => {
            // console.log('recipe Ing', recipeIngredient);
            // console.log('pantry Ing', pantryIngredient);
            if (recipeIngredient.foodId === pantryIngredient.foodId) {
                found = true;
                // console.log('pantry in comparison', pantryIngredient);
                if (recursive == true) {
                    amalgamateIngredients(recipeIngredient, pantryIngredient);
                } else {
                    addRequiredAmount(recipeIngredient, pantryIngredient);  
                };
            }; 
        });
        found ? null : requiredIngredients.push(recipeIngredient);
        // console.log('at ternary', recipeIngredient);
        
    }
    else {
        requiredIngredients.push(recipeIngredient);
        // console.log('gone to else, reqIngredient', requiredIngredients);
    }
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

    const amalgamateIngredients = (recipeIng, pantryIng) => {
        let modifiedIngredient = recipeIng;
        modifiedIngredient.weightNeeded = pantryIng.weightNeeded + recipeIng.weightNeeded;
        console.log('modIng inside amalgamate', modifiedIngredient);
        requiredIngredients.push(modifiedIngredient);
        console.log('reqIng inside amalgamate', requiredIngredient);
    }


//   const addToShoppingList = () => {
//     // event.preventDefault();
//     console.log('required ingredients in addToShoppingList', requiredIngredients);
//     axios({
//       method: 'patch',
//       url: `/users/${props.user.id}/shopping-list/add-multiple`,
//       headers: { 'Content-Type': 'application/json' },
//       data: requiredIngredients
//     }).then((response) => {
//         console.log(response);
//         // location.reload();
//     })
//   }

console.log('FINAL required ing array', requiredIngredients);
    return requiredIngredients;
}

export default compareIngredientsArrayAndBuild;