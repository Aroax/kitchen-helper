package com.app.model;

import java.util.ArrayList;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Document
public class CustomRecipe {
	
	// @Id
	private String recipeId;

	private ArrayList<Ingredient> ingredients;
	
	
	public String getRecipeId() {
		return recipeId;
	}

	public void setrecipeId(String recipeId) {
		this.recipeId = recipeId;
	}

	public ArrayList<Ingredient> getIngredients() {
		return ingredients;
	}

	public void setIngredients(ArrayList<Ingredient> ingredients) {
		this.ingredients = ingredients;
	}

}