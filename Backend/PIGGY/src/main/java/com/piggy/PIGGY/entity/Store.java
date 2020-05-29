package com.piggy.PIGGY.entity;

import java.math.BigDecimal;

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
import javax.persistence.OneToOne;
import javax.persistence.SqlResultSetMapping;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Store {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long sId;
	
	@Column(nullable=false)
	private String name;
	
	private String tel;
	
	@Column(nullable=false)
	private String address;
	
	@Column(nullable=false)
	private BigDecimal latitude;
	
	@Column(nullable=false)
	private BigDecimal longitude;
	
	private String category;
	
	private String image;
	
	private String branch;

	@JsonIgnore
	@OneToOne(mappedBy = "store", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Post post;
	
	@ManyToOne
	@JoinColumn(name="rId")
	private Region region;

	@Builder
	public Store(String name, String tel, String address, BigDecimal latitude, BigDecimal longitude, String category,String branch) {
		this.name = name;
		this.tel = tel;
		this.address = address;
		this.latitude = latitude;
		this.longitude = longitude;
		this.category = category;
		this.branch = branch;
	}
}
