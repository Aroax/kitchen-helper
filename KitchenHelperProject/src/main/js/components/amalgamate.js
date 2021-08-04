import React, { useState } from "react";



    const buildShoppingListFromMealPlanner = (runningTotal, ingredients) => {
        let found;
        let total = [];
        let requiredIngredients = [];
        let modifiedIngredient;
        
        
            ingredients.map((ingredient) => {
                if (runningTotal.length > 0) {
                    // console.log('recipe ingredient', ingredient);
                    runningTotal.forEach((existingIngredient) => {
                        if (ingredient.foodId === existingIngredient.foodId) {
                            found = true;
                            modifiedIngredient = ingredient;
                            modifiedIngredient.weightNeeded = (existingIngredient.weightNeeded + ingredient.weightNeeded);
                            console.log('existing', requiredIngredients);
                        } 
                    });
                    found ? requiredIngredients.push(modifiedIngredient) : requiredIngredients.push(ingredient);
                    console.log('pushed at ternary', requiredIngredients);
                } else {
                    requiredIngredients.push(ingredient);
                    console.log('first pass', requiredIngredients);
                };
            });
        return requiredIngredients;
    } 

    const getShoppingList = () => {
        return requiredIngredients;
    }



export {buildShoppingListFromMealPlanner, getShoppingList};