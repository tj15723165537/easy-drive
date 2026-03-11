package com.easy.drive.serve.modules.user;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.easy.drive.serve.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper extends BaseMapper<User> {
}
