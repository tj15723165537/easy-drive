package com.easy.drive.serve.modules.file.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "文件上传响应")
public class FileUploadVO {

    @Schema(description = "文件访问URL", example = "/uploads/abc123.jpg")
    private String fileUrl;

    @Schema(description = "文件名", example = "abc123.jpg")
    private String filename;

    @Schema(description = "文件大小(字节)", example = "102400")
    private Long size;
}
