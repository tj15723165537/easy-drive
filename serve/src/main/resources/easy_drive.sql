/*
 Navicat Premium Dump SQL

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80406 (8.4.6)
 Source Host           : localhost:3306
 Source Schema         : easy_drive

 Target Server Type    : MySQL
 Target Server Version : 80406 (8.4.6)
 File Encoding         : 65001

 Date: 12/03/2026 10:24:51
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_car
-- ----------------------------
DROP TABLE IF EXISTS `t_car`;
CREATE TABLE `t_car`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '车辆ID',
  `brand` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '品牌',
  `model` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '车型',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '价格',
  `mileage` int NULL DEFAULT NULL COMMENT '里程数(公里)',
  `year` int NULL DEFAULT NULL COMMENT '年份',
  `color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '颜色',
  `fuel_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '燃料类型',
  `transmission` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '变速箱',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '描述',
  `images` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '图片URL(逗号分隔)',
  `location` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '位置',
  `status` int NULL DEFAULT 1 COMMENT '状态：1-在售，0-已售',
  `user_id` bigint NULL DEFAULT NULL COMMENT '发布用户ID',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `deleted` int NULL DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_brand`(`brand` ASC) USING BTREE,
  INDEX `idx_price`(`price` ASC) USING BTREE,
  INDEX `idx_year`(`year` ASC) USING BTREE,
  INDEX `idx_user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `t_car_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '车辆表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_car
-- ----------------------------

-- ----------------------------
-- Table structure for t_menu
-- ----------------------------
DROP TABLE IF EXISTS `t_menu`;
CREATE TABLE `t_menu`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `parent_id` bigint NULL DEFAULT 0 COMMENT '父菜单ID，0为顶级菜单',
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜单标题',
  `icon` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '路由路径',
  `sort` int NULL DEFAULT 0 COMMENT '排序',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `deleted` int NULL DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_parent_id`(`parent_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 89 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '菜单表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_menu
-- ----------------------------
INSERT INTO `t_menu` VALUES (78, 0, '首页', 'HomeOutlined', '/home', 1, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 0);
INSERT INTO `t_menu` VALUES (79, 0, '系统管理', 'SettingOutlined', '/system', 2, '2026-03-12 09:53:28', '2026-03-12 10:17:32', 0);
INSERT INTO `t_menu` VALUES (80, 79, '用户管理', 'UserOutlined', '/system/user', 3, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 0);
INSERT INTO `t_menu` VALUES (81, 79, '角色管理', 'TeamOutlined', '/system/role', 4, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 0);
INSERT INTO `t_menu` VALUES (82, 79, '菜单管理', 'MenuOutlined', '/system/menu', 5, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 0);
INSERT INTO `t_menu` VALUES (83, 0, '车辆管理', 'CarOutlined', '/car', 6, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 0);
INSERT INTO `t_menu` VALUES (84, 83, '车辆列表', 'UnorderedListOutlined', '/car/list', 7, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 0);
INSERT INTO `t_menu` VALUES (85, 83, '车辆发布', 'UploadOutlined', '/car/publish', 8, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 0);
INSERT INTO `t_menu` VALUES (86, 0, '个人中心', 'UserOutlined', '/profile', 9, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 0);
INSERT INTO `t_menu` VALUES (87, 86, '个人信息', 'InfoCircleOutlined', '/profile/info', 10, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 0);
INSERT INTO `t_menu` VALUES (88, 86, '我的车辆', 'CarOutlined', '/profile/cars', 11, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 0);

-- ----------------------------
-- Table structure for t_role
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色名称',
  `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '角色描述',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `deleted` int NULL DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '角色表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_role
-- ----------------------------
INSERT INTO `t_role` VALUES (1, '管理员', '系统管理员，拥有所有权限', '2026-03-11 18:03:06', '2026-03-12 10:18:58', 0);
INSERT INTO `t_role` VALUES (2, '普通用户', '普通用户，拥有基本权限', '2026-03-11 18:03:06', '2026-03-12 10:19:09', 0);

-- ----------------------------
-- Table structure for t_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `t_role_menu`;
CREATE TABLE `t_role_menu`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '关联ID',
  `role_id` bigint NOT NULL COMMENT '角色ID',
  `menu_id` bigint NOT NULL COMMENT '菜单ID',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `deleted` int NULL DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_role_id`(`role_id` ASC) USING BTREE,
  INDEX `idx_menu_id`(`menu_id` ASC) USING BTREE,
  CONSTRAINT `t_role_menu_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `t_role` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `t_role_menu_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `t_menu` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 572 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '角色菜单关联表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_role_menu
-- ----------------------------
INSERT INTO `t_role_menu` VALUES (539, 1, 78, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 1);
INSERT INTO `t_role_menu` VALUES (540, 1, 79, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 1);
INSERT INTO `t_role_menu` VALUES (541, 1, 83, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 1);
INSERT INTO `t_role_menu` VALUES (542, 1, 86, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 1);
INSERT INTO `t_role_menu` VALUES (543, 1, 80, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 1);
INSERT INTO `t_role_menu` VALUES (544, 1, 81, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 1);
INSERT INTO `t_role_menu` VALUES (545, 1, 82, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 1);
INSERT INTO `t_role_menu` VALUES (546, 1, 84, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 1);
INSERT INTO `t_role_menu` VALUES (547, 1, 85, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 1);
INSERT INTO `t_role_menu` VALUES (548, 1, 87, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 1);
INSERT INTO `t_role_menu` VALUES (549, 1, 88, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 1);
INSERT INTO `t_role_menu` VALUES (554, 1, 78, '2026-03-12 10:18:58', '2026-03-12 10:18:58', 0);
INSERT INTO `t_role_menu` VALUES (555, 1, 79, '2026-03-12 10:18:58', '2026-03-12 10:18:58', 0);
INSERT INTO `t_role_menu` VALUES (556, 1, 83, '2026-03-12 10:18:58', '2026-03-12 10:18:58', 0);
INSERT INTO `t_role_menu` VALUES (557, 1, 86, '2026-03-12 10:18:58', '2026-03-12 10:18:58', 0);
INSERT INTO `t_role_menu` VALUES (558, 1, 80, '2026-03-12 10:18:58', '2026-03-12 10:18:58', 0);
INSERT INTO `t_role_menu` VALUES (559, 1, 81, '2026-03-12 10:18:58', '2026-03-12 10:18:58', 0);
INSERT INTO `t_role_menu` VALUES (560, 1, 82, '2026-03-12 10:18:58', '2026-03-12 10:18:58', 0);
INSERT INTO `t_role_menu` VALUES (561, 1, 84, '2026-03-12 10:18:58', '2026-03-12 10:18:58', 0);
INSERT INTO `t_role_menu` VALUES (562, 1, 85, '2026-03-12 10:18:58', '2026-03-12 10:18:58', 0);
INSERT INTO `t_role_menu` VALUES (563, 1, 87, '2026-03-12 10:18:58', '2026-03-12 10:18:58', 0);
INSERT INTO `t_role_menu` VALUES (564, 1, 88, '2026-03-12 10:18:58', '2026-03-12 10:18:58', 0);
INSERT INTO `t_role_menu` VALUES (565, 2, 83, '2026-03-12 10:19:09', '2026-03-12 10:19:09', 0);
INSERT INTO `t_role_menu` VALUES (566, 2, 84, '2026-03-12 10:19:09', '2026-03-12 10:19:09', 0);
INSERT INTO `t_role_menu` VALUES (567, 2, 85, '2026-03-12 10:19:09', '2026-03-12 10:19:09', 0);
INSERT INTO `t_role_menu` VALUES (568, 2, 86, '2026-03-12 10:19:09', '2026-03-12 10:19:09', 0);
INSERT INTO `t_role_menu` VALUES (569, 2, 87, '2026-03-12 10:19:09', '2026-03-12 10:19:09', 0);
INSERT INTO `t_role_menu` VALUES (570, 2, 88, '2026-03-12 10:19:09', '2026-03-12 10:19:09', 0);
INSERT INTO `t_role_menu` VALUES (571, 2, 78, '2026-03-12 10:19:09', '2026-03-12 10:19:09', 0);

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '手机号',
  `nickname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '昵称',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像',
  `status` int NULL DEFAULT 1 COMMENT '状态：1-正常，0-禁用',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `deleted` int NULL DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE,
  INDEX `idx_username`(`username` ASC) USING BTREE,
  INDEX `idx_phone`(`phone` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES (11, 'admin', '$2a$10$IvFbFXGS3LLuDFSpqZYd6etr5UjVYbnOA1Bwunp0quD47upDu/KQS', '13800138000', '系统管理员', 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin', 1, '2026-03-12 09:38:19', '2026-03-12 09:53:28', 0);
INSERT INTO `t_user` VALUES (12, 'testuser', '$2a$10$IvFbFXGS3LLuDFSpqZYd6etr5UjVYbnOA1Bwunp0quD47upDu/KQS', '13800138001', '测试用户', 'https://api.dicebear.com/7.x/avataaars/svg?seed=testuser', 1, '2026-03-12 09:38:19', '2026-03-12 10:23:41', 0);

-- ----------------------------
-- Table structure for t_user_role
-- ----------------------------
DROP TABLE IF EXISTS `t_user_role`;
CREATE TABLE `t_user_role`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '关联ID',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `role_id` bigint NOT NULL COMMENT '角色ID',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `deleted` int NULL DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_user_id`(`user_id` ASC) USING BTREE,
  INDEX `idx_role_id`(`role_id` ASC) USING BTREE,
  CONSTRAINT `t_user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `t_user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `t_role` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户角色关联表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user_role
-- ----------------------------
INSERT INTO `t_user_role` VALUES (16, 11, 1, '2026-03-12 09:38:19', '2026-03-12 09:38:19', 0);
INSERT INTO `t_user_role` VALUES (17, 12, 2, '2026-03-12 09:38:19', '2026-03-12 09:38:19', 1);
INSERT INTO `t_user_role` VALUES (25, 12, 2, '2026-03-12 10:23:36', '2026-03-12 10:23:36', 1);
INSERT INTO `t_user_role` VALUES (26, 12, 2, '2026-03-12 10:23:41', '2026-03-12 10:23:41', 0);

SET FOREIGN_KEY_CHECKS = 1;
