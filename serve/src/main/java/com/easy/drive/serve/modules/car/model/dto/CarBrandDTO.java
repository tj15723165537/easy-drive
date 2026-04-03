package com.easy.drive.serve.modules.car.model.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CarBrandDTO {
    private Long id;

    @NotBlank(message = "品牌名称不能为空")
    private String name;

    private String initial;

    private Integer sort;
}
