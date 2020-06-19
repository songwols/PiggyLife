package com.piggy.PIGGY.dto;

import java.math.BigDecimal;
import java.util.List;

import com.piggy.PIGGY.entity.Menu;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StoreOutputDto {

	private Long sId;
	private String name;
	private String tel;
	private String address;
	private BigDecimal latitude;
	private BigDecimal longitude;
	private String category;
	private String image;
	private List<Menu> menues;
	
}
