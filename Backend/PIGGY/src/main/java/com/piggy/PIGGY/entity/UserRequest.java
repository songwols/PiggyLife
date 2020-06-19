package com.piggy.PIGGY.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Getter
@Entity
public class UserRequest {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long urId;
	
	@Column
	private String name;
	
	@Column
	private String address;
	
	@ManyToOne
	@JoinColumn(name = "uId")
	private User user;

	@Builder
	public UserRequest(User user, String name, String address) {
		this.user = user;
		this.name = name;
		this.address = address;
	}
	
	

}
