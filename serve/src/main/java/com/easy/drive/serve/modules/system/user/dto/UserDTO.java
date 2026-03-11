package com.easy.drive.serve.modules.system.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;

    @NotBlank(message = "用户名不能为空")
    @Pattern(regexp = "^[a-zA-Z0-9_]{4,20}$", message = "用户名必须为4-20位字母、数字或下划线")
    private String username;

    private String password;

    private String nickname;

    private Long roleId;

    private Integer status;
}