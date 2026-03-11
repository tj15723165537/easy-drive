package com.easy.drive.serve.modules.system.role.vo;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class RoleVO {
    private Long id;
    private String name;
    private String description;
    private List<Long> menuIds;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}