package com.piggy.PIGGY.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.piggy.PIGGY.entity.Match;
import com.piggy.PIGGY.entity.MatchId;

public interface MatchRepository extends CrudRepository<Match, MatchId> {
	
}
