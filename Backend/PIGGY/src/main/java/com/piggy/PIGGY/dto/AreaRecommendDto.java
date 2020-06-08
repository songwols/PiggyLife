package com.piggy.PIGGY.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AreaRecommendDto {

	private List<StoreOutputDto> recommendStores;
	private RegionDto region;
	
}
