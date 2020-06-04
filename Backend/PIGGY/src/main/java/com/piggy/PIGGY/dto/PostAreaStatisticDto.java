package com.piggy.PIGGY.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostAreaStatisticDto {
	
	private String city;
	private String area;
	private Integer cnt;
	
}
