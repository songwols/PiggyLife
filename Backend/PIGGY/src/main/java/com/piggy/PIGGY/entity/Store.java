package com.piggy.PIGGY.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SqlResultSetMapping;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.piggy.PIGGY.dto.StoreTop10Dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@SqlResultSetMapping(
		name="Store.Top10",
		classes={
				@ConstructorResult(
						targetClass=StoreTop10Dto.class,
						columns={
								@ColumnResult(name="sId",type=Long.class),
								@ColumnResult(name="name",type=String.class),
								@ColumnResult(name="image",type=String.class),
								@ColumnResult(name="cnt",type=Integer.class)
						}
						)
		}
		)
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Store {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long sId;
	
	@Column(nullable=false)
	private String name;
	
	@Column
	private String tel;
	
	@Column(nullable=false)
	private String address;
	
	@Column(nullable=false, precision=19, scale=6)
	private BigDecimal latitude;
	
	@Column(nullable=false, precision=19, scale=6)
	private BigDecimal longitude;
	
	@Column
	private String category;
	
	@Column
	private String category_group;
	
	@Column
	private String image;
	
	@Column
	private String branch;

	@JsonIgnore
	@OneToMany(mappedBy = "store", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Post> posts = new ArrayList<>();
	
	@ManyToOne
	@JoinColumn(name="rId")
	private Region region;
	
	@OneToMany(mappedBy = "store", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Menu> menues = new ArrayList<>();

	@Builder
	public Store(String name, String tel, String address, BigDecimal latitude, BigDecimal longitude, String category, String category_group, String branch, Region region) {
		this.name = name;
		this.tel = tel;
		this.address = address;
		this.latitude = latitude;
		this.longitude = longitude;
		this.category = category;
		this.category_group = category_group;
		this.branch = branch;
		this.region = region;
	}
	
	public void update(String name, String tel, String address, BigDecimal latitude, BigDecimal longitude, String category, String category_group, String branch, Region region) {
		this.name = name;
		this.tel = tel;
		this.address = address;
		this.latitude = latitude;
		this.longitude = longitude;
		this.category = category;
		this.category_group = category_group;
		this.branch = branch;
		this.region = region;
	}
	
	public void updateImg(String image) {
		this.image = image;
	}
}
