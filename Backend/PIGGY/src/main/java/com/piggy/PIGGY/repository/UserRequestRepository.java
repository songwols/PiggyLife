package com.piggy.PIGGY.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.piggy.PIGGY.entity.UserRequest;

public interface UserRequestRepository extends JpaRepository<UserRequest, Long> {

}

