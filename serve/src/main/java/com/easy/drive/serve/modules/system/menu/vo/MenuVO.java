package com.easy.drive.serve.modules.system.menu.vo;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class MenuVO {
    private Long id;
    private Long parentId;
    private String title;
    private String icon;
    private String path;
    private Integer sort;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private List<MenuVO> children;
}