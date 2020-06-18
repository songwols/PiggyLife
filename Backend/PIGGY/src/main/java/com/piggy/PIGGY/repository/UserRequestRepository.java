package com.piggy.PIGGY.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.piggy.PIGGY.entity.User;
import com.piggy.PIGGY.entity.UserRequest;

public interface UserRequestRepository extends JpaRepository<UserRequest, Long> {

	List<UserRequest> findByUser(User user);
	
}

