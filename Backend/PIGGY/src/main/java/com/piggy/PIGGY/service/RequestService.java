package com.piggy.PIGGY.service;

import java.util.List;

import com.piggy.PIGGY.dto.UserRequestDto;

public interface RequestService {

	public void create(Long uId, String name, String address);
	
	public List<UserRequestDto> findAll();
	
	public List<UserRequestDto> findByUser(Long uId);
	
	public void delete(Long urId);
	
}
