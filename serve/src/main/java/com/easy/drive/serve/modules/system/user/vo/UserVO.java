package com.easy.drive.serve.modules.system.user.vo;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UserVO {
    private Long id;
    private String username;
    private String nickname;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}