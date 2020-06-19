package com.piggy.PIGGY.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SignupDto {
	
	private String email;
	private String password;
	private String nickname;
	private String image;
	private Boolean superuser;
}
