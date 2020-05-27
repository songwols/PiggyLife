package com.piggy.PIGGY.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class PostAreaStatisticDto {
	
	private String city;
	private String area;
	private Integer cnt;
	
	public PostAreaStatisticDto (String city, String area, Integer cnt) {
		this.city = city;
		this.area = area;
		this.cnt = cnt;
	}
	
}
