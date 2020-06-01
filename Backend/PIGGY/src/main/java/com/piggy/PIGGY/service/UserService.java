package com.piggy.PIGGY.service;

import java.util.List;
import java.util.Map;

import org.omg.CORBA.UserException;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.piggy.PIGGY.dto.SignupDto;
import com.piggy.PIGGY.dto.UserDto;
import com.piggy.PIGGY.entity.User;

public interface UserService extends UserDetailsService{
	
	public User signup(SignupDto dto);
	
	public Map<String, String> signin(String email, String password);
	
	public boolean emailDuplicateCheck(String email);
	
	public User findByEmail(String eamil);
	 
	public User findByNickname(String nickname);
	
	public List<User> findAll();
	
	public void updateEmail(String email, String massage);
	
	public User updatePassword(Long uId, String password);
	
	public void deleteById(Long uId);
	
	public User update(SignupDto dto);
}
