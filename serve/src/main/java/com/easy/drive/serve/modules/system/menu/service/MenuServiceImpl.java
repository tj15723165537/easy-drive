package com.easy.drive.serve.modules.system.menu.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.easy.drive.serve.common.exception.BusinessException;
import com.easy.drive.serve.modules.system.menu.dto.MenuDTO;
import com.easy.drive.serve.modules.system.menu.entity.Menu;
import com.easy.drive.serve.modules.system.menu.mapper.MenuMapper;
import com.easy.drive.serve.modules.system.menu.vo.MenuVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@org.springframework.context.annotation.Primary
public class MenuServiceImpl implements IMenuService {

    @Autowired
    private MenuMapper menuMapper;

    @Override
    public List<MenuVO> getMenuList() {
        List<Menu> allMenus = menuMapper.selectList(new LambdaQueryWrapper<>());
        List<MenuVO> menuVOs = allMenus.stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
        return buildMenuTree(menuVOs, 0L);
    }

    @Override
    public void createMenu(MenuDTO dto) {
        Menu menu = new Menu();
        BeanUtils.copyProperties(dto, menu);
        if (menu.getParentId() == null) {
            menu.setParentId(0L);
        }
        if (menu.getSort() == null) {
            menu.setSort(0);
        }
        menuMapper.insert(menu);
    }

    @Override
    public void updateMenu(MenuDTO dto) {
        if (dto.getId() == null) {
            throw new BusinessException("菜单ID不能为空");
        }
        Menu existMenu = menuMapper.selectById(dto.getId());
        if (existMenu == null) {
            throw new BusinessException("菜单不存在");
        }
        Menu menu = new Menu();
        BeanUtils.copyProperties(dto, menu);
        menuMapper.updateById(menu);
    }

    @Override
    public MenuVO getMenuDetail(Long id) {
        Menu menu = menuMapper.selectById(id);
        if (menu == null) {
            throw new BusinessException("菜单不存在");
        }
        return convertToVO(menu);
    }

    @Override
    public void deleteMenu(Long id) {
        LambdaQueryWrapper<Menu> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Menu::getParentId, id);
        Long count = menuMapper.selectCount(wrapper);
        if (count > 0) {
            throw new BusinessException("该菜单下存在子菜单，无法删除");
        }
        menuMapper.deleteById(id);
    }

    private MenuVO convertToVO(Menu menu) {
        MenuVO vo = new MenuVO();
        BeanUtils.copyProperties(menu, vo);
        vo.setParentId(menu.getParentId());
        return vo;
    }

    private List<MenuVO> buildMenuTree(List<MenuVO> menuList, Long parentId) {
        List<MenuVO> tree = new ArrayList<>();
        for (MenuVO menu : menuList) {
            if (menu.getParentId().equals(parentId)) {
                List<MenuVO> children = buildMenuTree(menuList, menu.getId());
                menu.setChildren(children);
                tree.add(menu);
            }
        }
        return tree;
    }
}