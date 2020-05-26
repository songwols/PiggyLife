package com.piggy.PIGGY.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.piggy.PIGGY.dto.PostInputDto;
import com.piggy.PIGGY.entity.Post;
import com.piggy.PIGGY.entity.Store;
import com.piggy.PIGGY.entity.User;
import com.piggy.PIGGY.repository.PostRepository;
import com.piggy.PIGGY.repository.StoreRepository;
import com.piggy.PIGGY.repository.UserRepository;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	private PostRepository pRepo;
	
	@Autowired
	private UserRepository uRepo;
	
	@Autowired
	private StoreRepository sRepo;
	
	@Override
	public Post create(Long uId, PostInputDto dto) {
		User user = uRepo.findById(uId).orElseThrow(NoSuchElementException::new);
		Store store = sRepo.findById(dto.getSId()).orElseThrow(NoSuchElementException::new);
		return pRepo.save(Post.builder()
				.user(user)
				.store(store)
				.image(dto.getImage())
				.content(dto.getContent())
				.visited(dto.getVisited())
				.isLike(dto.getIsLike())
				.build()
		);
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
		post.update(store, dto.getImage(), dto.getContent(), dto.getVisited(), dto.getIsLike());
		return pRepo.save(post);
	}

	@Override
	public void delete(Long pId) {
		pRepo.deleteById(pId);
	}

}
