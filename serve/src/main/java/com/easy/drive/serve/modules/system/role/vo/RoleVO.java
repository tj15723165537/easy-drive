package com.easy.drive.serve.modules.system.role.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class RoleVO {
    private Long id;
    private String name;
    private String description;

    @JsonProperty("menuIds")
    private List<Long> menuIds;

    @JsonProperty("created_at")
    private LocalDateTime createTime;

    @JsonProperty("updated_at")
    private LocalDateTime updateTime;
}