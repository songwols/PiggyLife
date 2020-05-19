package com.piggy.PIGGY.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.piggy.PIGGY.entity.Post;
import com.piggy.PIGGY.entity.User;


public interface PostRepository extends JpaRepository<Post, Long>{
	
	List<Post> findByUser(User user);

}
