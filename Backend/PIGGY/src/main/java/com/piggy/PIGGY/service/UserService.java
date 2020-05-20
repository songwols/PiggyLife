package com.piggy.PIGGY.service;

import java.util.List;

import com.piggy.PIGGY.entity.User;

public interface UserService {
	
	public User findById(Long uId);
	
	public User findByNickname(String nickname);
	
	public List<User> findAll();
	
	public void deleteById(Long uId);
}
