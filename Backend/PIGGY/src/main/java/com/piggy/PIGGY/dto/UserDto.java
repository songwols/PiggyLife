package com.piggy.PIGGY.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDto {
	
	private String email;
	private String nickname;
	private Integer ranking;
	private String image;
	private String imageName;
	private Boolean superuser;
	
}
