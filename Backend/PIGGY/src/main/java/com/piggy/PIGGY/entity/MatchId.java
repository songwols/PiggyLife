package com.piggy.PIGGY.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class MatchId implements Serializable{

	private Long self;
	private Long friend;
	
}
