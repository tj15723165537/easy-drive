package com.easy.drive.serve.modules.car.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Schema(description = "车辆信息")
public class CarInfoVO {

    @Schema(description = "车辆ID", example = "1")
    private Long id;

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

    @Schema(description = "燃料类型", example = "汽油")
    private String fuelType;

    @Schema(description = "变速箱", example = "自动")
    private String transmission;

    @Schema(description = "车辆描述", example = "车况良好，无事故")
    private String description;

    @Schema(description = "图片URL列表")
    private java.util.List<String> imageList;

    @Schema(description = "提车地址", example = "北京市朝阳区")
    private String pickupLocation;

    @Schema(description = "状态：1-已上线，0-已下下线", example = "1")
    private Integer status;

    @Schema(description = "发布用户ID", example = "1")
    private Long userId;

    @Schema(description = "发布用户名", example = "testuser")
    private String username;

    @Schema(description = "创建时间", example = "2024-01-01 12:00:00")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    @Schema(description = "更新时间", example = "2024-01-01 12:00:00")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateTime;
}
