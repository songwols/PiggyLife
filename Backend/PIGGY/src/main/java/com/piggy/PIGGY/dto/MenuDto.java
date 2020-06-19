package com.piggy.PIGGY.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MenuDto {

	private Long sId;
	private String menuName;
	private Integer price;
	
}
