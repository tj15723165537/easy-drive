package com.easy.drive.serve.modules.auth.controller;

import com.easy.drive.serve.common.result.Result;
import com.easy.drive.serve.modules.auth.dto.LoginRequestDTO;
import com.easy.drive.serve.modules.auth.dto.RegisterRequestDTO;
import com.easy.drive.serve.modules.auth.service.IUserService;
import com.easy.drive.serve.modules.auth.vo.LoginResponseVO;
import com.easy.drive.serve.modules.auth.vo.UserInfoVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Tag(name = "用户认证", description = "用户注册、登录、信息获取")
public class AuthController {

    @Autowired
    private IUserService userService;

    @PostMapping("/login")
    @Operation(summary = "用户登录", description = "根据用户名和密码登录，返回JWT Token和用户信息")
    public Result<LoginResponseVO> login(@Valid @RequestBody LoginRequestDTO request) {
        LoginResponseVO response = userService.login(request);
        return Result.success(response);
    }

    @PostMapping("/register")
    @Operation(summary = "用户注册", description = "创建新用户账号")
    public Result<Void> register(@Valid @RequestBody RegisterRequestDTO request) {
        userService.register(request);
        return Result.success();
    }

    @GetMapping("/userInfo")
    @Operation(summary = "获取用户信息", description = "根据JWT Token获取当前登录用户的信息")
    public Result<UserInfoVO> getUserInfo(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        UserInfoVO userInfo = userService.getUserInfo(userId);
        return Result.success(userInfo);
    }
}
