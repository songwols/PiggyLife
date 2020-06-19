package com.piggy.PIGGY.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostImageDto {
	
	private Long pId;
	private String image;
	private String imageName;
}
