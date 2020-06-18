package com.piggy.PIGGY.service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.piggy.PIGGY.dto.MenuDto;
import com.piggy.PIGGY.dto.ImageDto;
import com.piggy.PIGGY.dto.StoreInputDto;
import com.piggy.PIGGY.dto.StoreTop10Dto;
import com.piggy.PIGGY.entity.Menu;
import com.piggy.PIGGY.entity.Store;
import com.piggy.PIGGY.repository.MenuRepository;
import com.piggy.PIGGY.repository.StoreRepository;

@Service
public class StoreServiceImpl implements StoreService {

	@PersistenceContext
	EntityManager em;
	
	@Autowired
	private StoreRepository sRepo;
	
	@Autowired
	private MenuRepository mRepo;
	
	@Override
	public void create(StoreInputDto input) {
		Store store = sRepo.save(Store.builder()
				.name(input.getName())
				.address(input.getAddress())
				.branch(input.getBranch())
				.tel(input.getTel())
				.category(input.getCategory())
				.category_group(input.getCategoryGroup())
				.latitude(input.getLatitude())
				.longitude(input.getLongitude())
				.build()
				);
		
		for (MenuDto menu : input.getMenues()) {
			mRepo.save(Menu.builder()
					.store(store)
					.menuName(menu.getMenuName())
					.price(menu.getPrice())
					.build()
					);		
		}
	}
	
	@Override
	public Store update(Long sId, StoreInputDto input) {
		Store store = sRepo.findById(sId).orElseThrow(NoSuchElementException::new);
		mRepo.deleteByStore(store);
		for (MenuDto menu : input.getMenues()) {
			mRepo.save(Menu.builder()
					.store(store)
					.menuName(menu.getMenuName())
					.price(menu.getPrice())
					.build()
					);		
		}
		
		store.update(input.getName(), 
				input.getTel(), 
				input.getAddress(), 
				input.getLatitude(), 
				input.getLongitude(), 
				input.getCategory(), 
				input.getCategoryGroup(), 
				input.getBranch());
		
		return sRepo.save(store);
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
		return sRepo.findByNameContainingOrderByNameAscAddressAsc(name);
	}

	@Override
	public void delete(Long sid) {
		sRepo.deleteById(sid);
	}
	
	@Override
	public Store updateImage(Long sId, ImageDto dto) {
		Store store = sRepo.findById(sId).orElseThrow(NoSuchElementException::new);
		store.updateImg(dto.getImage());
		return sRepo.save(store);
	}

}
