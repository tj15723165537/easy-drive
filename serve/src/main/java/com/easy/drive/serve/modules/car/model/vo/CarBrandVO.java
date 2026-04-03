package com.easy.drive.serve.modules.car.model.vo;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CarBrandVO {
    private Long id;
    private String name;
    private String initial;
    private Integer sort;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
