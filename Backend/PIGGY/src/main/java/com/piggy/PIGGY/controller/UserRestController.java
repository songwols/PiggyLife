package com.piggy.PIGGY.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.piggy.PIGGY.entity.User;
import com.piggy.PIGGY.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping(value="/user")
public class UserRestController {
	
	@Autowired
	private UserService uService;
	
	@GetMapping("/findById/{uId}")
	public ResponseEntity<Object> findById(@PathVariable Long uId){
		try {
			log.trace("UserRestController - findById");
			UserDetails user = uService.loadUserByUsername(uId.toString());
			return new ResponseEntity<Object>(user, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@GetMapping("/findByNickname")
	public ResponseEntity<Object> findByNickname(@RequestParam String nickname){
		try {
			log.trace("UserRestController - findByNickname");
			User user = uService.findByNickname(nickname);
			return new ResponseEntity<Object>(user, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@GetMapping("/findAll")
	public ResponseEntity<Object> findAll(){
		try {
			log.trace("UserRestController - findAll");
			List<User> user = uService.findAll();
			return new ResponseEntity<Object>(user, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@DeleteMapping("/deleteById/{uId}")
	public ResponseEntity<Object> deleteById(@PathVariable Long uId){
		try {
			log.trace("UserRestController - deleteById");
			uService.deleteById(uId);
			return new ResponseEntity<Object>(1, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
}
