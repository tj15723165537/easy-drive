package com.easy.drive.serve.modules.system.menu.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MenuDTO {
    private Long id;

    private Long parentId;

    @NotBlank(message = "菜单标题不能为空")
    private String title;

    private String icon;

    private String path;

    private Integer sort;
}