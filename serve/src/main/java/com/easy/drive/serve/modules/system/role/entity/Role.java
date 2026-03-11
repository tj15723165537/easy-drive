package com.easy.drive.serve.modules.system.role.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.easy.drive.serve.common.config.BaseEntity;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("t_role")
public class Role extends BaseEntity {
    @NotBlank(message = "角色名称不能为空")
    private String name;

    private String description;
}