package com.piggy.PIGGY.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.piggy.PIGGY.dto.UserDto;
import com.piggy.PIGGY.entity.User;
import com.piggy.PIGGY.service.UserService;
import com.piggy.PIGGY.util.MapperUtils;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(tags = { "User" }, description = "User 정보 REST API")
@RequestMapping(value = "/user")
@CrossOrigin(origins = "*")
public class UserRestController {

	@Autowired
	private UserService uService;
	
	@ApiImplicitParams({
			@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "회원 단건 조회")
	@GetMapping("/findById")
	public ResponseEntity<Object> findById() {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String uId = authentication.getName();
			UserDetails user = uService.loadUserByUsername(uId);
			UserDto output = MapperUtils.map(user, UserDto.class);
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "email로 회원 조회")
	@GetMapping("/findByEmail")
	public ResponseEntity<Object> findByEmail(@RequestParam String email) {
		try {
			User user = uService.findByEmail(email);
			UserDto output = MapperUtils.map(user, UserDto.class);
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiOperation(value = "전체 회원 조회")
	@GetMapping("/findAll")
	public ResponseEntity<Object> findAll() {
		try {
			List<User> user = uService.findAll();
			List<UserDto> output = MapperUtils.mapAll(user, UserDto.class);
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiImplicitParams({
		@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "해당 회원 삭제")
	@DeleteMapping("/deleteById")
	public ResponseEntity<Object> deleteById() {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String uId = authentication.getName();
			uService.deleteById(Long.parseLong(uId));
			return new ResponseEntity<Object>("삭제되었습니다.", HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiImplicitParams({
		@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "회원 정보 수정")
	@PutMapping("/updatePassword/{password}")
	public ResponseEntity<Object> update(@RequestParam String password) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String uId = authentication.getName();
			User user = uService.updatePassword(Long.parseLong(uId), password);
			UserDto output = MapperUtils.map(user, UserDto.class);
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
}
