import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * 测试BCrypt密码加密和匹配
 */
public class TestBCryptPassword {
    public static void main(String[] args) {
        // 创建PasswordEncoder实例
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        // 原始密码
        String rawPassword = "123456";

        // 数据库中存储的密码（从init-data.sql中获取）
        String encodedPassword = "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";

        // 测试密码匹配
        boolean matches = passwordEncoder.matches(rawPassword, encodedPassword);

        System.out.println("原始密码: " + rawPassword);
        System.out.println("加密后密码: " + encodedPassword);
        System.out.println("密码匹配结果: " + matches);

        // 重新生成密码哈希进行对比
        System.out.println("\n重新生成的密码哈希:");
        for (int i = 0; i < 3; i++) {
            String newHash = passwordEncoder.encode(rawPassword);
            System.out.println(newHash);
            System.out.println("匹配: " + passwordEncoder.matches(rawPassword, newHash));
        }
    }
}
