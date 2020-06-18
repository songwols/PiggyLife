package com.piggy.PIGGY.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.piggy.PIGGY.dto.UserRequestDto;
import com.piggy.PIGGY.entity.User;
import com.piggy.PIGGY.entity.UserRequest;
import com.piggy.PIGGY.repository.UserRepository;
import com.piggy.PIGGY.repository.UserRequestRepository;
import com.piggy.PIGGY.util.MapperUtils;

@Service
public class RequestServiceImpl implements RequestService {

	@Autowired
	private UserRequestRepository urRepo;
	
	@Autowired
	private UserRepository uRepo;
	
	public void create(Long uId, String name, String address) {
		User user = uRepo.findById(uId).orElseThrow(NoSuchElementException::new);
		urRepo.save(UserRequest.builder()
				.user(user)
				.name(name)
				.address(address)
				.build()
				);
	}
	
	@Override
	public List<UserRequestDto> findAll() {
		return MapperUtils.mapAll(urRepo.findAll(), UserRequestDto.class);
	}
	
	@Override
	public List<UserRequestDto> findByUser(Long uId) {
		User user = uRepo.findById(uId).orElseThrow(NoSuchElementException::new);
		return MapperUtils.mapAll(urRepo.findByUser(user), UserRequestDto.class);
	}

	@Override
	public void delete(Long urId) {
		urRepo.deleteById(urId);
	}
	
	
	
	
}
