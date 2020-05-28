package com.piggy.PIGGY.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.piggy.PIGGY.dto.StoreInputDto;
import com.piggy.PIGGY.dto.StoreTop10Dto;
import com.piggy.PIGGY.entity.Store;
import com.piggy.PIGGY.service.StoreService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@RestController
@Api(tags = { "Store" }, description = "Store 정보 REST API")
@RequestMapping(value = "/store")
@CrossOrigin(origins = "*")
@Slf4j
public class StoreRestController {

	@Autowired
	private StoreService sService;
	
	@ApiOperation(value = "Store 생성")
	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestBody StoreInputDto dto) {
		try {
			log.trace("StoreRestController - create", dto);
			Store store = sService.create(dto);
			return new ResponseEntity<Object>(store, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "해당 Store 찾기")
	@GetMapping("/findById/{sId}")
	public ResponseEntity<Object> findById(@PathVariable Long sId) {
		try {
			log.trace("StoreRestController - findById", sId);
			Store store = sService.findById(sId);
			return new ResponseEntity<Object>(store, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "먹스팟 top 10 찾기")
	@GetMapping("/getStoreTop10")
	public ResponseEntity<Object> getStoreTop10() {
		try {

			log.trace("StoreRestController - getStoreTop10");
			List<StoreTop10Dto> stores = sService.getStoreTop10();
			return new ResponseEntity<Object>(stores, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
}
