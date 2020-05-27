package com.piggy.PIGGY.service;

import java.util.List;
import java.util.Map;

import com.piggy.PIGGY.dto.PostAreaStatisticDto;
import com.piggy.PIGGY.dto.PostInputDto;
import com.piggy.PIGGY.entity.Post;

public interface PostService {

	public Post create(Long uId, PostInputDto dto);
	
	public List<Post> findAll();
	
	public Post findById(Long pId);
	
	public List<Post> findByUser(Long uId);
	
	public Post update(Long pId, PostInputDto dto);
	
	public void delete(Long pId);
	
	public List<PostAreaStatisticDto> getAreaStatistic(Long uId);

	public Map<String, Integer> getCategoryStatistic(Long uId);
	
}
