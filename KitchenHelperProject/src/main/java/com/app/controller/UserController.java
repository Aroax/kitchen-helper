package com.app.controller;

import java.util.List;
import java.util.ArrayList;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.User;
import com.app.model.Ingredient;
import com.app.model.CustomRecipe;
import com.app.repository.UserDAO;
import com.app.repository.UserRepository;
// import com.app.utilities.*;

@RestController
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserDAO userDAO;

	@PostMapping("/users")
	public void addUser(@RequestBody User user) {
		userRepository.save(user);
	}

	@GetMapping("/users")
	public List<User> findUsers() {
		return userDAO.findAll();
	}
	
	@GetMapping("/users/{id}")
	public User findUserById(@PathVariable final String id) {
		return userRepository.findById(id).orElseGet(User::new);
	}
	
	@GetMapping("/users/name/{displayName}")
	public User findUserByDisplayName(@PathVariable final String displayName) {
		return userDAO.findByDisplayName(displayName);
	}

  @PatchMapping("/users/{id}/pantry/add")
	public void addToPantry(@PathVariable final String id, @RequestBody Ingredient ingredient) {
    User user = userRepository.findById(id).orElseGet(User::new);
    if (user.isIngredientInPantry(ingredient.getFoodId())) {
    	user.increasePantryIngredientAmount(ingredient.getFoodId(), ingredient.getWeight());
    }
    else {
    	user.getPantry().add(ingredient);
    }
		
    userRepository.save(user);
	}
  

  @PatchMapping("/users/{id}/pantry/remove")
	public void removeFromPantry(@PathVariable final String id, @RequestBody Ingredient ingredient) {
    User user = userRepository.findById(id).orElseGet(User::new);
    ArrayList<Ingredient> pantry = user.getPantry();
    int index = -1;

    for (Ingredient ing : pantry) {
        if (ing.getFoodId().equals(ingredient.getFoodId())) {
            index = pantry.indexOf(ing);
        }
    }

    user.getPantry().remove(index);

		userRepository.save(user);
	}
  
  @PatchMapping("/users/{id}/pantry/add-from-shopping-list")
  public void addAllToPantry(@PathVariable final String id, @RequestBody ArrayList<Ingredient> ingredientList) {
	  User user = userRepository.findById(id).orElseGet(User::new);

	  for (Ingredient ingredient : ingredientList) {
		  System.out.println(ingredient.getWeightNeeded());
		  ingredient.setWeight(ingredient.getWeightNeeded());
		  System.out.println(ingredient.getWeight());

		  if (user.isIngredientInPantry(ingredient.getFoodId())) {
			  user.increasePantryIngredientAmount(ingredient.getFoodId(), ingredient.getWeight());
		  }
		  else {
			  user.getPantry().add(ingredient);
		  }
	  }
	  user.setShoppingList(new ArrayList<Ingredient>());
	  userRepository.save(user);
  }
  
  
  
  @PatchMapping("/users/{id}/pantry/subtract-by-recipe")
  public void subtractAllFromPantry(@PathVariable final String id, @RequestBody CustomRecipe recipe) {
	  System.out.println(recipe);
	  recipe.showStats();
	  User user = userRepository.findById(id).orElseGet(User::new);

	  for (Ingredient ingredient : recipe.getIngredients()) {
		  user.decreasePantryIngredientAmount(ingredient.getFoodId(), ingredient.getWeightNeeded());
	  }
	  user.getRecentRecipes().add(recipe);
	  user.pantrySpringClean();
	  userRepository.save(user);
  }
  
  @PatchMapping("/users/{id}/shopping-list/add")
	public void addToShoppingList(@PathVariable final String id, @RequestBody Ingredient ingredient) {
    User user = userRepository.findById(id).orElseGet(User::new);
    user.getShoppingList().add(ingredient);
		userRepository.save(user);
	}
  
  @PatchMapping("/users/{id}/shopping-list/add-from-restock")
 	public void convertRestockToShoppingList(@PathVariable final String id, @RequestBody Ingredient ingredient) {
     User user = userRepository.findById(id).orElseGet(User::new);
     user.getShoppingList().add(ingredient);
     
     ArrayList<Ingredient> restockList = user.getRestockList();
     int index = -1;

     for (Ingredient ing : restockList) {
         if (ing.getFoodId().equals(ingredient.getFoodId())) {
             index = restockList.indexOf(ing);
         }
     }

     user.getRestockList().remove(index);
     
 		userRepository.save(user);
 	}
  
  @PatchMapping("/users/{id}/shopping-list/add-multiple")
 	public void addAllToShoppingList(@PathVariable final String id, @RequestBody ArrayList<Ingredient> ingredients) {
     User user = userRepository.findById(id).orElseGet(User::new);
//     ArrayList<Ingredient> shoppingList = user.getShoppingList();
     for (Ingredient ingredient : ingredients) {
		  System.out.println(ingredient.getWeightNeeded());
		  ingredient.setWeight(ingredient.getWeightNeeded());
		  System.out.println(ingredient.getWeight());

		  if (user.isIngredientOnShoppingList(ingredient.getFoodId())) {
			  user.increaseShoppingListIngredientAmount(ingredient.getFoodId(), ingredient.getWeightNeeded());
		  }
		  else {
			  user.getShoppingList().add(ingredient);
		  }
	  }
//     user.getShoppingList().addAll(ingredients);
 		userRepository.save(user);
 	}

  @PatchMapping("/users/{id}/shopping-list/remove")
	public void removeFromShoppingList(@PathVariable final String id, @RequestBody Ingredient ingredient) {
    User user = userRepository.findById(id).orElseGet(User::new);
    ArrayList<Ingredient> shoppingList = user.getShoppingList();
    int index = -1;
    
    for (Ingredient ing : shoppingList) {
        if (ing.getFoodId().equals(ingredient.getFoodId())) {
            index = shoppingList.indexOf(ing);   
        }
    }

    user.getShoppingList().remove(index);

		userRepository.save(user);
	}
	
  
  @PatchMapping("/users/{id}/recipes/draft/add")
	public void addToDraftRecipe(@PathVariable final String id, @RequestBody Ingredient ingredient) {
  User user = userRepository.findById(id).orElseGet(User::new);
  System.out.println(ingredient);
  user.getDraftRecipe().add(ingredient);
		userRepository.save(user);
	}

	@PatchMapping("/users/{id}/recipes/draft/remove")
	public void removeFromDraftRecipe(@PathVariable final String id, @RequestBody Ingredient ingredient) {
    User user = userRepository.findById(id).orElseGet(User::new);
    ArrayList<Ingredient> draftRecipe = user.getDraftRecipe();
    int index = -1;
    
    for (Ingredient ing : draftRecipe) {
        if (ing.getFoodId().equals(ingredient.getFoodId())) {
            index = draftRecipe.indexOf(ing);   
        }
    }

    user.getDraftRecipe().remove(index);

		userRepository.save(user);
	}

	@PatchMapping("/users/{id}/recipes/custom/add")
	public void addToCustomRecipes(@PathVariable final String id, @RequestBody CustomRecipe recipe) {
  User user = userRepository.findById(id).orElseGet(User::new);
  ObjectId objectId = new ObjectId();
  recipe.setRecipeId(objectId.toString());
  user.getCustomRecipes().add(recipe);
  ArrayList<Ingredient> clearDrafts = new ArrayList<Ingredient>();
  user.setDraftRecipe(clearDrafts);
  
		userRepository.save(user);
	}

	@PatchMapping("/users/{id}/recipes/custom/remove")
	public void removeFromCustomRecipes(@PathVariable final String id, @RequestBody CustomRecipe recipe) {
    User user = userRepository.findById(id).orElseGet(User::new);
    ArrayList<CustomRecipe> customRecipes = user.getCustomRecipes();
    int index = -1;
    
    for (CustomRecipe rep : customRecipes) {
        if (rep.getRecipeId().equals(recipe.getRecipeId())) {
            index = customRecipes.indexOf(rep);   
        }
    }

    user.getCustomRecipes().remove(index);

		userRepository.save(user);
	}

	@PatchMapping("/users/{id}/recipes/saved/add")
	public void addToSavedRecipes(@PathVariable final String id, @RequestBody CustomRecipe recipe) {
	User user = userRepository.findById(id).orElseGet(User::new);
  	user.getSavedRecipes().add(recipe);
	userRepository.save(user);
	}

	@PatchMapping("/users/{id}/recipes/saved/remove")
	public void removeFromSavedRecipes(@PathVariable final String id, @RequestBody CustomRecipe recipe) {
    User user = userRepository.findById(id).orElseGet(User::new);
    ArrayList<CustomRecipe> savedRecipes = user.getSavedRecipes();
    int index = -1;
    
    for (CustomRecipe rep : savedRecipes) {
        if (rep.getRecipeId().equals(recipe.getRecipeId())) {
            index = savedRecipes.indexOf(rep);   
        }
    }

    user.getSavedRecipes().remove(index);

		userRepository.save(user);
	}

	@PatchMapping("/users/{id}/recipes/favourites/add")
	public void addToFavouriteRecipes(@PathVariable final String id, @RequestBody CustomRecipe recipe) {
	User user = userRepository.findById(id).orElseGet(User::new);
  	user.getFavouriteRecipes().add(recipe);
	userRepository.save(user);
	}

	// @PatchMapping("/users/{id}/recipes/favourite-recipes/remove") 
	// 	public void removeFromFavourites(@PathVariable final String id, @RequestBody CustomRecipe recipe) {
	//     User user = userRepository.findById(id).orElseGet(User::new);
	// 	ArrayList<CustomRecipe> favouriteList = user.getFavouriteRecipes();
	// 	int index = -1;
		
	// 	for (CustomRecipe rec : favouriteList) {
	// 		if (rec.getRecipeId().equals(recipe.getRecipeId())) {
	// 			index = favouriteList.indexOf(rec);   
	// 		}
	// 	}

	// 	user.getFavouriteRecipes().remove(index);

		// 	userRepository.save(user);
		// }
	
	@PatchMapping("/users/{id}/mealplanner/add")
	public void addRecipetoMealPlanner(@PathVariable final String id, @RequestBody CustomRecipe recipe) {
		User user = userRepository.findById(id).orElseGet(User::new);
		user.getMealPlanner().add(recipe);
		userRepository.save(user);
	}
	
	@PatchMapping("/users/{id}/mealplanner/remove") 
	public void removeRecipeFromMealPlanner(@PathVariable final String id, @RequestBody CustomRecipe recipe) {
    User user = userRepository.findById(id).orElseGet(User::new);
	ArrayList<CustomRecipe> mealPlanner = user.getMealPlanner();
	int index = -1;
	
	for (CustomRecipe rec : mealPlanner) {
		if (rec.getRecipeId().equals(recipe.getRecipeId())) {
			index = mealPlanner.indexOf(rec);   
		}
	}

	user.getMealPlanner().remove(index);

		userRepository.save(user);
	}

	@PatchMapping("/users/{id}/mealplanner/remove-all") 
	public void removeRecipeFromMealPlanner(@PathVariable final String id, @RequestBody ArrayList<CustomRecipe> recipes) {
	    User user = userRepository.findById(id).orElseGet(User::new);
		user.setMealPlanner(new ArrayList<CustomRecipe>());

			userRepository.save(user);
		}
	
	@PatchMapping("/users/{id}/mealplanner/update-recipe") 
	public void updateRecipeFromMealPlanner(@PathVariable final String id, @RequestBody CustomRecipe recipe) {
    User user = userRepository.findById(id).orElseGet(User::new);
	ArrayList<CustomRecipe> mealPlanner = user.getMealPlanner();
	int index = -1;
	
	for (CustomRecipe rec : mealPlanner) {
		if (rec.getRecipeId().equals(recipe.getRecipeId())) {
			index = mealPlanner.indexOf(rec);   
		}
	}

	user.getMealPlanner().remove(index);
	user.getMealPlanner().add(recipe);

		userRepository.save(user);
	}
	
	@PatchMapping("/users/{id}/mealplanner/cook")
	  public void cookMealPlannerRecipe(@PathVariable final String id, @RequestBody CustomRecipe recipe) {
		  System.out.println(recipe);
		  recipe.showStats();
		  User user = userRepository.findById(id).orElseGet(User::new);
		  ArrayList<CustomRecipe> mealPlanner = user.getMealPlanner();
		  int index = -1;
		  
		  for (Ingredient ingredient : recipe.getIngredients()) {
			  user.decreasePantryIngredientAmount(ingredient.getFoodId(), ingredient.getWeightNeeded());
		  }
		    
		  for (CustomRecipe rec : mealPlanner) {
			if (rec.getRecipeId().equals(recipe.getRecipeId())) {
				index = mealPlanner.indexOf(rec);
				System.out.println("recipe index is: " + index);
			}
		  }

		  user.getMealPlanner().remove(index);
		  user.getRecentRecipes().add(recipe);
		  user.pantrySpringClean();
		  userRepository.save(user);
	  }
	
	@PatchMapping("/users/{id}/restock-list/remove")
	public void removeFromRestockList(@PathVariable final String id, @RequestBody Ingredient ingredient) {
    User user = userRepository.findById(id).orElseGet(User::new);
    ArrayList<Ingredient> restockList = user.getRestockList();
    int index = -1;

    for (Ingredient ing : restockList) {
        if (ing.getFoodId().equals(ingredient.getFoodId())) {
            index = restockList.indexOf(ing);
        }
    }

    user.getRestockList().remove(index);

		userRepository.save(user);
	}
	

	@PatchMapping("/users/{id}/restock-list/remove-all")
	public void removeAllFromRestockList(@PathVariable final String id, @RequestBody ArrayList<Ingredient> ingredients) {
    User user = userRepository.findById(id).orElseGet(User::new);

    user.setRestockList(new ArrayList<Ingredient>());

    userRepository.save(user);
	}
	
}
