package com.easy.drive.serve.modules.car.model.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.easy.drive.serve.common.config.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("t_car_brand")
public class CarBrand extends BaseEntity {
    private String name;
    private String initial;
    private Integer sort;
}
