package com.easy.drive.serve.modules.car.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Schema(description = "创建车辆请求")
public class CarCreateDTO {

    @NotBlank(message = "品牌不能为空")
    @Schema(description = "品牌", example = "丰田", required = true)
    private String brand;

    @NotBlank(message = "车型不能为空")
    @Schema(description = "车型", example = "卡罗拉", required = true)
    private String model;

    @NotNull(message = "价格不能为空")
    @Min(value = 0, message = "价格不能小于0")
    @Schema(description = "价格(元)", example = "100000", required = true)
    private BigDecimal price;

    @NotNull(message = "里程数不能为空")
    @Min(value = 0, message = "里程数不能小于0")
    @Schema(description = "里程数(公里)", example = "50000", required = true)
    private Integer mileage;

    @NotNull(message = "年份不能为空")
    @Schema(description = "年份", example = "2020", required = true)
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

    @NotBlank(message = "位置不能为空")
    @Schema(description = "车辆位置", example = "北京市朝阳区", required = true)
    private String location;
}
