package com.piggy.PIGGY.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.piggy.PIGGY.dto.PostAreaStatisticDto;
import com.piggy.PIGGY.dto.PostInputDto;
import com.piggy.PIGGY.dto.PostOutputDto;
import com.piggy.PIGGY.entity.Post;
import com.piggy.PIGGY.service.PostService;
import com.piggy.PIGGY.util.MapperUtils;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@RestController
@Api(tags = { "Post" }, description = "Post 정보 REST API")
@RequestMapping(value = "/post")
@CrossOrigin(origins = "*")
@Slf4j
public class PostRestController {

	@Autowired
	private PostService pService;
	
	@ApiOperation(value = "Post 생성")
	@PostMapping("/create/{uId}")
	public ResponseEntity<Object> create(@PathVariable Long uId, @RequestBody PostInputDto dto){
		try {
			log.trace("PostRestController - create", dto);
			Map<String, Object> output = pService.create(uId, dto);
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
		
	}
	@ApiOperation(value = "모든 Post 불러오기")
	@GetMapping("/findAll")
	public ResponseEntity<Object> findAll(){
		try {
			log.trace("PostRestController - findAll");
			List<Post> posts = pService.findAll();
			List<PostOutputDto> output = MapperUtils.mapAll(posts, PostOutputDto.class);
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "해당 Post 불러오기")
	@GetMapping("/findById/{pId}")
	public ResponseEntity<Object> findById(@PathVariable Long pId){
		try {
			log.trace("PostRestController - findById", pId);
			Post post = pService.findById(pId);
			PostOutputDto output = MapperUtils.map(post, PostOutputDto.class);
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "해당 유저의 모든 Post 불러오기")
	@GetMapping("/findByUser/{pId}")
	public ResponseEntity<Object> findByUser(@PathVariable Long uId){
		try {
			log.trace("PostRestController - findByUser", uId);
			List<Post> posts = pService.findByUser(uId);
			List<PostOutputDto> output = MapperUtils.mapAll(posts, PostOutputDto.class);
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "해당 피드 업데이트")
	@PutMapping("/update/{pId}")
	public ResponseEntity<Object> update(@PathVariable Long pId, @RequestBody PostInputDto dto){
		try {
			log.trace("PostRestController - update", dto);
			Post post = pService.update(pId, dto);
			PostOutputDto output = MapperUtils.map(post, PostOutputDto.class);
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "해당 유저의 Post 삭제")
	@DeleteMapping("/delete/{pId}")
	public ResponseEntity<Object> delete(@PathVariable Long pId){
		try {
			log.trace("PostRestController - delete", pId);
			pService.delete(pId);
			return new ResponseEntity<Object>("삭제완료", HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "해당 유저의 지역통계 불러오기")
	@GetMapping("/getAreaStatistic/{uId}")
	public ResponseEntity<Object> getAreaStatistic(@PathVariable Long uId){
		try {
			log.trace("PostRestController - getAreaStatistic", uId);
			List<PostAreaStatisticDto> output = pService.getAreaStatistic(uId);
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "해당 유저의 카테코리 통계 불러오기")
	@GetMapping("/getCategoryStatistic/{uId}")
	public ResponseEntity<Object> getCategoryStatistic(@PathVariable Long uId){
		try {
			log.trace("PostRestController - getCategoryStatistic", uId);
			Map<String, Integer> output = pService.getCategoryStatistic(uId);
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
}

