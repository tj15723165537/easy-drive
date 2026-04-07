package com.easy.drive.serve.modules.car.dto;

import io.swagger.v3.oas.annotations.Parameter;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CarSearchDTO {

    @Parameter(description = "页码", example = "1")
    private Integer pageNum = 1;

    @Parameter(description = "每页大小", example = "10")
    private Integer pageSize = 10;

    @Parameter(description = "品牌", example = "1")
    private Integer brandId;

    @Parameter(description = "车型", example = "2")
    private Integer modelId;

    @Parameter(description = "年份", example = "2020")
    private Integer year;

    @Parameter(description = "状态", example = "1")
    private Integer status;
}
