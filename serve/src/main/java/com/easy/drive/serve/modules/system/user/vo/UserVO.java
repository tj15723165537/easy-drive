package com.easy.drive.serve.modules.system.user.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UserVO {
    private Long id;
    private String username;
    private String phone;

    @JsonProperty("nick_name")
    private String nickname;

    private Integer status;

    @JsonProperty("roleId")
    private Long roleId;

    @JsonProperty("created_at")
    private LocalDateTime createTime;

    @JsonProperty("updated_at")
    private LocalDateTime updateTime;
}