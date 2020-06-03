package com.piggy.PIGGY.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.StringTokenizer;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.piggy.PIGGY.dto.PostAreaStatisticDto;
import com.piggy.PIGGY.dto.PostCategoryStatisticDto;
import com.piggy.PIGGY.dto.PostInputDto;
import com.piggy.PIGGY.dto.PostOutputDto;
import com.piggy.PIGGY.entity.Post;
import com.piggy.PIGGY.entity.Store;
import com.piggy.PIGGY.entity.User;
import com.piggy.PIGGY.repository.PostRepository;
import com.piggy.PIGGY.repository.StoreRepository;
import com.piggy.PIGGY.repository.UserRepository;
import com.piggy.PIGGY.util.MapperUtils;

@Service
public class PostServiceImpl implements PostService {

	@PersistenceContext
	EntityManager em;
	
	@Autowired
	private PostRepository pRepo;
	
	@Autowired
	private UserRepository uRepo;
	
	@Autowired
	private StoreRepository sRepo;
	
	@Override
	public Map<String, Object> create(Long uId, PostInputDto dto) {
		User user = uRepo.findById(uId).orElseThrow(NoSuchElementException::new);
		Store store = sRepo.findById(dto.getSId()).orElseThrow(NoSuchElementException::new);
		int size = pRepo.findByUser(user).size();
		int status = 0;
		if(size <= 100) {
			int rank = user.getRanking();
			int[] step = {10,10,10,20,20,20,30,30,30,50};
			int nextRank = (int)((size+1)/step[rank]);
			if(rank != nextRank) {
				status = uRepo.updateRanking(nextRank, uId);
			}
		}
	    Map<String, Object> resultMap = new HashMap<String, Object>();
	    PostOutputDto output = MapperUtils.map(pRepo.save(Post.builder()
				.user(user)
				.store(store)
				.imageName(dto.getImageName())
				.image(dto.getImage())
				.content(dto.getContent())
				.visited(dto.getVisited())
				.isLike(dto.getIsLike())
				.build()), PostOutputDto.class);
	    
	    resultMap.put("data", output);
	    resultMap.put("status", status);
		return resultMap;
	}

	@Override
	public List<Post> findAll() {
		return  pRepo.findAll();
	}

	@Override
	public Post findById(Long pId) {
		return pRepo.findById(pId).orElseThrow(NoSuchElementException::new);
	}

	@Override
	public List<Post> findByUser(Long uId) {
		User user = uRepo.findById(uId).orElseThrow(NoSuchElementException::new);
		return pRepo.findByUser(user);
	}

	@Override
	public Post update(Long pId, PostInputDto dto) {
		Post post = pRepo.findById(pId).orElseThrow(NoSuchElementException::new);
		Store store = sRepo.findById(dto.getSId()).orElseThrow(NoSuchElementException::new);
		post.update(store, dto.getImageName(), dto.getImage(), dto.getContent(), dto.getVisited(), dto.getIsLike());
		return pRepo.save(post);
	}

	@Override
	public void delete(Long pId) {
		pRepo.deleteById(pId);
	}

	@Override
	public List<PostAreaStatisticDto> getAreaStatistic(Long uId) {
		String sql = "SELECT r.city AS city, r.area AS area, count(r.area) AS cnt "
				+ "FROM post p LEFT JOIN store s ON p.s_id = s.s_id LEFT JOIN region r ON s.r_id = r.r_id "
				+ "WHERE p.u_id = :uId GROUP BY r.r_id ORDER BY cnt DESC";
		Query query = em.createNativeQuery(sql, "Post.AreaStatistic");
		query.setParameter("uId", uId);
		List<PostAreaStatisticDto> list = query.getResultList();
		return list;
	}

	@Override
	public Map<String, Integer> getCategoryStatistic(Long uId) {
		String sql = "SELECT s.category AS category FROM post p LEFT JOIN store s ON p.s_id = s.s_id "
				+ "WHERE p.u_id = :uId";
		Query query = em.createNativeQuery(sql, "Post.CategoryStatistic");
		query.setParameter("uId", uId);
		List<PostCategoryStatisticDto> list = query.getResultList();

		Map<String, Integer> map = new HashMap<String, Integer>();
		for (int i = 0; i < list.size(); i++) {
			String categories = list.get(i).getCategory();
			StringTokenizer st = new StringTokenizer(categories,"|");
			while(st.hasMoreTokens()) {
				String category = st.nextToken();
				if(map.containsKey(category)) {
					map.put(category, map.get(category)+1);
				}else {
					map.put(category, 1);
				}
			}
		}
		return map;
	}

	@Override
	public List<Post> findByUserAndVisited(Long uId, boolean visited) {
		User user = uRepo.findById(uId).orElseThrow(NoSuchElementException::new);
		List<Post> list = pRepo.findByUserAndVisited(user, visited);
		return list;
	}

}
