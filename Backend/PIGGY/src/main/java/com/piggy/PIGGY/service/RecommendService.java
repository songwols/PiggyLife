package com.piggy.PIGGY.service;

import java.util.List;

import com.piggy.PIGGY.entity.Recommend;
import com.piggy.PIGGY.entity.Store;

public interface RecommendService {

	public List<Recommend> findAll();

	public List<Store> findById(Long uId);
	
}
