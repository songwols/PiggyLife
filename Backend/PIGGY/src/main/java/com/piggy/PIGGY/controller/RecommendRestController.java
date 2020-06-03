package com.piggy.PIGGY.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.piggy.PIGGY.dto.StoreOutputDto;
import com.piggy.PIGGY.entity.Recommend;
import com.piggy.PIGGY.entity.Store;
import com.piggy.PIGGY.service.RecommendService;
import com.piggy.PIGGY.util.MapperUtils;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(tags = { "Recommend" }, description = "추천 정보 REST API")
@RequestMapping(value = "/recommend")
@CrossOrigin(origins = "*")
public class RecommendRestController {

	@Autowired
	private RecommendService rService;
	
	@ApiOperation(value = "모든 추천 불러오기 (테스트용)")
	@GetMapping("/findAll")
	public ResponseEntity<Object> findAll(){
		try {
			List<Recommend> recos = rService.findAll();
			return new ResponseEntity<Object>(recos, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "해당 유저 추천 불러오기")
	@GetMapping("/findById")
	public ResponseEntity<Object> findById(@RequestParam Long uId){
		try {
			List<Store> stores = rService.findById(uId);
			List<StoreOutputDto> output = MapperUtils.mapAll(stores, StoreOutputDto.class);
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
}
