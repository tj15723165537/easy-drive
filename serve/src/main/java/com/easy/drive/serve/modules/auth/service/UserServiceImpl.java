package com.easy.drive.serve.modules.auth.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.easy.drive.serve.common.constant.ResultCode;
import com.easy.drive.serve.common.exception.BusinessException;
import com.easy.drive.serve.common.util.JwtUtil;
import com.easy.drive.serve.modules.auth.dto.LoginRequestDTO;
import com.easy.drive.serve.modules.auth.dto.RegisterRequestDTO;
import com.easy.drive.serve.modules.system.menu.entity.Menu;
import com.easy.drive.serve.modules.system.menu.mapper.MenuMapper;
import com.easy.drive.serve.modules.system.menu.vo.MenuVO;
import com.easy.drive.serve.modules.system.user.entity.User;
import com.easy.drive.serve.modules.auth.mapper.UserMapper;
import com.easy.drive.serve.modules.auth.vo.LoginResponseVO;
import com.easy.drive.serve.modules.auth.vo.UserInfoVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@org.springframework.context.annotation.Primary
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private MenuMapper menuMapper;

    @Override
    public LoginResponseVO login(LoginRequestDTO request) {
        User user = userMapper.selectOne(new LambdaQueryWrapper<User>()
                .eq(User::getUsername, request.getUsername()));

        if (user == null) {
            throw new BusinessException(ResultCode.USER_NOT_EXIST);
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BusinessException(ResultCode.PASSWORD_ERROR);
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getId());

        UserInfoVO userInfo = new UserInfoVO();
        userInfo.setId(user.getId());
        userInfo.setUsername(user.getUsername());
        userInfo.setNickname(user.getNickname());
        userInfo.setPhone(user.getPhone());
        userInfo.setAvatar(user.getAvatar());
        userInfo.setStatus(user.getStatus());
        userInfo.setCreateTime(user.getCreateTime());

        LoginResponseVO response = new LoginResponseVO();
        response.setToken(token);
        response.setUserInfo(userInfo);
        return response;
    }

    @Override
    public void register(RegisterRequestDTO request) {
        User existUser = userMapper.selectOne(new LambdaQueryWrapper<User>()
                .eq(User::getUsername, request.getUsername()));

        if (existUser != null) {
            throw new BusinessException(ResultCode.USER_ALREADY_EXIST);
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setNickname(request.getNickname() != null ? request.getNickname() : request.getUsername());
        user.setStatus(1);

        userMapper.insert(user);
    }

    @Override
    public UserInfoVO getUserInfo(Long userId) {
        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new BusinessException(ResultCode.USER_NOT_EXIST);
        }

        UserInfoVO userInfo = new UserInfoVO();
        userInfo.setId(user.getId());
        userInfo.setUsername(user.getUsername());
        userInfo.setNickname(user.getNickname());
        userInfo.setPhone(user.getPhone());
        userInfo.setAvatar(user.getAvatar());
        userInfo.setStatus(user.getStatus());
        userInfo.setCreateTime(user.getCreateTime());
        return userInfo;
    }

    @Override
    public List<MenuVO> getUserMenu(Long userId) {
        List<Menu> menus = menuMapper.selectMenusByUserId(userId);
        List<MenuVO> menuVOs = menus.stream()
                .map(this::convertToMenuVO)
                .collect(Collectors.toList());
        return buildMenuTree(menuVOs, 0L);
    }

    private MenuVO convertToMenuVO(Menu menu) {
        MenuVO vo = new MenuVO();
        BeanUtils.copyProperties(menu, vo);
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
