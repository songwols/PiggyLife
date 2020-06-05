package com.piggy.PIGGY.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name="matching")
@IdClass(MatchId.class)
public class Match {
	
    @Id
	private Long self;
	
	@Id
	private Long friend;
	
	@Column
	private String newStores;
	
	@Column
	private String recommendStores;
	
	@Column
	private BigDecimal similarity;
	
	@Column
	private LocalDateTime updateTimeAt;

}
