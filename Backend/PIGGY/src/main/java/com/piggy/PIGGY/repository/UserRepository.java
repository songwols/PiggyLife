package com.piggy.PIGGY.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.piggy.PIGGY.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String email);
	
	Optional<User> findByNickname(String nickname);
	
	
}
