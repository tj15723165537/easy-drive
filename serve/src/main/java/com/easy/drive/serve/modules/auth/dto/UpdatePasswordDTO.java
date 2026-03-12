package com.easy.drive.serve.modules.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "修改密码请求")
public class UpdatePasswordDTO {

    @NotBlank(message = "当前密码不能为空")
    @Schema(description = "当前密码", example = "oldpassword123")
    private String oldPassword;

    @NotBlank(message = "新密码不能为空")
    @Size(min = 6, message = "新密码长度至少6位")
    @Schema(description = "新密码", example = "newpassword123")
    private String newPassword;
}
