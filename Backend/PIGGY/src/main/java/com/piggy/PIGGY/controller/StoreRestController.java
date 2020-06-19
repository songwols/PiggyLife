package com.piggy.PIGGY.controller;

import java.util.HashMap;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.piggy.PIGGY.dto.ImageDto;
import com.piggy.PIGGY.dto.PostOutputDto;
import com.piggy.PIGGY.dto.ResultDto;
import com.piggy.PIGGY.dto.StoreInputDto;
import com.piggy.PIGGY.dto.StoreOutputDto;
import com.piggy.PIGGY.dto.StoreTop10Dto;
import com.piggy.PIGGY.entity.Post;
import com.piggy.PIGGY.entity.Store;
import com.piggy.PIGGY.service.FileService;
import com.piggy.PIGGY.service.StoreService;
import com.piggy.PIGGY.util.MapperUtils;

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
	
	@Autowired
	private FileService fileService;
	
	@ApiOperation(value = "Store 생성")
	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestBody StoreInputDto dto) {
		try {
			log.trace("StoreRestController - create", dto);
			StoreOutputDto store = sService.create(dto);
			ResultDto output = new ResultDto(true, 1, "생성에 성공했습니다.", store);
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			ResultDto output = new ResultDto(false, -1, "생성에 실패했습니다.", e.getMessage());
			return new ResponseEntity<Object>(output, HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation(value = "Store 업데이트")
	@PutMapping("/update/{sId}")
	public ResponseEntity<Object> update(@PathVariable Long sId, @RequestBody StoreInputDto dto
//			, @RequestParam(value="file", required=false) MultipartFile file
			) {
		try {
			log.trace("StoreRestController - update");
			StoreOutputDto store = sService.update(sId, dto);
			ResultDto output = new ResultDto(true, 1, "수정에 성공했습니다.", store);
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			ResultDto output = new ResultDto(false, -1, "수정에 실패했습니다.", e.getMessage());
			return new ResponseEntity<Object>(output, HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation(value = "해당 Store 찾기")
	@GetMapping("/findById/{sId}")
	public ResponseEntity<Object> findById(@PathVariable Long sId) {
		try {
			log.trace("StoreRestController - findById", sId);
			Store store = sService.findById(sId);
			StoreOutputDto output = MapperUtils.map(store, StoreOutputDto.class);
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("data", "존재하지 않는 가게입니다");
			resultMap.put("status", false);
			return new ResponseEntity<Object>(resultMap, HttpStatus.BAD_REQUEST);
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
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("data", e.getMessage());
			resultMap.put("status", false);
			return new ResponseEntity<Object>(resultMap, HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation(value = "이름으로 가게 찾기")
	@GetMapping("/findByName")
	public ResponseEntity<Object> findByName(@RequestParam String name) {
		try {
			log.trace("StoreRestController - findByName");
			List<Store> stores = sService.findByName(name);
			List<StoreOutputDto> output = MapperUtils.mapAll(stores, StoreOutputDto.class);
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("data", e.getMessage());
			resultMap.put("status", false);
			return new ResponseEntity<Object>(resultMap, HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation(value = "가게 삭제")
	@DeleteMapping("/delete")
	public ResponseEntity<Object> delete(@RequestParam Long sid) {
		try {
			log.trace("StoreRestController - delete");
			sService.delete(sid);
			ResultDto output = new ResultDto(true, 1, "성공적으로 삭제되었습니다.");
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			ResultDto output = new ResultDto(false, -1, "삭제에 실패했습니다.", e.getMessage());
			return new ResponseEntity<Object>(output, HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation(value = "해당 가게에 이미지 업로드")
	@PostMapping("/storeImage/{sId}")
	public ResponseEntity<Object> postImage(@PathVariable Long sId , @RequestParam("file") MultipartFile file) {
		try {
			Map<String, Object> responseImage = fileService.uploadImage(file, "store");
			ImageDto dto = new ImageDto(sId, responseImage.get("image").toString(), responseImage.get("imageName").toString());
			Store store = sService.updateImage(sId, dto);
			StoreOutputDto output = MapperUtils.map(store, StoreOutputDto.class);
			return new ResponseEntity<Object>(output, HttpStatus.OK);
		} catch (Exception e) {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("data", e.getMessage());
			resultMap.put("status", false);
			return new ResponseEntity<Object>(resultMap, HttpStatus.BAD_REQUEST);
		}
	}
	
}
