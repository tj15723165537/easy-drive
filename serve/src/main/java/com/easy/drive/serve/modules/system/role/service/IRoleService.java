package com.easy.drive.serve.modules.system.role.service;

import com.easy.drive.serve.common.result.PageResult;
import com.easy.drive.serve.modules.system.role.dto.RoleDTO;
import com.easy.drive.serve.modules.system.role.vo.RoleVO;

import java.util.List;

public interface IRoleService {
    PageResult<RoleVO> getRolePage(Integer current, Integer pageSize, String name);

    List<RoleVO> getRoleList();

    void createRole(RoleDTO dto);

    void updateRole(RoleDTO dto);

    RoleVO getRoleDetail(Long id);

    void deleteRole(Long id);
}