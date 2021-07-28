package com.app.controller;

import java.util.List;
//import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.User;
import com.app.repository.UserRepository;

@RestController
public class UserController {
	
	 public UserController(UserRepository userRepository) {
	        this.userRepository = userRepository;
	    }
	
	@Autowired
	private UserRepository userRepository;

	@PostMapping("/users")
	public void addUsers(@RequestBody List<User> users) {
		userRepository.saveAll(users);
	}

	
	@GetMapping("/users")
	public List<User> findUsers() {
		return userRepository.findAll();
	}
	
	@GetMapping("/users/{id}")
	public User findUserById(@PathVariable final String id) {
		return userRepository.findById(id).orElseGet(User::new);
	}

}
