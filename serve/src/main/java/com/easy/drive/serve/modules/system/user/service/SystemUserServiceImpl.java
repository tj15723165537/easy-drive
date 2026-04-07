package com.easy.drive.serve.modules.system.user.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.easy.drive.serve.common.exception.BusinessException;
import com.easy.drive.serve.common.result.PageResult;
import com.easy.drive.serve.modules.system.SystemUserMapper;
import com.easy.drive.serve.modules.system.UserRoleMapper;
import com.easy.drive.serve.modules.system.user.dto.UserDTO;
import com.easy.drive.serve.modules.system.user.entity.UserRole;
import com.easy.drive.serve.modules.system.user.vo.UserVO;
import com.easy.drive.serve.modules.system.user.entity.User;
import org.springframework.beans.BeanUtils;
import jakarta.annotation.Resource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@org.springframework.context.annotation.Primary
public class SystemUserServiceImpl implements ISystemUserService {

    @Resource
    private SystemUserMapper systemUserMapper;

    @Resource
    private UserRoleMapper userRoleMapper;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public PageResult<UserVO> getUserPage(Integer current, Integer pageSize, String username) {
        Page<User> page = new Page<>(current, pageSize);
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        if (username != null && !username.isEmpty()) {
            wrapper.like(User::getUsername, username);
        }
        Page<User> userPage = systemUserMapper.selectPage(page, wrapper);
        return convertToPageResult(userPage);
    }

    @Override
    @Transactional
    public void createUser(UserDTO dto) {
        User user = new User();
        BeanUtils.copyProperties(dto, user);
        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        } else {
            user.setPassword(passwordEncoder.encode("123456"));
        }
        if (user.getStatus() == null) {
            user.setStatus(1);
        }
        systemUserMapper.insert(user);

        if (dto.getRoleId() != null) {
            UserRole userRole = new UserRole();
            userRole.setUserId(user.getId());
            userRole.setRoleId(dto.getRoleId());
            userRoleMapper.insert(userRole);
        }
    }

    @Override
    @Transactional
    public void updateUser(UserDTO dto) {
        if (dto.getId() == null) {
            throw new BusinessException("用户ID不能为空");
        }
        User existUser = systemUserMapper.selectById(dto.getId());
        if (existUser == null) {
            throw new BusinessException("用户不存在");
        }

        User user = new User();
        BeanUtils.copyProperties(dto, user);
        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }
        systemUserMapper.updateById(user);

        LambdaQueryWrapper<UserRole> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(UserRole::getUserId, dto.getId());
        userRoleMapper.delete(wrapper);

        if (dto.getRoleId() != null) {
            UserRole userRole = new UserRole();
            userRole.setUserId(dto.getId());
            userRole.setRoleId(dto.getRoleId());
            userRoleMapper.insert(userRole);
        }
    }

    @Override
    public UserVO getUserDetail(Long id) {
        User user = systemUserMapper.selectById(id);
        if (user == null) {
            throw new BusinessException("用户不存在");
        }
        return convertToVO(user);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        systemUserMapper.deleteById(id);

        LambdaQueryWrapper<UserRole> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(UserRole::getUserId, id);
        userRoleMapper.delete(wrapper);
    }

    private UserVO convertToVO(User user) {
        UserVO vo = new UserVO();
        BeanUtils.copyProperties(user, vo);

        // 查询用户的角色ID（处理一个用户多个角色的情况）
        LambdaQueryWrapper<UserRole> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(UserRole::getUserId, user.getId());
        List<UserRole> userRoles = userRoleMapper.selectList(wrapper);
        if (!userRoles.isEmpty()) {
            vo.setRoleId(userRoles.get(0).getRoleId());
        }

        return vo;
    }

    private PageResult<UserVO> convertToPageResult(Page<User> userPage) {
        List<UserVO> records = userPage.getRecords()
                .stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
        return new PageResult<>(records, userPage.getTotal());
    }
}
