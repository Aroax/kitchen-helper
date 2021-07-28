package com.app.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import com.app.model.Ingredient;
import com.app.model.User;

@Repository
public class UserDAO {
	@Autowired
	private MongoTemplate mongoTemplate;
	
	public List<User> findAll(){
		return mongoTemplate.findAll(User.class);
	}
	
	public void save(User user) {
		mongoTemplate.insert(user);
	}
	
	public void saveAll(List<User> users) {
		mongoTemplate.insertAll(users);
	}
	
	public User findById(final String id) {
		return mongoTemplate.findById(id, User.class);
	}
	
//	public void addToPantry(String id, Ingredient ingr) {
//		mongoTemplate.update({
//			_id: id
//		  },
//		  {
//		    $push:
//		    {
//		      shoppingList:
//		      {
//		        ingr.name
//				ingr.imageUrl
//		      }
//		    }
//		});
//	}
	
	
	
	
}
