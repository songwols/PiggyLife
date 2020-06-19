package com.piggy.PIGGY.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ResultDto {
	
	private Boolean success;
	private Integer code;
	private String message;
	private Object obj;
	
	public ResultDto(Boolean success, Integer code, String message) {
		super();
		this.success = success;
		this.code = code;
		this.message = message;
	}

}
