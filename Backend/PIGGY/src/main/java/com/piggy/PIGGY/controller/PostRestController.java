package com.piggy.PIGGY.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.piggy.PIGGY.entity.Post;
import com.piggy.PIGGY.service.PostService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(tags = { "Post" }, description = "Post 정보 REST API")
@RequestMapping(value = "/post")
@CrossOrigin(origins = "*")
public class PostRestController {

	@Autowired
	private PostService pService;
	
	@ApiOperation(value = "Post 생성")
	@PostMapping("/create/{uid}")
	public ResponseEntity<Object> createPost(@RequestParam Long uId, @RequestBody Post inputPost){
		try {
			Post post = pService.create(uId, inputPost);
			return new ResponseEntity<Object>(post, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "모든 Post 불러오기")
	@GetMapping("/findAll")
	public ResponseEntity<Object> findAll(){
		try {
			List<Post> posts = pService.findAll();
			return new ResponseEntity<Object>(posts, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "해당 Post 불러오기")
	@GetMapping("/findById/{pId}")
	public ResponseEntity<Object> findById(@RequestParam Long pId){
		try {
			Post post = pService.findById(pId);
			return new ResponseEntity<Object>(post, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "해당 유저의 모든 Post 불러오기")
	@GetMapping("/findByUser/{pId}")
	public ResponseEntity<Object> findByUser(@RequestParam Long uId){
		try {
			List<Post> posts = pService.findByUser(uId);
			return new ResponseEntity<Object>(posts, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "해당 피드 업데이트")
	@PutMapping("/update/{pId}")
	public ResponseEntity<Object> update(@RequestParam Long pId){
		try {
			Post post = pService.update(pId);
			return new ResponseEntity<Object>(post, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "해당 유저의 모든 Post 불러오기")
	@DeleteMapping("/delete/{pId}")
	public ResponseEntity<Object> delete(@RequestParam Long pId){
		try {
			pService.delete(pId);
			return new ResponseEntity<Object>("삭제완료", HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
}
