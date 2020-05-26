package com.piggy.PIGGY.entity;

import java.math.BigDecimal;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

//@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Store {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long sId;
	
	@Column
	private String name;
	
	@Column
	private String tel;
	
	@Column
	private String address;
	
	@Column
	private BigDecimal latitude;
	
	@Column
	private BigDecimal longitude;
	
	@Column
	private String category;

	@OneToOne(mappedBy = "store", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Post post;

	@Builder
	public Store(String name, String tel, String address, BigDecimal latitude, BigDecimal longitude, String category) {
		this.name = name;
		this.tel = tel;
		this.address = address;
		this.latitude = latitude;
		this.longitude = longitude;
		this.category = category;
	}
}
