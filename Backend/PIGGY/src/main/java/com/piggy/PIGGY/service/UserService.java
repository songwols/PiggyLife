package com.piggy.PIGGY.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.piggy.PIGGY.dto.SignupDto;
import com.piggy.PIGGY.entity.User;

public interface UserService extends UserDetailsService{
	
	public User singup(SignupDto dto);
	
	public List<String> signin(String email, String password);
	
	public boolean emailDuplicateCheck(String email);
	
	public User findByEmail(String eamil);
	
	public User findByNickname(String nickname);
	
	public List<User> findAll();
	
	public void updateEmail(String email);
	
	public void deleteById(Long uId);
}
