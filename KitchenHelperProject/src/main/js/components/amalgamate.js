import React, { useState } from "react";



    const buildShoppingListFromMealPlanner = (runningTotal, ingredients) => {
        let found;
        let total = [];
        let requiredIngredients = [];
        let modifiedIngredient;
        
        console.log('ingredients coming in', ingredients);
        console.log('runningTotal coming in', runningTotal);
            ingredients.map((ingredient) => {
                // console.log('requiredIngredients at the top', requiredIngredients);
                found = false;
                // if (runningTotal.length > 0) {
                    // console.log('recipe ingredient', ingredient);
                    runningTotal.forEach((existingIngredient) => {
                        if (ingredient.foodId === existingIngredient.foodId) {
                            found = true;
                            existingIngredient.weightNeeded += ingredient.weightNeeded;
                            // console.log('existing', requiredIngredients);
                        } 
                    });
                    found ? (null) : requiredIngredients.push(ingredient);
                    // console.log('pushed at ternary', requiredIngredients);
                // } else {
                    // requiredIngredients.push(ingredient);
                    // console.log('first pass', ingredient);
                    // console.log('requiredIngredients', requiredIngredients);
                // };
            });
        console.log('passing back requiredIngredients', requiredIngredients);
        return requiredIngredients;
    } 

    const getShoppingList = () => {
        return requiredIngredients;
    }
    



export {buildShoppingListFromMealPlanner, getShoppingList};