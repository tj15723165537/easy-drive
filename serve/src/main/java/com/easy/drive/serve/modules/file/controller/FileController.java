package com.easy.drive.serve.modules.file.controller;

import com.easy.drive.serve.common.result.Result;
import com.easy.drive.serve.modules.file.service.FileUploadService;
import com.easy.drive.serve.modules.file.vo.FileUploadVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/files")
@Tag(name = "文件管理", description = "文件上传和删除")
public class FileController {

    @Resource
    private FileUploadService fileUploadService;

    @PostMapping("/upload")
    @Operation(summary = "上传文件", description = "上传图片文件，支持jpg、jpeg、png、gif、webp格式")
    public Result<FileUploadVO> uploadFile(@Parameter(description = "文件", required = true) @RequestParam("file") MultipartFile file) {
        try {
            String fileUrl = fileUploadService.uploadFile(file);
            
            FileUploadVO vo = new FileUploadVO();
            vo.setFileUrl(fileUrl);
            vo.setFilename(file.getOriginalFilename());
            vo.setSize(file.getSize());
            
            return Result.success(vo);
        } catch (IOException e) {
            return Result.fail("文件上传失败：" + e.getMessage());
        }
    }

    @DeleteMapping
    @Operation(summary = "删除文件", description = "根据文件URL删除文件")
    public Result<Void> deleteFile(@Parameter(description = "文件URL", example = "/uploads/abc123.jpg", required = true) @RequestParam("fileUrl") String fileUrl) {
        try {
            fileUploadService.deleteFile(fileUrl);
            return Result.success();
        } catch (IOException e) {
            return Result.fail("文件删除失败：" + e.getMessage());
        }
    }
}
