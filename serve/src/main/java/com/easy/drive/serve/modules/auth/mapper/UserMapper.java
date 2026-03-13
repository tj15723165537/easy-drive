package com.easy.drive.serve.modules.auth.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.easy.drive.serve.modules.system.user.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper extends BaseMapper<User> {
    @Select("SELECT username FROM t_user WHERE id = #{userId}")
    String getUsernameById(@Param("userId") Long userId);
}
