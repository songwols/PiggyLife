package com.piggy.PIGGY.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StoreTop10Dto {

	private Long sId;
	private String name;
	private String image;
	private Integer cnt;
	
}
