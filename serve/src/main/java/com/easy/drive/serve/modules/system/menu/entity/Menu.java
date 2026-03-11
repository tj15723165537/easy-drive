package com.easy.drive.serve.modules.system.menu.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.easy.drive.serve.common.config.BaseEntity;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("t_menu")
public class Menu extends BaseEntity {
    @NotBlank(message = "菜单标题不能为空")
    private String title;

    private String icon;

    private String path;

    private Integer sort;

    private Long parentId;
}