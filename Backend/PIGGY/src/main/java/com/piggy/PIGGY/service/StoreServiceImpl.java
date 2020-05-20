package com.piggy.PIGGY.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.piggy.PIGGY.entity.Store;
import com.piggy.PIGGY.repository.StoreRepository;

@Service
public class StoreServiceImpl implements StoreService{

	@Autowired
	private StoreRepository sRepo;
	
	@Override
	public Store create(Store store) {
		return sRepo.save(Store.builder()
				.name(store.getName())
				.tel(store.getTel())
				.address(store.getAddress())
				.latitude(store.getLatitude())
				.longitude(store.getLongitude())
				.category(store.getCategory())
				.build()
				);
	}

	@Override
	public Store findById(Long sId) {
		return sRepo.findById(sId).orElseThrow(NoSuchElementException::new);
	}

}
