package com.piggy.PIGGY.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MatchDto {
	
	private List<StoreOutputDto> newStores;
	private List<StoreOutputDto> recommendStores;
	private BigDecimal similarity;
	
}
