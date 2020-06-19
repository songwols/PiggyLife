package com.piggy.PIGGY.service;

import java.util.List;

import com.piggy.PIGGY.dto.ImageDto;
import com.piggy.PIGGY.dto.StoreInputDto;
import com.piggy.PIGGY.dto.StoreOutputDto;
import com.piggy.PIGGY.dto.StoreTop10Dto;
import com.piggy.PIGGY.entity.Store;

public interface StoreService {

	public StoreOutputDto create(StoreInputDto input);
	
	public StoreOutputDto update(Long sId, StoreInputDto input);
	
	public Store findById(Long sId);
	
	public List<StoreTop10Dto> getStoreTop10();
	
	public List<Store> findByName(String name);
	
	public void delete(Long sid);
	
	public Store updateImage(Long pId, ImageDto dto);
	
}
