package com.easy.drive.serve.modules.auth.service;

import com.easy.drive.serve.modules.auth.dto.LoginRequestDTO;
import com.easy.drive.serve.modules.auth.dto.RegisterRequestDTO;
import com.easy.drive.serve.modules.auth.vo.LoginResponseVO;
import com.easy.drive.serve.modules.auth.vo.UserInfoVO;
import com.easy.drive.serve.modules.system.menu.vo.MenuVO;

import java.util.List;

public interface IUserService {

    LoginResponseVO login(LoginRequestDTO request);

    void register(RegisterRequestDTO request);

    UserInfoVO getUserInfo(Long userId);

    List<MenuVO> getUserMenu(Long userId);
}
