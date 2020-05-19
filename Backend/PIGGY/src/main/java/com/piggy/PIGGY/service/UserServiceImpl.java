package com.piggy.PIGGY.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.piggy.PIGGY.entity.User;
import com.piggy.PIGGY.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	
	private UserRepository uRepo;
	
	public UserServiceImpl(UserRepository uRepo) {
		this.uRepo = uRepo;
	}

	@Override
	public User findById(Long uId) {
		return uRepo.findById(uId).orElseThrow(NoSuchElementException::new);
	}
	
	@Override
	public User findByNickname(String nickname) {
		return uRepo.findByNickname(nickname);
	}

	@Override
	public List<User> findAll() {
		return uRepo.findAll();
	}

	@Override
	public void deleteById(Long uId) {
		uRepo.deleteById(uId);
	}
	
}
