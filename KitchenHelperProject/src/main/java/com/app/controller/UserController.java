package com.app.controller;

import java.util.List;
import java.util.ArrayList;
//import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.User;
import com.app.model.Ingredient;
import com.app.repository.UserRepository;

@RestController
public class UserController {
	
	//  public UserController(UserRepository userRepository) {
	//         this.userRepository = userRepository;
	//     }
	
	@Autowired
	private UserRepository userRepository;

  @GetMapping("/")
	public String index() {
		return "index";
	}

	@PostMapping("/users")
	public void addUser(@RequestBody User user) {
		userRepository.save(user);
	}

	
	@GetMapping("/users")
	public List<User> findUsers() {
		return userRepository.findAll();
	}
	
	@GetMapping("/users/{id}")
	public User findUserById(@PathVariable final String id) {
		return userRepository.findById(id).orElseGet(User::new);
	}

  @PatchMapping("/users/{id}/pantry/add")
	public void addToPantry(@PathVariable final String id, @RequestBody Ingredient ingredient) {
    User user = userRepository.findById(id).orElseGet(User::new);
    user.getPantry().add(ingredient);
		userRepository.save(user);
	}

  @PatchMapping("/users/{id}/pantry/remove")
	public void removeFromPantry(@PathVariable final String id, @RequestBody Ingredient ingredient) {
    User user = userRepository.findById(id).orElseGet(User::new);
    ArrayList<Ingredient> pantry = user.getPantry();
    int index = -1;

    for (Ingredient ing : pantry) {
        if (ing.getName().equals(ingredient.getName())) {
            index = pantry.indexOf(ing);
        }
    }

    user.getPantry().remove(index);

		userRepository.save(user);
	}

  @PatchMapping("/users/{id}/shopping-list/add")
	public void addToShoppingList(@PathVariable final String id, @RequestBody Ingredient ingredient) {
    User user = userRepository.findById(id).orElseGet(User::new);
    user.getShoppingList().add(ingredient);
		userRepository.save(user);
	}

  @PatchMapping("/users/{id}/shopping-list/remove")
	public void removeFromShoppingList(@PathVariable final String id, @RequestBody Ingredient ingredient) {
    User user = userRepository.findById(id).orElseGet(User::new);
    ArrayList<Ingredient> shoppingList = user.getShoppingList();
    int index = -1;
    
    for (Ingredient ing : shoppingList) {
        if (ing.getName().equals(ingredient.getName())) {
            index = shoppingList.indexOf(ing);   
        }
    }

    user.getShoppingList().remove(index);

		userRepository.save(user);
	}
}
