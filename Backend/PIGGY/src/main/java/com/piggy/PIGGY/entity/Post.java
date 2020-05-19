package com.piggy.PIGGY.entity;

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

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Post extends DateTime {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long pId;
	
	@ManyToOne
	@JoinColumn(name = "uId")
	private User user;
	
	@Column
	private String image;
	
	@Column
	private String content;
	
	@Column
	private Boolean visited;
	
	@Column
	private Boolean isLike;

	@Builder
	public Post(User user, String image, String content, Boolean visited, Boolean isLike) {
		this.user = user;
		this.image = image;
		this.content = content;
		this.visited = visited;
		this.isLike = isLike;
	}
	
}
