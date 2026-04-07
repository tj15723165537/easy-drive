package com.easy.drive.serve.modules.system.user.controller;

import com.easy.drive.serve.common.result.PageResult;
import com.easy.drive.serve.common.result.Result;
import com.easy.drive.serve.modules.system.user.dto.UserDTO;
import com.easy.drive.serve.modules.system.user.service.ISystemUserService;
import com.easy.drive.serve.modules.system.user.vo.UserVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/system/user")
@Tag(name = "用户管理", description = "系统用户的增删改查")
public class SystemUserController {

    @Resource
    private ISystemUserService userService;

    @GetMapping("/page")
    @Operation(summary = "分页获取用户列表", description = "根据条件分页查询用户")
    public Result<PageResult<UserVO>> getUserPage(
            @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer current,
            @Parameter(description = "每页大小") @RequestParam(defaultValue = "10") Integer pageSize,
            @Parameter(description = "用户名") @RequestParam(required = false) String username) {
        PageResult<UserVO> page = userService.getUserPage(current, pageSize, username);
        return Result.success(page);
    }

    @PostMapping
    @Operation(summary = "创建用户", description = "创建新的用户")
    public Result<Void> createUser(@Valid @RequestBody UserDTO dto) {
        userService.createUser(dto);
        return Result.success();
    }

    @PutMapping
    @Operation(summary = "更新用户", description = "更新用户信息")
    public Result<Void> updateUser(@Valid @RequestBody UserDTO dto) {
        userService.updateUser(dto);
        return Result.success();
    }

    @GetMapping("/{id}")
    @Operation(summary = "获取用户详情", description = "根据ID获取用户详细信息")
    public Result<UserVO> getUserDetail(@Parameter(description = "用户ID") @PathVariable Long id) {
        UserVO user = userService.getUserDetail(id);
        return Result.success(user);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除用户", description = "根据ID删除用户")
    public Result<Void> deleteUser(@Parameter(description = "用户ID") @PathVariable Long id) {
        userService.deleteUser(id);
        return Result.success();
    }
}