package com.easy.drive.serve.modules.system.role.controller;

import com.easy.drive.serve.common.result.PageResult;
import com.easy.drive.serve.common.result.Result;
import com.easy.drive.serve.modules.system.role.dto.RoleDTO;
import com.easy.drive.serve.modules.system.role.service.IRoleService;
import com.easy.drive.serve.modules.system.role.vo.RoleVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/system/role")
@Tag(name = "角色管理", description = "系统角色的增删改查")
public class RoleController {

    @Autowired
    private IRoleService roleService;

    @GetMapping("/page")
    @Operation(summary = "分页获取角色列表", description = "根据条件分页查询角色")
    public Result<PageResult<RoleVO>> getRolePage(
            @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer current,
            @Parameter(description = "每页大小") @RequestParam(defaultValue = "10") Integer pageSize,
            @Parameter(description = "角色名称") @RequestParam(required = false) String name) {
        PageResult<RoleVO> page = roleService.getRolePage(current, pageSize, name);
        return Result.success(page);
    }

    @GetMapping("/list")
    @Operation(summary = "获取所有角色", description = "获取所有角色列表")
    public Result<List<RoleVO>> getRoleList() {
        List<RoleVO> list = roleService.getRoleList();
        return Result.success(list);
    }

    @PostMapping
    @Operation(summary = "创建角色", description = "创建新的角色")
    public Result<Void> createRole(@Valid @RequestBody RoleDTO dto) {
        roleService.createRole(dto);
        return Result.success();
    }

    @PutMapping
    @Operation(summary = "更新角色", description = "更新角色信息")
    public Result<Void> updateRole(@Valid @RequestBody RoleDTO dto) {
        roleService.updateRole(dto);
        return Result.success();
    }

    @GetMapping("/{id}")
    @Operation(summary = "获取角色详情", description = "根据ID获取角色详细信息")
    public Result<RoleVO> getRoleDetail(@Parameter(description = "角色ID") @PathVariable Long id) {
        RoleVO role = roleService.getRoleDetail(id);
        return Result.success(role);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除角色", description = "根据ID删除角色")
    public Result<Void> deleteRole(@Parameter(description = "角色ID") @PathVariable Long id) {
        roleService.deleteRole(id);
        return Result.success();
    }
}