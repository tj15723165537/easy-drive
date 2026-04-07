package com.easy.drive.serve.modules.car.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Schema(description = "创建车辆请求")
public class CarCreateDTO {

    @NotNull(message = "品牌不能为空")
    @Schema(description = "品牌ID", example = "1", required = true)
    private Integer brandId;

    @NotNull(message = "车型不能为空")
    @Schema(description = "车型ID", example = "1", required = true)
    private Integer modelId;

    @NotNull(message = "价格不能为空")
    @Schema(description = "价格(元)", example = "100000", required = true)
    private BigDecimal price;

    @NotNull(message = "里程数不能为空")
    @Schema(description = "里程数(公里)", example = "50000", required = true)
    private Integer mileage;

    @NotNull(message = "年份不能为空")
    @Schema(description = "年份", example = "2020", required = true)
    private Integer year;

    @Schema(description = "燃料类型", example = "汽油", allowableValues = {"汽油", "柴油", "电动", "混动"})
    private String fuelType;

    @Schema(description = "变速箱", example = "自动", allowableValues = {"自动", "手动", "无级变速"})
    private String transmission;

    @Schema(description = "车辆描述", example = "车况良好，无事故")
    private String description;

    @Schema(description = "图片URL(逗号分隔)", example = "/uploads/image1.jpg,/uploads/image2.jpg")
    private String images;

    @Schema(description = "提车地址", example = "北京市朝阳区")
    private String pickupLocation;

    @Schema(description = "状态：1-已上线，0-已下线", example = "1")
    private Integer status;
}
