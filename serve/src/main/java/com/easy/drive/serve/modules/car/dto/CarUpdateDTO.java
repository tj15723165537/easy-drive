package com.easy.drive.serve.modules.car.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Schema(description = "更新车辆请求")
public class CarUpdateDTO {

    @Schema(description = "品牌", example = "丰田")
    private String brand;

    @Schema(description = "车型", example = "卡罗拉")
    private String model;

    @Schema(description = "价格(元)", example = "100000")
    private BigDecimal price;

    @Schema(description = "里程数(公里)", example = "50000")
    private Integer mileage;

    @Schema(description = "年份", example = "2020")
    private Integer year;

    @Schema(description = "颜色", example = "白色")
    private String color;

    @Schema(description = "燃料类型", example = "汽油", allowableValues = {"汽油", "柴油", "电动", "混动"})
    private String fuelType;

    @Schema(description = "变速箱", example = "自动", allowableValues = {"自动", "手动", "无级变速"})
    private String transmission;

    @Schema(description = "车辆描述", example = "车况良好，无事故")
    private String description;

    @Schema(description = "图片URL(逗号分隔)", example = "/uploads/image1.jpg,/uploads/image2.jpg")
    private String images;

    @Schema(description = "位置", example = "北京市朝阳区")
    private String location;

    @Schema(description = "状态：1-在售，0-已售", example = "1")
    private Integer status;
}
