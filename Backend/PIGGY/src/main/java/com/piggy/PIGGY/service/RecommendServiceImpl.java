package com.piggy.PIGGY.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.piggy.PIGGY.entity.Recommend;
import com.piggy.PIGGY.entity.Store;
import com.piggy.PIGGY.repository.RecommendRepository;
import com.piggy.PIGGY.repository.StoreRepository;

@Service
public class RecommendServiceImpl implements RecommendService{

	@Autowired
	private RecommendRepository rRepo;
	
	@Autowired
	private StoreRepository sRepo;
	
	@Override
	public List<Recommend> findAll() {
		return rRepo.findAll();
	}

	@Override
	public List<Store> findById(Long uId) {
		Recommend recommend = rRepo.findById(uId).orElseThrow(NoSuchElementException::new);
		String[] lists = recommend.getStores().split(",");

		List<Integer> numbers = getRandom(lists.length);
		
		List<Store> stores = new ArrayList<>();
		for (Integer number : numbers) {
			stores.add(sRepo.findById(Long.parseLong(lists[number])).orElseThrow(NoSuchElementException::new));
		}
		
		return stores;
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

}
