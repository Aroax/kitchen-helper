package com.app.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

// import com.app.model.Ingredient;
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
	
	public User findByDisplayName(final String displayName) {
		Query query = new Query();
		query.addCriteria(Criteria.where("displayName").is(displayName));
		return mongoTemplate.findOne(query, User.class);
	}
	
	public List<User> findManyByDisplayName(final String displayName) {
		Query query = new Query();
		query.addCriteria(Criteria.where("displayName").is(displayName));
		List<User> users = mongoTemplate.find(query, User.class);
		return users;
	}






}
