package com.easy.drive.serve.modules.system;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.easy.drive.serve.modules.system.user.entity.UserRole;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserRoleMapper extends BaseMapper<UserRole> {
}