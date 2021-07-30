package com.app.model;

import java.util.ArrayList;
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
	
	private ArrayList<Ingredient> myRecipes;
	
//	private User() {};
//	
//	public User(String displayName, String email, String password) {
//		this.displayName = displayName;
//		this.email = email;
//		this.password = password;
//	}

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

	public ArrayList<Ingredient> getMyRecipes() {
		// TODO Auto-generated method stub
		return myRecipes;
	}
	
	public void setMyRecipes(ArrayList<Ingredient> myRecipes) {
		this.myRecipes = myRecipes;
	}

}
