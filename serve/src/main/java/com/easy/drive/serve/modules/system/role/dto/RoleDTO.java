package com.easy.drive.serve.modules.system.role.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.List;

@Data
public class RoleDTO {
    private Long id;

    @NotBlank(message = "角色名称不能为空")
    private String name;

    private String description;

    private List<Long> menuIds;
}