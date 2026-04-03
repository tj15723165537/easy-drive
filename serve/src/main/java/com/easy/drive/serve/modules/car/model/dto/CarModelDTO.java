package com.easy.drive.serve.modules.car.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CarModelDTO {
    private Long id;

    @NotNull(message = "品牌ID不能为空")
    private Long brandId;

    @NotBlank(message = "车型名称不能为空")
    private String name;

    private Integer sort;
}
