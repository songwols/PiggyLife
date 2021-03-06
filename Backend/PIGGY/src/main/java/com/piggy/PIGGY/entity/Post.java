package com.piggy.PIGGY.entity;

import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.SqlResultSetMappings;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.piggy.PIGGY.dto.PostAreaStatisticDto;
import com.piggy.PIGGY.dto.PostCategoryStatisticDto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@SqlResultSetMappings({
	@SqlResultSetMapping(
			name="Post.AreaStatistic",
			classes={
					@ConstructorResult(
							targetClass=PostAreaStatisticDto.class,
							columns={
									@ColumnResult(name="city",type=String.class),
									@ColumnResult(name="area",type=String.class),
									@ColumnResult(name="cnt",type=Integer.class)
							}
							)
			}
			),
	@SqlResultSetMapping(
			name="Post.CategoryStatistic",
			classes={
					@ConstructorResult(
							targetClass=PostCategoryStatisticDto.class,
							columns={
									@ColumnResult(name="category_group",type=String.class),
									@ColumnResult(name="count",type=Integer.class),
							}
							)
			}
			)
	
})
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class)
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

	@ManyToOne
	@JoinColumn(name = "sId")
	private Store store;
	
	@Column
	private String imageName;
	
	@Column
	private String image;
	
	@Column(nullable=false)
	private String content;
	
	@Column
	private Boolean visited;
	
	@Column(nullable=false, columnDefinition = "int default 0")
	private Integer isLike;

	@Builder
	public Post(User user, Store store, String content, Boolean visited, Integer isLike) {
		this.user = user;
		this.store = store;
		this.content = content;
		this.visited = visited;
		this.isLike = isLike;
	}
	
	public void update(Store store, String content, Boolean visited, Integer isLike) {
		this.store = store;
		this.content = content;
		this.visited = visited;
		this.isLike = isLike;
	}
	
	public void updateImg(String image, String imageName) {
		this.image = image;
		this.imageName = imageName;
	}
	
}
