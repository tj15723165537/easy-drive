package com.easy.drive.serve.modules.user;

import com.easy.drive.serve.modules.user.dto.LoginRequestDTO;
import com.easy.drive.serve.modules.user.dto.RegisterRequestDTO;
import com.easy.drive.serve.modules.user.vo.LoginResponseVO;
import com.easy.drive.serve.modules.user.vo.UserInfoVO;

public interface IUserService {

    LoginResponseVO login(LoginRequestDTO request);

    void register(RegisterRequestDTO request);

    UserInfoVO getUserInfo(Long userId);
}
