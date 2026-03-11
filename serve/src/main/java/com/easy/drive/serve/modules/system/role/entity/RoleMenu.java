package com.easy.drive.serve.modules.system.role.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.easy.drive.serve.common.config.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("t_role_menu")
public class RoleMenu extends BaseEntity {
    private Long roleId;

    private Long menuId;
}