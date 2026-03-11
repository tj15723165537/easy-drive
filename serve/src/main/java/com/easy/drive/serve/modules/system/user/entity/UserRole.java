package com.easy.drive.serve.modules.system.user.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.easy.drive.serve.common.config.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("t_user_role")
public class UserRole extends BaseEntity {
    private Long userId;

    private Long roleId;
}