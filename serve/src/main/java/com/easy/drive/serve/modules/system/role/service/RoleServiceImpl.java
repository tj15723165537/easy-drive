package com.easy.drive.serve.modules.system.role.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.easy.drive.serve.common.exception.BusinessException;
import com.easy.drive.serve.common.result.PageResult;
import com.easy.drive.serve.modules.system.role.dto.RoleDTO;
import com.easy.drive.serve.modules.system.role.entity.Role;
import com.easy.drive.serve.modules.system.role.entity.RoleMenu;
import com.easy.drive.serve.modules.system.role.mapper.RoleMapper;
import com.easy.drive.serve.modules.system.role.mapper.RoleMenuMapper;
import com.easy.drive.serve.modules.system.role.vo.RoleVO;
import org.springframework.beans.BeanUtils;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@org.springframework.context.annotation.Primary
public class RoleServiceImpl implements IRoleService {

    @Resource
    private RoleMapper roleMapper;

    @Resource
    private RoleMenuMapper roleMenuMapper;

    @Override
    public PageResult<RoleVO> getRolePage(Integer current, Integer pageSize, String name) {
        Page<Role> page = new Page<>(current, pageSize);
        LambdaQueryWrapper<Role> wrapper = new LambdaQueryWrapper<>();
        if (name != null && !name.isEmpty()) {
            wrapper.like(Role::getName, name);
        }
        Page<Role> rolePage = roleMapper.selectPage(page, wrapper);
        return convertToPageResult(rolePage);
    }

    @Override
    public List<RoleVO> getRoleList() {
        List<Role> roles = roleMapper.selectList(new LambdaQueryWrapper<>());
        return roles.stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void createRole(RoleDTO dto) {
        Role role = new Role();
        BeanUtils.copyProperties(dto, role);
        roleMapper.insert(role);

        if (dto.getMenuIds() != null && !dto.getMenuIds().isEmpty()) {
            for (Long menuId : dto.getMenuIds()) {
                RoleMenu roleMenu = new RoleMenu();
                roleMenu.setRoleId(role.getId());
                roleMenu.setMenuId(menuId);
                roleMenuMapper.insert(roleMenu);
            }
        }
    }

    @Override
    @Transactional
    public void updateRole(RoleDTO dto) {
        if (dto.getId() == null) {
            throw new BusinessException("角色ID不能为空");
        }
        Role existRole = roleMapper.selectById(dto.getId());
        if (existRole == null) {
            throw new BusinessException("角色不存在");
        }

        Role role = new Role();
        BeanUtils.copyProperties(dto, role);
        roleMapper.updateById(role);

        LambdaQueryWrapper<RoleMenu> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(RoleMenu::getRoleId, dto.getId());
        roleMenuMapper.delete(wrapper);

        if (dto.getMenuIds() != null && !dto.getMenuIds().isEmpty()) {
            for (Long menuId : dto.getMenuIds()) {
                RoleMenu roleMenu = new RoleMenu();
                roleMenu.setRoleId(dto.getId());
                roleMenu.setMenuId(menuId);
                roleMenuMapper.insert(roleMenu);
            }
        }
    }

    @Override
    public RoleVO getRoleDetail(Long id) {
        Role role = roleMapper.selectById(id);
        if (role == null) {
            throw new BusinessException("角色不存在");
        }
        return convertToVO(role);
    }

    @Override
    @Transactional
    public void deleteRole(Long id) {
        roleMapper.deleteById(id);

        LambdaQueryWrapper<RoleMenu> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(RoleMenu::getRoleId, id);
        roleMenuMapper.delete(wrapper);
    }

    private RoleVO convertToVO(Role role) {
        RoleVO vo = new RoleVO();
        BeanUtils.copyProperties(role, vo);

        LambdaQueryWrapper<RoleMenu> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(RoleMenu::getRoleId, role.getId());
        List<RoleMenu> roleMenus = roleMenuMapper.selectList(wrapper);
        List<Long> menuIds = roleMenus.stream()
                .map(RoleMenu::getMenuId)
                .collect(Collectors.toList());
        vo.setMenuIds(menuIds);

        return vo;
    }

    private PageResult<RoleVO> convertToPageResult(Page<Role> rolePage) {
        List<RoleVO> records = rolePage.getRecords()
                .stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
        return new PageResult<>(records, rolePage.getTotal());
    }
}
