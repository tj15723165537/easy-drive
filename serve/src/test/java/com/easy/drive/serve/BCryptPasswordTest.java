package com.easy.drive.serve;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class BCryptPasswordTest {

    @Test
    public void generateBCryptPassword() {
        // 创建PasswordEncoder实例
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        // 原始密码
        String rawPassword = "123456";

        // 生成密码哈希
        String encodedPassword = passwordEncoder.encode(rawPassword);
        System.out.println("原始密码: " + rawPassword);
        System.out.println("BCrypt密码哈希: " + encodedPassword);

        // 验证密码匹配
        boolean matches = passwordEncoder.matches(rawPassword, encodedPassword);
        System.out.println("密码匹配结果: " + matches);
    }
}
