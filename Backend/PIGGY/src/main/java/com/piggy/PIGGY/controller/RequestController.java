package com.piggy.PIGGY.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.piggy.PIGGY.dto.ResultDto;
import com.piggy.PIGGY.dto.UserRequestDto;
import com.piggy.PIGGY.service.RequestService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(tags = { "Request" }, description = "관리자 정보 REST API")
@RequestMapping(value = "/Request")
@CrossOrigin(origins = "*")
public class RequestController {

	@Autowired
	private RequestService requestService;

	@ApiOperation(value = "유저 요청 생성")
	@PostMapping("/create/{uId}")
	public ResponseEntity<Object> create(@PathVariable Long uId, @RequestParam String name, @RequestParam String address) {
		try {
			requestService.create(uId, name, address);
			ResultDto output = new ResultDto(true, 1, "생성성공");
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			ResultDto output = new ResultDto(false, -1, "생성실패", e.getMessage());
			return new ResponseEntity<Object>(output, HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation(value = "유저의 모든 요청 불러오기")
	@GetMapping("/findAll")
	public ResponseEntity<Object> findAll() {
		try {
			List<UserRequestDto> dtos = requestService.findAll();
			return new ResponseEntity<Object>(dtos, HttpStatus.OK);
		} catch (Exception e) {
			ResultDto output = new ResultDto(false, -1, "불러오기 실패", e.getMessage());
			return new ResponseEntity<Object>(output, HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation(value = "유저의 모든 요청 불러오기")
	@GetMapping("/findByUser/{uId}")
	public ResponseEntity<Object> findByUser(@PathVariable Long uId) {
		try {
			List<UserRequestDto> dtos = requestService.findByUser(uId);
			return new ResponseEntity<Object>(dtos, HttpStatus.OK);
		} catch (Exception e) {
			ResultDto output = new ResultDto(false, -1, "불러오기 실패", e.getMessage());
			return new ResponseEntity<Object>(output, HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation(value = "유저 요청 삭제")
	@DeleteMapping("/delete/{urId}")
	public ResponseEntity<Object> delete(@PathVariable Long urId) {
		try {
			requestService.delete(urId);
			ResultDto output = new ResultDto(true, 1, "삭제 성공");
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			ResultDto output = new ResultDto(false, -1, "삭제 실패", e.getMessage());
			return new ResponseEntity<Object>(output, HttpStatus.BAD_REQUEST);
		}
	}

}
