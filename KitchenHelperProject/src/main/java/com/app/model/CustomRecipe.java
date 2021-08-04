package com.app.model;

import java.util.ArrayList;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;


public class CustomRecipe {
	
	
	private String recipeId;
	
	private String recipeName;

	private ArrayList<Ingredient> ingredients;
	
	private String mealPlannerDay;
	
	
	public void showStats() {
		System.out.println(this.recipeId);
		System.out.println(this.recipeName);
		System.out.println(this.ingredients);
	}
	
	
	public String getRecipeId() {
		return recipeId;
	}

	public void setRecipeId(String recipeId) {
		this.recipeId = recipeId;
	}

	public ArrayList<Ingredient> getIngredients() {
		return ingredients;
	}

	public void setIngredients(ArrayList<Ingredient> ingredients) {
		this.ingredients = ingredients;
	}

	public String getRecipeName() {
		return recipeName;
	}

	public void setRecipeName(String recipeName) {
		this.recipeName = recipeName;
	}


	public String getMealPlannerDay() {
		return mealPlannerDay;
	}


	public void setMealPlannerDay(String mealPlannerDay) {
		this.mealPlannerDay = mealPlannerDay;
	}

}