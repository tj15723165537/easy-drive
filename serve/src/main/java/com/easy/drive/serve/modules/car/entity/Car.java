package com.easy.drive.serve.modules.car.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.easy.drive.serve.common.config.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("t_car")
public class Car extends BaseEntity {
    private String brandName;
    private String modelName;
    private Integer brandId;
    private Integer modelId;
    private BigDecimal price;
    private Integer mileage;
    private Integer year;
    private String fuelType;
    private String transmission;
    private String description;
    private String images;
    private String pickupLocation;
    private Integer status;
    private Long userId;
}
