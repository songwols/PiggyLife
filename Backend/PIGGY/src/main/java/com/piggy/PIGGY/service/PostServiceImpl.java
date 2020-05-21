package com.piggy.PIGGY.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.piggy.PIGGY.entity.Post;
import com.piggy.PIGGY.entity.User;
import com.piggy.PIGGY.repository.PostRepository;
import com.piggy.PIGGY.repository.UserRepository;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	private PostRepository pRepo;
	
	@Autowired
	private UserRepository uRepo;
	
	@Override
	public Post create(Long uId, Post post) {
		User user = uRepo.findById(uId).orElseThrow(NoSuchElementException::new);
		
		return pRepo.save(Post.builder()
				.user(user)
				.image(post.getImage())
				.content(post.getContent())
				.visited(post.getVisited())
				.isLike(post.getIsLike())
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
	public Post update(Long pId) {
		// update는 기존에 pid가 겹칠경우 pRepo.save를 통해 자동으로 수정되서 삽입된다.
		// 직접 일부분만 수정하려면 repository에서 쿼리문을 작성해야한다. 아마도?
		return null;
	}

	@Override
	public void delete(Long pId) {
		pRepo.deleteById(pId);
	}

}
