package com.piggy.PIGGY.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostInputDto {
	
	private Long sId;
	private String content;
	private Boolean visited;
	private Integer isLike;

}
