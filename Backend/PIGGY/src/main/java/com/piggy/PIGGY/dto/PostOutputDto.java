package com.piggy.PIGGY.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostOutputDto {
	
	private String image;
	private String content;
	private Boolean visited;
	private Integer isLike;
	private LocalDateTime createdTimeAt;
	private LocalDateTime updateTimeAt;
	private StoreOutputDto store;

}
