package com.piggy.PIGGY.service;

import java.util.List;

import com.piggy.PIGGY.dto.MatchDto;
import com.piggy.PIGGY.entity.Recommend;
import com.piggy.PIGGY.entity.Store;

public interface RecommendService {

	public List<Recommend> findAllRecommend();

	public List<Store> findRecommend(Long uId);
	
	public MatchDto findMatch(String selfEmail, String friendEmail);
	
}
