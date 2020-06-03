package com.piggy.PIGGY.controller;

import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.piggy.PIGGY.dto.PostImageDto;
import com.piggy.PIGGY.dto.PostOutputDto;
import com.piggy.PIGGY.dto.ResultDto;
import com.piggy.PIGGY.dto.SignupDto;
import com.piggy.PIGGY.dto.UserDto;
import com.piggy.PIGGY.entity.Post;
import com.piggy.PIGGY.entity.User;
import com.piggy.PIGGY.service.FileService;
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
	
	@Autowired
	private FileService fileService;
	
	@ApiImplicitParams({
			@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "회원 단건 조회")
	@GetMapping("/findUser")
	public ResponseEntity<Object> findUser() {
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
	@DeleteMapping("/deleteUser")
	public ResponseEntity<Object> deleteUser() {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String uId = authentication.getName();
			uService.deleteById(Long.parseLong(uId));
			return new ResponseEntity<Object>(new ResultDto(true, 1, "삭제되었습니다."), HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiImplicitParams({
		@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "비밀번호 확인")
	@GetMapping("/checkPassword")
	public ResponseEntity<Object> checkPassword(@RequestBody String password) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String uId = authentication.getName();
			
			if(uService.checkPassword(Long.parseLong(uId), password))
				return new ResponseEntity<Object>(new ResultDto(true, 1, "비밀번호가 확인되었습니다."), HttpStatus.OK);
			else
				return new ResponseEntity<Object>(new ResultDto(false, -1, "비밀번호가 틀렸습니다"), HttpStatus.ACCEPTED);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "비밀번호수정")
	@PutMapping("/updatePassword")
	public ResponseEntity<Object> updatePassword(@RequestParam String email, @RequestBody String password) {
		try {
			User user = uService.findByEmail(email);
			if (!user.getEmailCertify().equals("Y"))
				return new ResponseEntity<Object>(new ResultDto(false, -1, "이메일 인증이 되지 않은 유저"), HttpStatus.OK);
			
			user = uService.updatePassword(user.getUId(), password);
			UserDto output = MapperUtils.map(user, UserDto.class);
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "회원 정보 수정, (이미지, 닉네임)")
	@PutMapping("/update/{uId}")
	public ResponseEntity<Object> update(@PathVariable Long uId, @RequestBody SignupDto dto) {
		try {
			User user = uService.update(dto);
			UserDto output = MapperUtils.map(user, UserDto.class);
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "해당 유저 이미지 수정")
	@PostMapping("/uploadImage/{uId}")
	public ResponseEntity<Object> postImage(@PathVariable Long uId , @RequestParam("file") MultipartFile file) {
		try {
			Map<String, Object> responseImage = fileService.uploadImage(file, "user");
			User origin = uService.findById(uId);
			String originImage = origin.getImageName();
			String newImageName = responseImage.get("imageName").toString();
			if(originImage != null && !originImage.equals(newImageName)) {
				fileService.deleteImage(originImage);
			}
			User user = uService.updateImage(uId, responseImage.get("image").toString(), newImageName);
			UserDto output = MapperUtils.map(user, UserDto.class);
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(e.getMessage(), HttpStatus.OK);
		}
	}
}
