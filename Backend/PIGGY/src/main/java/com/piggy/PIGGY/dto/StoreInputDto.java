package com.piggy.PIGGY.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StoreInputDto {
	
	private String name;
	private String address;
	private String branch;
	private String tel;
	private BigDecimal latitude;
	private BigDecimal longitude;
	private String category;
	private String categoryGroup;
	private String image;
	private Long rId;
	private List<MenuDto> menues;

}
