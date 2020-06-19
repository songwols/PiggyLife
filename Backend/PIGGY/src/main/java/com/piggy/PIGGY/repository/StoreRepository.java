<<<<<<< HEAD
package com.piggy.PIGGY.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.piggy.PIGGY.entity.Store;

public interface StoreRepository extends JpaRepository<Store, Long> {

	List<Store> findByNameContainingOrderByNameAscAddressAsc(String name);
}
=======
package com.piggy.PIGGY.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.piggy.PIGGY.entity.Region;
import com.piggy.PIGGY.entity.Store;

public interface StoreRepository extends JpaRepository<Store, Long> {

	List<Store> findByNameContainingOrderByNameAscAddressAsc(String name);
	
	List<Store> findByRegion(Region region);
}
>>>>>>> origin/develop
