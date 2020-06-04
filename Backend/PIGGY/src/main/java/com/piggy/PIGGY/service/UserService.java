package com.piggy.PIGGY.service;

import java.util.List;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.piggy.PIGGY.dto.SigninDto;
import com.piggy.PIGGY.dto.SignupDto;
import com.piggy.PIGGY.entity.User;

public interface UserService extends UserDetailsService{
	
	public User signup(SignupDto dto);
	
	public Map<String, Object> signin(SigninDto dto);
	
	public boolean emailDuplicateCheck(String email);
	
	public User findByEmail(String eamil);
	 
	public User findByNickname(String nickname);
	
	public List<User> findAll();
	
	public void updateEmail(String email, String massage);
	
	public Boolean checkPassword(Long uId, String password);
	
	public User updatePassword(Long uId, String password);
	
	public void deleteById(Long uId);
	
	public User update(SignupDto dto);

	public User updateImage(Long uId, String image, String imageName);
	
	public User findById(Long uId);
	
}
