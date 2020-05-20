package com.piggy.PIGGY.service;

import java.util.List;

import com.piggy.PIGGY.entity.Post;

public interface PostService {

	public Post create(Long uId, Post post);
	
	public List<Post> findAll();
	
	public Post findById(Long pId);
	
	public List<Post> findByUser(Long uId);
	
	public Post update(Long pId);
	
	public void delete(Long pId);
	
}
