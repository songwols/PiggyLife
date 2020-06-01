package com.piggy.PIGGY.service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.piggy.PIGGY.dto.StoreInputDto;
import com.piggy.PIGGY.dto.StoreTop10Dto;
import com.piggy.PIGGY.entity.Store;
import com.piggy.PIGGY.repository.StoreRepository;

@Service
public class StoreServiceImpl implements StoreService {

	@PersistenceContext
	EntityManager em;
	
	@Autowired
	private StoreRepository sRepo;
	
	@Override
	public Store create(StoreInputDto store) {
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

	@Override
	public List<StoreTop10Dto> getStoreTop10() {
		String sql = "SELECT s.s_id AS sId, s.name AS name, s.image AS image, count(s.s_id) AS cnt "
				+ "FROM store s LEFT JOIN post p ON p.s_id = s.s_id "
				+ "WHERE p.is_like = 1 AND p.visited = 1 "
				+ "GROUP BY s.s_id ORDER BY cnt DESC LIMIT 10";
		Query query = em.createNativeQuery(sql, "Store.Top10");
		
		List<StoreTop10Dto> list = query.getResultList();
		
		return list;
	}

	@Override
	public List<Store> findByName(String name) {
		return sRepo.findByNameContaining(name);
	}

}
