package com.easy.drive.serve.modules.system.user.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.easy.drive.serve.modules.system.user.dto.UserDTO;
import com.easy.drive.serve.modules.system.user.vo.UserVO;

public interface ISystemUserService {
    Page<UserVO> getUserPage(Integer pageNum, Integer pageSize, String username);

    void createUser(UserDTO dto);

    void updateUser(UserDTO dto);

    UserVO getUserDetail(Long id);

    void deleteUser(Long id);
}