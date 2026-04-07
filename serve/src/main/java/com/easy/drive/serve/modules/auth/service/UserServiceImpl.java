package com.easy.drive.serve.modules.auth.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.easy.drive.serve.common.constant.ResultCode;
import com.easy.drive.serve.common.exception.BusinessException;
import com.easy.drive.serve.common.util.JwtUtil;
import com.easy.drive.serve.modules.auth.dto.LoginRequestDTO;
import com.easy.drive.serve.modules.auth.dto.RegisterRequestDTO;
import com.easy.drive.serve.modules.auth.dto.UpdatePasswordDTO;
import com.easy.drive.serve.modules.auth.dto.UpdateProfileDTO;
import com.easy.drive.serve.modules.system.menu.entity.Menu;
import com.easy.drive.serve.modules.system.menu.mapper.MenuMapper;
import com.easy.drive.serve.modules.system.menu.vo.MenuVO;
import com.easy.drive.serve.modules.system.user.entity.User;
import com.easy.drive.serve.modules.auth.mapper.UserMapper;
import com.easy.drive.serve.modules.auth.vo.LoginResponseVO;
import com.easy.drive.serve.modules.auth.vo.UserInfoVO;
import org.springframework.beans.BeanUtils;
import jakarta.annotation.Resource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@org.springframework.context.annotation.Primary
public class UserServiceImpl implements IUserService {

    @Resource
    private UserMapper userMapper;

    @Resource
    private PasswordEncoder passwordEncoder;

    @Resource
    private JwtUtil jwtUtil;

    @Resource
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
        BeanUtils.copyProperties(user, userInfo);

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
        BeanUtils.copyProperties(request, user);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
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
        BeanUtils.copyProperties(user, userInfo);
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

    @Override
    public void updatePassword(Long userId, UpdatePasswordDTO dto) {
        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new BusinessException(ResultCode.USER_NOT_EXIST);
        }

        // 验证当前密码是否正确
        if (!passwordEncoder.matches(dto.getOldPassword(), user.getPassword())) {
            throw new BusinessException(ResultCode.PASSWORD_ERROR);
        }

        // 更新密码
        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userMapper.updateById(user);
    }

    @Override
    public void updateProfile(Long userId, UpdateProfileDTO dto) {
        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new BusinessException(ResultCode.USER_NOT_EXIST);
        }

        BeanUtils.copyProperties(dto, user);
        userMapper.updateById(user);
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
