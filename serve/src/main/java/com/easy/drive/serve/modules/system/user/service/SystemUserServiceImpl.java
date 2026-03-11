package com.easy.drive.serve.modules.system;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.easy.drive.serve.common.exception.BusinessException;
import com.easy.drive.serve.modules.system.user.dto.UserDTO;
import com.easy.drive.serve.modules.system.user.entity.UserRole;
import com.easy.drive.serve.modules.system.user.service.ISystemUserService;
import com.easy.drive.serve.modules.system.user.vo.UserVO;
import com.easy.drive.serve.modules.system.user.entity.User;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@org.springframework.context.annotation.Primary
public class SystemUserServiceImpl implements ISystemUserService {

    @Autowired
    private com.easy.drive.serve.modules.system.SystemUserMapper systemUserMapper;

    @Autowired
    private com.easy.drive.serve.modules.system.UserRoleMapper userRoleMapper;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public Page<UserVO> getUserPage(Integer pageNum, Integer pageSize, String username) {
        Page<User> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        if (username != null && !username.isEmpty()) {
            wrapper.like(User::getUsername, username);
        }
        Page<User> userPage = systemUserMapper.selectPage(page, wrapper);
        return convertToPageVO(userPage);
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
        return vo;
    }

    private Page<UserVO> convertToPageVO(Page<User> userPage) {
        Page<UserVO> pageVO = new Page<>(userPage.getCurrent(), userPage.getSize(), userPage.getTotal());
        pageVO.setRecords(userPage.getRecords()
                .stream()
                .map(this::convertToVO)
                .collect(Collectors.toList()));
        return pageVO;
    }
}