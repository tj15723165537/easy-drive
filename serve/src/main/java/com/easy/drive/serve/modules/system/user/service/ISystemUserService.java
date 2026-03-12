package com.easy.drive.serve.modules.system.user.service;

import com.easy.drive.serve.common.result.PageResult;
import com.easy.drive.serve.modules.system.user.dto.UserDTO;
import com.easy.drive.serve.modules.system.user.vo.UserVO;

public interface ISystemUserService {
    PageResult<UserVO> getUserPage(Integer current, Integer pageSize, String username);

    void createUser(UserDTO dto);

    void updateUser(UserDTO dto);

    UserVO getUserDetail(Long id);

    void deleteUser(Long id);
}