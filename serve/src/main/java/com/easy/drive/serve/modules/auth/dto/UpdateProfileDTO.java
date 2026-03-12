package com.easy.drive.serve.modules.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
@Schema(description = "更新个人资料请求")
public class UpdateProfileDTO {

    @NotBlank(message = "昵称不能为空")
    @Schema(description = "昵称", example = "测试用户")
    private String nickname;

    @NotBlank(message = "手机号不能为空")
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    @Schema(description = "手机号", example = "13800138000")
    private String phone;

    @Schema(description = "头像URL", example = "/uploads/avatar.jpg")
    private String avatar;
}
