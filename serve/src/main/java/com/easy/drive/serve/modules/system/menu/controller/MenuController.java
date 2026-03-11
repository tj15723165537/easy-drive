package com.easy.drive.serve.modules.system.menu.controller;

import com.easy.drive.serve.common.result.Result;
import com.easy.drive.serve.modules.system.menu.dto.MenuDTO;
import com.easy.drive.serve.modules.system.menu.service.IMenuService;
import com.easy.drive.serve.modules.system.menu.vo.MenuVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/system/menu")
@Tag(name = "菜单管理", description = "系统菜单的增删改查")
public class MenuController {

    @Autowired
    private IMenuService menuService;

    @GetMapping("/list")
    @Operation(summary = "获取菜单列表", description = "获取所有菜单，以树形结构返回")
    public Result<List<MenuVO>> getMenuList() {
        List<MenuVO> menuList = menuService.getMenuList();
        return Result.success(menuList);
    }

    @PostMapping
    @Operation(summary = "创建菜单", description = "创建新的菜单")
    public Result<Void> createMenu(@Valid @RequestBody MenuDTO dto) {
        menuService.createMenu(dto);
        return Result.success();
    }

    @PutMapping
    @Operation(summary = "更新菜单", description = "更新菜单信息")
    public Result<Void> updateMenu(@Valid @RequestBody MenuDTO dto) {
        menuService.updateMenu(dto);
        return Result.success();
    }

    @GetMapping("/{id}")
    @Operation(summary = "获取菜单详情", description = "根据ID获取菜单详细信息")
    public Result<MenuVO> getMenuDetail(@Parameter(description = "菜单ID") @PathVariable Long id) {
        MenuVO menu = menuService.getMenuDetail(id);
        return Result.success(menu);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除菜单", description = "根据ID删除菜单")
    public Result<Void> deleteMenu(@Parameter(description = "菜单ID") @PathVariable Long id) {
        menuService.deleteMenu(id);
        return Result.success();
    }
}