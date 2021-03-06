package com.piggy.PIGGY.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.piggy.PIGGY.dto.PostAreaStatisticDto;
import com.piggy.PIGGY.dto.PostCategoryStatisticDto;
import com.piggy.PIGGY.dto.ImageDto;
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
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		if(pRepo.findByUserAndStore(user, store).orElse(null) != null) {
		    resultMap.put("success", false);
		    resultMap.put("code", -1);
		    resultMap.put("message", "해당 유저는 해당 가게에 대해 이미 작성했습니다.");
		    return resultMap;
		}
		
		int size = pRepo.findByUser(user).size();
		int status = 0;
		if(size <= 230) {
			int rank = user.getRanking();
			int[] step = {0,10,20,30,50,70,90,120,150,180,230};

			if(size+1 == step[rank+1]) {
				status = uRepo.updateRanking(rank+1, uId);
			}
		}
	    PostOutputDto output = MapperUtils.map(pRepo.save(Post.builder()
				.user(user)
				.store(store)
				.content(dto.getContent())
				.visited(dto.getVisited())
				.isLike(dto.getIsLike())
				.build()), PostOutputDto.class);
	    
	    resultMap.put("success", true);
	    resultMap.put("code", 1);
	    resultMap.put("message", "게시글 작성 완료");
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
		return pRepo.findByUserOrderByCreatedTimeAtDesc(user);
	}

	@Override
	public Post update(Long pId, PostInputDto dto) {
		Post post = pRepo.findById(pId).orElseThrow(NoSuchElementException::new);
		Store store = sRepo.findById(dto.getSId()).orElseThrow(NoSuchElementException::new);
		post.update(store, dto.getContent(), dto.getVisited(), dto.getIsLike());
		return pRepo.save(post);
	}

	@Override
	public void delete(Long pId, Long uId) {
		User user = uRepo.findById(uId).orElseThrow(NoSuchElementException::new);
		int rank = user.getRanking();
		int size = pRepo.findByUser(user).size();
		if(size>=10) {
			int[] step = {0,10,20,30,50,70,90,120,150,180,230};
			if(size-1 == step[rank-1]) {
				uRepo.updateRanking(rank-1, uId);
			}
			
		}
		
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
	public List<PostCategoryStatisticDto> getCategoryStatistic(Long uId) {
		String sql = "SELECT s.category_group AS category_group, count(s.category_group) AS count FROM post p LEFT JOIN store s ON p.s_id = s.s_id "
				+ "WHERE p.u_id = :uId GROUP BY s.category_group ORDER BY count DESC";
		Query query = em.createNativeQuery(sql, "Post.CategoryStatistic");
		query.setParameter("uId", uId);
		List<PostCategoryStatisticDto> list = query.getResultList();
		
		List<PostCategoryStatisticDto> output = new ArrayList<PostCategoryStatisticDto>();
		
		for (int i = 0; i < list.size(); i++) {
			String category = list.get(i).getCategory_group().substring(0,list.get(i).getCategory_group().length()-1);
			Integer count = list.get(i).getCount();
			output.add(new PostCategoryStatisticDto(category, count));
		}
		return output;
	}


	@Override
	public List<Post> findByUserAndVisited(Long uId, boolean visited) {
		User user = uRepo.findById(uId).orElseThrow(NoSuchElementException::new);
		List<Post> list = pRepo.findByUserAndVisited(user, visited);
		return list;
	}
	
	@Override
	public Post updateImage(Long pId, ImageDto dto) {
		Post post = pRepo.findById(pId).orElseThrow(NoSuchElementException::new);
		post.updateImg(dto.getImage(), dto.getImageName());
		return pRepo.save(post);
	}

}
