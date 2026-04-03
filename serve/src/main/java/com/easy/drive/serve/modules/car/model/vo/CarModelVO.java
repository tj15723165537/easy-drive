package com.easy.drive.serve.modules.car.model.vo;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CarModelVO {
    private Long id;
    private Long brandId;
    private String brandName;
    private String name;
    private Integer sort;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
