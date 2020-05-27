package com.piggy.PIGGY.service;

import com.piggy.PIGGY.dto.StoreInputDto;
import com.piggy.PIGGY.entity.Store;

public interface StoreService {

	public Store create(StoreInputDto store);
	
	public Store findById(Long sId);
	
}
