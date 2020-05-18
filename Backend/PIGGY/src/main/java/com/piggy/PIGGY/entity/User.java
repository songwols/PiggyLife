package com.piggy.PIGGY.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Getter
@Entity
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int uId;
	
	@Column
	private String nickname;
	
	@Column
	private String email;
	
	@Column
	private String password;
	
	@Column
	private int rank;
	
	@Column
	private String image;
	
	@Builder
	private User(String nickname, String email, int rank, String image) {
		this.nickname = nickname;
		this.email = email;
		this.rank = rank;
		this.image = image;
	}
	
}
