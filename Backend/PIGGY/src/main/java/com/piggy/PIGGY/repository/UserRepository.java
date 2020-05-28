package com.piggy.PIGGY.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.piggy.PIGGY.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String email);
	
	Optional<User> findByNickname(String nickname);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE user u set u.email_certify = 'Y' where u.email = :email", nativeQuery = true)
	Integer updateEmail(@Param("email") String email);

	@Transactional
	@Modifying
	@Query(value = "UPDATE user u set u.ranking = :nextRank where u.u_id = :uId", nativeQuery = true)
	Integer updateRanking(@Param("nextRank") int nextRank, @Param("uId") Long uId);
}

