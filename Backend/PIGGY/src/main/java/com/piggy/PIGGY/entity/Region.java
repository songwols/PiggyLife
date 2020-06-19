package com.piggy.PIGGY.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Region {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long rId;
	
	@Column(nullable=false)
	private String city;
	
	private String area;
	
	@OneToMany(mappedBy="region", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<AreaRecommend> aRecommends = new ArrayList<>();
	
	@OneToMany(mappedBy = "region", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Store> stores = new ArrayList<>();

	@Builder
	public Region(Long rId, String city, String area) {
		this.rId = rId;
		this.city = city;
		this.area = area;
	}
	
}
