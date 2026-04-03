package com.easy.drive.serve.modules.car.model.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.easy.drive.serve.common.config.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("t_car_model")
public class CarModel extends BaseEntity {
    private Long brandId;
    private String name;
    private Integer sort;
}
