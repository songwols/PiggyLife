package com.piggy.PIGGY.service;

import com.piggy.PIGGY.entity.Store;

public interface StoreService {

	public Store create(Store store);
	
	public Store findById(Long sId);
	
}
