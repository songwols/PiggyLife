package com.piggy.PIGGY.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.piggy.PIGGY.dto.AreaRecommendDto;
import com.piggy.PIGGY.dto.MatchDto;
import com.piggy.PIGGY.dto.RegionDto;
import com.piggy.PIGGY.dto.StoreOutputDto;
import com.piggy.PIGGY.entity.AreaRecommend;
import com.piggy.PIGGY.entity.Match;
import com.piggy.PIGGY.entity.MatchId;
import com.piggy.PIGGY.entity.Store;
import com.piggy.PIGGY.entity.User;
import com.piggy.PIGGY.entity.UserRecommend;
import com.piggy.PIGGY.repository.AreaRecommendRepository;
import com.piggy.PIGGY.repository.MatchRepository;
import com.piggy.PIGGY.repository.PostRepository;
import com.piggy.PIGGY.repository.StoreRepository;
import com.piggy.PIGGY.repository.UserRecommendRepository;
import com.piggy.PIGGY.repository.UserRepository;
import com.piggy.PIGGY.util.MapperUtils;

@Service
public class RecommendServiceImpl implements RecommendService{

	@Autowired
	private UserRecommendRepository urRepo;
	
	@Autowired
	private AreaRecommendRepository arRepo;
	
	@Autowired
	private StoreRepository sRepo;

	@Autowired
	private UserRepository uRepo;
	
	@Autowired
	private MatchRepository mRepo;
	
	@Autowired
	private PostRepository pRepo;
	
	@Override
	public List<UserRecommend> findAllRecommend() {
		return urRepo.findAll();
	}

	@Override
	public List<Store> findUserRecommend(Long uId) {
		UserRecommend recommend = urRepo.findById(uId).orElseThrow(NoSuchElementException::new);
		List<Store> stores = getStores(recommend.getStores());
		return stores;
	}
	
	@Override
	public AreaRecommendDto findAreaRecommend(Long uId) {
		AreaRecommend recommend = arRepo.findById(uId).orElseThrow(NoSuchElementException::new);
		List<Store> recommendStores = getStores(recommend.getStores());
		List<StoreOutputDto> recommendStoresDto = MapperUtils.mapAll(recommendStores, StoreOutputDto.class);
		RegionDto regionDto = MapperUtils.map(recommend.getRegion(), RegionDto.class);
		AreaRecommendDto dto = new AreaRecommendDto(recommendStoresDto, regionDto);
		
		return dto;
	}
	
	@Override
	public MatchDto findMatch(String selfEmail, String friendEmail) {
		
		
		User self = uRepo.findByEmail(selfEmail).orElseThrow(NoSuchElementException::new);
		User friend = uRepo.findByEmail(friendEmail).orElseThrow(NoSuchElementException::new);
		
		if(pRepo.findByUser(self).size()<5) {
			self = uRepo.findByEmail("jmiha22@gmail.com").orElseThrow(NoSuchElementException::new);
		}
		
		MatchId mId = new MatchId(self.getUId(), friend.getUId());
		Match match = mRepo.findById(mId).orElseThrow(NoSuchElementException::new);
		List<Store> recommendStores = getStores(match.getRecommendStores());
		List<Store> newStores = getStores(match.getNewStores());
		List<StoreOutputDto> recommendStoresDto = MapperUtils.mapAll(recommendStores, StoreOutputDto.class);
		List<StoreOutputDto> newStoresDto = MapperUtils.mapAll(newStores, StoreOutputDto.class);
		
		
		MatchDto dto = new MatchDto(newStoresDto, recommendStoresDto, match.getSimilarity());
		
		return dto;
	}
	
	public List<Integer> getRandom(int length) {
		
		List<Integer> numbers = new ArrayList<>();
		Random r = new Random();
		int size = 10;
		for (int i = 0; i < (length < 10 ? length : size); i++) {
			int n = r.nextInt(length);
			if(!numbers.contains(n))
				numbers.add(n);
			else
				i--;
		}
		return numbers;
	}
	
	public List<Store> getStores(String storesStr){
		String[] lists = storesStr.split(",");
		List<Integer> numbers = getRandom(lists.length);
		List<Store> stores = new ArrayList<>();
		for (Integer number : numbers) {
			stores.add(sRepo.findById(Long.parseLong(lists[number])).orElseThrow(NoSuchElementException::new));
		}
		return stores;
	}

}
