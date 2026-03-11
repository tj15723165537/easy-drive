package com.easy.drive.serve.modules.auth.service;

import com.easy.drive.serve.modules.auth.dto.LoginRequestDTO;
import com.easy.drive.serve.modules.auth.dto.RegisterRequestDTO;
import com.easy.drive.serve.modules.auth.vo.LoginResponseVO;
import com.easy.drive.serve.modules.auth.vo.UserInfoVO;

public interface IUserService {

    LoginResponseVO login(LoginRequestDTO request);

    void register(RegisterRequestDTO request);

    UserInfoVO getUserInfo(Long userId);
}
