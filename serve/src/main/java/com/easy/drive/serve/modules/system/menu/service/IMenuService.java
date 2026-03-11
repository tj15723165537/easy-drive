package com.easy.drive.serve.modules.system.menu.service;

import com.easy.drive.serve.modules.system.menu.dto.MenuDTO;
import com.easy.drive.serve.modules.system.menu.vo.MenuVO;

import java.util.List;

public interface IMenuService {
    List<MenuVO> getMenuList();

    void createMenu(MenuDTO dto);

    void updateMenu(MenuDTO dto);

    MenuVO getMenuDetail(Long id);

    void deleteMenu(Long id);
}