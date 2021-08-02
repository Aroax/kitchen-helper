package com.app.model;

import java.util.ArrayList;
// import java.util.List;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="users")
public class User {

	@Id
	private String id;
	
	private String email;
	
	private String displayName;
	
	private String password;
	
	private ArrayList<Ingredient> pantry;
	
	private Object preferences;
	
	private ArrayList<Ingredient> shoppingList;
	
	private ArrayList<CustomRecipe> customRecipes;

	private ArrayList<Recipe> savedRecipes;
	
	private ArrayList<Ingredient> draftRecipe;
	
	private ArrayList<CustomRecipe> recentRecipes;
	
//	private ArrayList<Object> recipes;
	


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public ArrayList<Ingredient> getPantry() {
		return pantry;
	}

	public void setPantry(ArrayList<Ingredient> pantry) {
		this.pantry = pantry;
	}

	public Object getPreferences() {
		return preferences;
	}

	public void setPreferences(Object preferences) {
		this.preferences = preferences;
	}

	public ArrayList<Ingredient> getShoppingList() {
		return shoppingList;
	}

	public void setShoppingList(ArrayList<Ingredient> shoppingList) {
		this.shoppingList = shoppingList;
	}

	public ArrayList<CustomRecipe> getCustomRecipes() {
		return customRecipes;
	}
	
	public void setCustomRecipes(ArrayList<CustomRecipe> customRecipes) {
		this.customRecipes = customRecipes;
	}

	public ArrayList<Recipe> getSavedRecipes() {
		return savedRecipes;
	}
	
	public void setSavedRecipes(ArrayList<Recipe> savedRecipes) {
		this.savedRecipes = savedRecipes;
	}


	public ArrayList<Ingredient> getDraftRecipe() {
		return draftRecipe;
	}
	
	public void setDraftRecipe(ArrayList<Ingredient> draftRecipe) {
		this.draftRecipe = draftRecipe;
	}
	
	public Boolean isIngredientInPantry(String foodId) {
		Boolean found = false;
		for (Ingredient ing : pantry) {
			if (ing.getFoodId().equals(foodId)) {
				found = true;
			}
		}
		return found;
	}
	
	public void increasePantryIngredientAmount(String foodId, Float amount) {
			for (Ingredient ing : pantry) {
				if (ing.getFoodId().equals(foodId)) {
					ing.setWeight(ing.getWeight() + amount);
				}
			}
	}
	
	public void decreasePantryIngredientAmount(String foodId, Float amount) {
		for (Ingredient ing : pantry) {
			if (ing.getFoodId().equals(foodId)) {
				ing.setWeight(ing.getWeight() - amount);
			}
		}
}

	public ArrayList<CustomRecipe> getRecentRecipes() {
		return recentRecipes;
	}
	
	public void setRecentRecipes(ArrayList<CustomRecipe> recentRecipes) {
		this.recentRecipes = recentRecipes;
	}

}
