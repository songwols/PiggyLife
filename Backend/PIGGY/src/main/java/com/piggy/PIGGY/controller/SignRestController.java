package com.piggy.PIGGY.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.piggy.PIGGY.dto.OutputDto;
import com.piggy.PIGGY.dto.SignupDto;
import com.piggy.PIGGY.entity.User;
import com.piggy.PIGGY.security.JwtTokenProvider;
import com.piggy.PIGGY.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(tags = { "Sign" }, description = "Sign 정보 REST API")
@RequestMapping(value = "/sign")
@CrossOrigin(origins = "*")
public class SignRestController {
	
	@Autowired
	private UserService uService;
	
	private JwtTokenProvider jwtProvider;
	
	private PasswordEncoder passwordEncoder;

	@ApiOperation(value = "회원가입")
	@PostMapping("/signup")
	public ResponseEntity<Object> signup(@RequestBody SignupDto input) {
		try {
			if (uService.emailDuplicateCheck(input.getEmail())) 
				return new ResponseEntity<Object>("중복된 이메일 입니다.", HttpStatus.ACCEPTED);
			
			input.setPassword(passwordEncoder.encode(input.getPassword()));
			
			User user = uService.singup(input);
			OutputDto output = new OutputDto(user, "생성완료");
			return new ResponseEntity<Object>(output, HttpStatus.CREATED);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "로그인")
	@PostMapping("/signin")
	public ResponseEntity<Object> signin(@RequestParam String email, @RequestParam String password) {
		try {
			User user = uService.signin(email, password);
			if (!passwordEncoder.matches(password, user.getPassword()))
				return new ResponseEntity<Object>("password가 틀렸습니다.", HttpStatus.OK);
			
			List<String> result = new ArrayList<>();
			result.add(jwtProvider.createToken(user.getUsername(), user.getRoles()));
			result.add(user.getUId().toString());
			result.add(user.getEmail());
			result.add(user.getNickname());
			
			OutputDto output = new OutputDto(result, "로그인");
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "이메일 중복 검사")
	@GetMapping(value = "/checkEmail")
	public ResponseEntity<Object> checkDuplicateEmail(@RequestParam String email) {
		if (uService.emailDuplicateCheck(email)) {
			return new ResponseEntity<Object>("중복된 이메일 입니다.", HttpStatus.ACCEPTED);
		} else {
			return new ResponseEntity<Object>("사용 가능한 이메일 입니다.", HttpStatus.OK);
		}
	}
	
	
	
	
}
