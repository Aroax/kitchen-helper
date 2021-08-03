package com.app.model;

import java.util.ArrayList;

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

	private ArrayList<CustomRecipe> favouriteRecipes;

	private ArrayList<CustomRecipe> customRecipes;

	private ArrayList<CustomRecipe> savedRecipes;
	
	private ArrayList<Ingredient> draftRecipe;
	
	private ArrayList<CustomRecipe> recentRecipes;
	
	private ArrayList<Ingredient> restockList;
	
//	private ArrayList<Ingredient> belowThresholdIngredients;
	
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

	public ArrayList<CustomRecipe> getSavedRecipes() {
		return savedRecipes;
	}
	
	public void setSavedRecipes(ArrayList<CustomRecipe> savedRecipes) {
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
	
	public Boolean isIngredientInPantryRunOut(String foodId) {
		Boolean runOut = false;
		for (Ingredient ing : pantry) {
			if (ing.getFoodId().equals(foodId)) {
				if (ing.getWeight() <= 0) {
					runOut = true;
				}
			}
		}
		return runOut;
	}
	
	public void pantrySpringClean() {
		removeEmptyPantryIngredients();
	}
	
	public void removeEmptyPantryIngredients() {
		ArrayList<Ingredient> runOut = new ArrayList<Ingredient>();
		for (Ingredient ing : pantry) {
				if (ing.getWeight() <= 0.0) {
					System.out.println("Cleaning empty item from Pantry: " + ing.getName());
					runOut.add(ing);
			}
		}
		pantry.removeAll(runOut);
		restockList.addAll(runOut);
	}
	
	public void checkPantryIngredientThresholds() {
		ArrayList<Ingredient> thresholdAlert = new ArrayList<Ingredient>();
		for (Ingredient ing : pantry) {
			Float threshold = ing.getWeight() * ing.getThreshold();

				if (ing.getWeight() <= threshold ) {
					System.out.println("Threshold alert: " + ing.getName());
					thresholdAlert.add(ing);
			}
		}
		// to be replaced with functional alerting (push to new array field to add to a shopping list tab?)
		System.out.println(thresholdAlert);
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

	public ArrayList<Ingredient> getRestockList() {
		return restockList;
	}

	public void setRestockList(ArrayList<Ingredient> restockList) {
		this.restockList = restockList;
	}

	// public ArrayList<CustomRecipe> getFavouriteRecipes() {
	// 	return favouriteRecipes;
	// }
	
	// public void setFavouriteRecipes(ArrayList<CustomRecipe> favouriteRecipes) {
	// 	this.favouriteRecipes = favouriteRecipes;
	// }

}
