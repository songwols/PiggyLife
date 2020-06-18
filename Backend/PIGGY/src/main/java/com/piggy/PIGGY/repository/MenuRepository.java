package com.piggy.PIGGY.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.piggy.PIGGY.entity.Menu;
import com.piggy.PIGGY.entity.Store;

public interface MenuRepository  extends JpaRepository<Menu, Long> {

	Long deleteByStore(Store store);
	
}
