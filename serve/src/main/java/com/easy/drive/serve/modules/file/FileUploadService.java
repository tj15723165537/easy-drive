package com.easy.drive.serve.modules.file;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Component
public class FileUploadService {

    @Value("${file.upload-path}")
    private String uploadPath;

    @Value("${file.allowed-extensions}")
    private String allowedExtensions;

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024;

    public String uploadFile(MultipartFile file) throws IOException {
        validateFile(file);

        String originalFilename = file.getOriginalFilename();
        String extension = getFileExtension(originalFilename);
        String newFilename = UUID.randomUUID().toString() + "." + extension;

        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        Path filePath = Paths.get(uploadPath, newFilename);
        Files.copy(file.getInputStream(), filePath);

        return "/uploads/" + newFilename;
    }

    public void deleteFile(String fileUrl) throws IOException {
        String filename = fileUrl.substring("/uploads/".length());
        Path filePath = Paths.get(uploadPath, filename);
        Files.deleteIfExists(filePath);
    }

    private void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("文件不能为空");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new RuntimeException("文件大小不能超过10MB");
        }

        String originalFilename = file.getOriginalFilename();
        String extension = getFileExtension(originalFilename);

        List<String> allowedList = Arrays.asList(allowedExtensions.split(","));
        if (!allowedList.contains(extension.toLowerCase())) {
            throw new RuntimeException("不支持的文件类型：" + extension);
        }
    }

    private String getFileExtension(String filename) {
        if (filename == null || filename.isEmpty()) {
            return "";
        }
        int lastDotIndex = filename.lastIndexOf('.');
        if (lastDotIndex == -1) {
            return "";
        }
        return filename.substring(lastDotIndex + 1);
    }
}
