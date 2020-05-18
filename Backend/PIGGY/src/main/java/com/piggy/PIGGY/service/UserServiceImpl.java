package com.piggy.PIGGY.service;

import org.springframework.stereotype.Service;

import com.piggy.PIGGY.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	
	private UserRepository uRepo;
	
	public UserServiceImpl(UserRepository uRepo) {
		this.uRepo = uRepo;
	}
	
}
