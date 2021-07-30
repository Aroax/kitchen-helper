package com.app.model;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Ingredient {
	
	private String foodId;
	
	private String name;
	
	private String foodCategory;
	
	private String location;
	
	private String unit;
	
	private Float quantity;
	
	private Float weight;
	
	private String imageUrl;
	
	private Float threshold;
	
	private String expiry;
	
	private String[] health;
	
	private String[] diet;
	
	private Float weightNeeded;
	
	

	public String getFoodId() {
		return foodId;
	}

	public void setFoodId(String foodId) {
		this.foodId = foodId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFoodCategory() {
		return foodCategory;
	}

	public void setFoodCategory(String foodCategory) {
		this.foodCategory = foodCategory;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public Float getQuantity() {
		return quantity;
	}

	public void setQuantity(Float quantity) {
		this.quantity = quantity;
	}

	public Float getWeight() {
		return weight;
	}

	public void setWeight(Float weight) {
		this.weight = weight;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Float getThreshold() {
		return threshold;
	}

	public void setThreshold(Float threshold) {
		this.threshold = threshold;
	}

	public String getExpiry() {
		return expiry;
	}

	public void setExpiry(String expiry) {
		this.expiry = expiry;
	}

	public String[] getHealth() {
		return health;
	}

	public void setHealth(String[] health) {
		this.health = health;
	}

	public String[] getDiet() {
		return diet;
	}

	public void setDiet(String[] diet) {
		this.diet = diet;
	}

	public Float getWeightNeeded() {
		return weightNeeded;
	}

	public void setWeightNeeded(Float weightNeeded) {
		this.weightNeeded = weightNeeded;
	}
	
	

}
