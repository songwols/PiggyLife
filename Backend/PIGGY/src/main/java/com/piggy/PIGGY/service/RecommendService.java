package com.piggy.PIGGY.service;

import java.util.List;

import com.piggy.PIGGY.dto.AreaRecommendDto;
import com.piggy.PIGGY.dto.MatchDto;
import com.piggy.PIGGY.entity.Store;
import com.piggy.PIGGY.entity.UserRecommend;

public interface RecommendService {

	public List<UserRecommend> findAllRecommend();

	public List<Store> findUserRecommend(Long uId);
	
	public AreaRecommendDto findAreaRecommend(Long uId);
	
	public MatchDto findMatch(String selfEmail, String friendEmail);

	public AreaRecommendDto findPopularAreaRecommend();
	
}
