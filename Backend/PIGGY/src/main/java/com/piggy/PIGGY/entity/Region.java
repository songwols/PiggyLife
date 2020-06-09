package com.piggy.PIGGY.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
	
	@OneToOne(mappedBy="region", cascade=CascadeType.ALL)
	private AreaRecommend aRecommend;

	@Builder
	public Region(Long rId, String city, String area) {
		this.rId = rId;
		this.city = city;
		this.area = area;
	}
	
}
