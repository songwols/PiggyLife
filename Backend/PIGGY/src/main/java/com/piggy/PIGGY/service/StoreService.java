package com.piggy.PIGGY.service;

import java.util.List;

import com.piggy.PIGGY.dto.StoreInputDto;
import com.piggy.PIGGY.dto.StoreTop10Dto;
import com.piggy.PIGGY.entity.Store;

public interface StoreService {

	public Store create(StoreInputDto store);
	
	public Store findById(Long sId);
	
	public List<StoreTop10Dto> getStoreTop10();
	
}
