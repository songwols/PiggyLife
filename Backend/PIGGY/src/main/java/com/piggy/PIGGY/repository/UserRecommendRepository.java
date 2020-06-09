package com.piggy.PIGGY.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.piggy.PIGGY.entity.UserRecommend;

public interface UserRecommendRepository extends JpaRepository<UserRecommend, Long> {

}