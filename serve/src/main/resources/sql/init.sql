/*
 Navicat Premium Dump SQL

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 90500 (9.5.0)
 Source Host           : localhost:3306
 Source Schema         : easy_drive

 Target Server Type    : MySQL
 Target Server Version : 90500 (9.5.0)
 File Encoding         : 65001

 Date: 13/03/2026 17:21:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_car
-- ----------------------------
DROP TABLE IF EXISTS `t_car`;
CREATE TABLE `t_car` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '车辆ID',
  `brand` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '品牌',
  `model` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '车型',
  `price` decimal(10,2) DEFAULT NULL COMMENT '价格',
  `mileage` int DEFAULT NULL COMMENT '里程数(公里)',
  `year` int DEFAULT NULL COMMENT '年份',
  `color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '颜色',
  `fuel_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '燃料类型',
  `transmission` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '变速箱',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '描述',
  `images` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '图片URL(逗号分隔)',
  `location` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '位置',
  `status` int DEFAULT '1' COMMENT '状态：1-在售，0-已售',
  `user_id` bigint DEFAULT NULL COMMENT '发布用户ID',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted` int DEFAULT '0' COMMENT '逻辑删除：0-未删除，1-已删除',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_brand` (`brand`) USING BTREE,
  KEY `idx_price` (`price`) USING BTREE,
  KEY `idx_year` (`year`) USING BTREE,
  KEY `idx_user_id` (`user_id`) USING BTREE,
  CONSTRAINT `t_car_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='车辆表';

-- ----------------------------
-- Records of t_car
-- ----------------------------
BEGIN;
INSERT INTO `t_car` (`id`, `brand`, `model`, `price`, `mileage`, `year`, `color`, `fuel_type`, `transmission`, `description`, `images`, `location`, `status`, `user_id`, `create_time`, `update_time`, `deleted`) VALUES (25, '小米', 'su7', 230000.00, 12000, 2026, '海湾蓝', '电动', '自动', '99新', '/uploads/22223eef-704d-4611-8338-f1d8e07399a0.jpg,/uploads/5787e867-c291-4d61-93a7-7a8866a83fa7.jpg', '北京市朝阳区', 1, 11, '2026-03-13 14:21:04', '2026-03-13 16:39:46', 0);
COMMIT;

-- ----------------------------
-- Table structure for t_menu
-- ----------------------------
DROP TABLE IF EXISTS `t_menu`;
CREATE TABLE `t_menu` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `parent_id` bigint DEFAULT '0' COMMENT '父菜单ID，0为顶级菜单',
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜单标题',
  `icon` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '菜单图标',
  `path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '路由路径',
  `sort` int DEFAULT '0' COMMENT '排序',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted` int DEFAULT '0' COMMENT '逻辑删除：0-未删除，1-已删除',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_parent_id` (`parent_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='菜单表';

-- ----------------------------
-- Records of t_menu
-- ----------------------------
BEGIN;
INSERT INTO `t_menu` (`id`, `parent_id`, `title`, `icon`, `path`, `sort`, `create_time`, `update_time`, `deleted`) VALUES (79, 0, '系统管理', 'SettingOutlined', '/system', 2, '2026-03-12 09:53:28', '2026-03-12 10:17:32', 0);
INSERT INTO `t_menu` (`id`, `parent_id`, `title`, `icon`, `path`, `sort`, `create_time`, `update_time`, `deleted`) VALUES (80, 79, '用户管理', 'UserOutlined', '/system/user', 3, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 0);
INSERT INTO `t_menu` (`id`, `parent_id`, `title`, `icon`, `path`, `sort`, `create_time`, `update_time`, `deleted`) VALUES (81, 79, '角色管理', 'TeamOutlined', '/system/role', 4, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 0);
INSERT INTO `t_menu` (`id`, `parent_id`, `title`, `icon`, `path`, `sort`, `create_time`, `update_time`, `deleted`) VALUES (82, 79, '菜单管理', 'MenuOutlined', '/system/menu', 5, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 0);
INSERT INTO `t_menu` (`id`, `parent_id`, `title`, `icon`, `path`, `sort`, `create_time`, `update_time`, `deleted`) VALUES (83, 0, '车辆管理', 'CarOutlined', '/car', 6, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 0);
INSERT INTO `t_menu` (`id`, `parent_id`, `title`, `icon`, `path`, `sort`, `create_time`, `update_time`, `deleted`) VALUES (84, 83, '车辆列表', 'UnorderedListOutlined', '/car/list', 7, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 0);
INSERT INTO `t_menu` (`id`, `parent_id`, `title`, `icon`, `path`, `sort`, `create_time`, `update_time`, `deleted`) VALUES (85, 83, '品牌车型管理', 'CarOutlined', '/car/model', 8, '2026-03-12 09:53:28', '2026-03-12 09:53:28', 0);
COMMIT;

-- ----------------------------
-- Table structure for t_car_brand
-- ----------------------------
DROP TABLE IF EXISTS `t_car_brand`;
CREATE TABLE `t_car_brand` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '品牌ID',
  `name` varchar(50) NOT NULL COMMENT '品牌名称',
  `initial` varchar(1) DEFAULT NULL COMMENT '首字母 A-Z',
  `sort` int DEFAULT '0',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted` int DEFAULT '0' COMMENT '逻辑删除：0-未删除，1-已删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='品牌表';

-- ----------------------------
-- Table structure for t_car_model
-- ----------------------------
DROP TABLE IF EXISTS `t_car_model`;
CREATE TABLE `t_car_model` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '车型ID',
  `brand_id` bigint NOT NULL COMMENT '所属品牌ID',
  `name` varchar(50) NOT NULL COMMENT '车型名称',
  `sort` int DEFAULT '0',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted` int DEFAULT '0' COMMENT '逻辑删除：0-未删除，1-已删除',
  PRIMARY KEY (`id`),
  KEY `idx_brand_id` (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='车型表';

-- ----------------------------
-- Table structure for t_role
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色名称',
  `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '角色描述',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted` int DEFAULT '0' COMMENT '逻辑删除：0-未删除，1-已删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `name` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='角色表';

-- ----------------------------
-- Records of t_role
-- ----------------------------
BEGIN;
INSERT INTO `t_role` (`id`, `name`, `description`, `create_time`, `update_time`, `deleted`) VALUES (1, '管理员', '系统管理员，拥有所有权限', '2026-03-11 18:03:06', '2026-03-12 10:18:58', 0);
INSERT INTO `t_role` (`id`, `name`, `description`, `create_time`, `update_time`, `deleted`) VALUES (2, '普通用户', '普通用户，拥有基本权限', '2026-03-11 18:03:06', '2026-03-12 10:19:09', 0);
COMMIT;

-- ----------------------------
-- Table structure for t_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `t_role_menu`;
CREATE TABLE `t_role_menu` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '关联ID',
  `role_id` bigint NOT NULL COMMENT '角色ID',
  `menu_id` bigint NOT NULL COMMENT '菜单ID',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted` int DEFAULT '0' COMMENT '逻辑删除：0-未删除，1-已删除',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_role_id` (`role_id`) USING BTREE,
  KEY `idx_menu_id` (`menu_id`) USING BTREE,
  CONSTRAINT `t_role_menu_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `t_role` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `t_role_menu_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `t_menu` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=572 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='角色菜单关联表';

-- ----------------------------
-- Records of t_role_menu
-- ----------------------------
BEGIN;
INSERT INTO `t_role_menu` (`id`, `role_id`, `menu_id`, `create_time`, `update_time`, `deleted`) VALUES (555, 1, 79, '2026-03-12 10:18:58', '2026-03-12 10:18:58', 0);
INSERT INTO `t_role_menu` (`id`, `role_id`, `menu_id`, `create_time`, `update_time`, `deleted`) VALUES (556, 1, 83, '2026-03-12 10:18:58', '2026-03-12 10:18:58', 0);
INSERT INTO `t_role_menu` (`id`, `role_id`, `menu_id`, `create_time`, `update_time`, `deleted`) VALUES (558, 1, 80, '2026-03-12 10:18:58', '2026-03-12 10:18:58', 0);
INSERT INTO `t_role_menu` (`id`, `role_id`, `menu_id`, `create_time`, `update_time`, `deleted`) VALUES (559, 1, 81, '2026-03-12 10:18:58', '2026-03-12 10:18:58', 0);
INSERT INTO `t_role_menu` (`id`, `role_id`, `menu_id`, `create_time`, `update_time`, `deleted`) VALUES (560, 1, 82, '2026-03-12 10:18:58', '2026-03-12 10:18:58', 0);
INSERT INTO `t_role_menu` (`id`, `role_id`, `menu_id`, `create_time`, `update_time`, `deleted`) VALUES (561, 1, 84, '2026-03-12 10:18:58', '2026-03-12 10:18:58', 0);
INSERT INTO `t_role_menu` (`id`, `role_id`, `menu_id`, `create_time`, `update_time`, `deleted`) VALUES (562, 1, 85, '2026-03-12 10:18:58', '2026-03-12 10:18:58', 0);
INSERT INTO `t_role_menu` (`id`, `role_id`, `menu_id`, `create_time`, `update_time`, `deleted`) VALUES (565, 2, 83, '2026-03-12 10:19:09', '2026-03-12 10:19:09', 0);
INSERT INTO `t_role_menu` (`id`, `role_id`, `menu_id`, `create_time`, `update_time`, `deleted`) VALUES (566, 2, 84, '2026-03-12 10:19:09', '2026-03-12 10:19:09', 0);
COMMIT;

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '手机号',
  `nickname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '昵称',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '头像',
  `status` int DEFAULT '1' COMMENT '状态：1-正常，0-禁用',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted` int DEFAULT '0' COMMENT '逻辑删除：0-未删除，1-已删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `username` (`username`) USING BTREE,
  KEY `idx_username` (`username`) USING BTREE,
  KEY `idx_phone` (`phone`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='用户表';

-- ----------------------------
-- Records of t_user
-- ----------------------------
BEGIN;
INSERT INTO `t_user` (`id`, `username`, `password`, `phone`, `nickname`, `avatar`, `status`, `create_time`, `update_time`, `deleted`) VALUES (11, 'admin', '$2a$10$IvFbFXGS3LLuDFSpqZYd6etr5UjVYbnOA1Bwunp0quD47upDu/KQS', '13800138000', '系统管理员', '/uploads/1a2d5023-3912-4557-b758-e12dc108cb7f.jpg', 1, '2026-03-12 09:38:19', '2026-03-12 09:53:28', 0);
INSERT INTO `t_user` (`id`, `username`, `password`, `phone`, `nickname`, `avatar`, `status`, `create_time`, `update_time`, `deleted`) VALUES (12, 'testuser', '$2a$10$IvFbFXGS3LLuDFSpqZYd6etr5UjVYbnOA1Bwunp0quD47upDu/KQS', '13800138001', '测试用户', 'https://api.dicebear.com/7.x/avataaars/svg?seed=testuser', 1, '2026-03-12 09:38:19', '2026-03-12 10:23:41', 0);
COMMIT;

-- ----------------------------
-- Table structure for t_user_role
-- ----------------------------
DROP TABLE IF EXISTS `t_user_role`;
CREATE TABLE `t_user_role` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '关联ID',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `role_id` bigint NOT NULL COMMENT '角色ID',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted` int DEFAULT '0' COMMENT '逻辑删除：0-未删除，1-已删除',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_user_id` (`user_id`) USING BTREE,
  KEY `idx_role_id` (`role_id`) USING BTREE,
  CONSTRAINT `t_user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `t_user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `t_role` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='用户角色关联表';

-- ----------------------------
-- Records of t_user_role
-- ----------------------------
BEGIN;
INSERT INTO `t_user_role` (`id`, `user_id`, `role_id`, `create_time`, `update_time`, `deleted`) VALUES (16, 11, 1, '2026-03-12 09:38:19', '2026-03-12 09:38:19', 0);
INSERT INTO `t_user_role` (`id`, `user_id`, `role_id`, `create_time`, `update_time`, `deleted`) VALUES (17, 12, 2, '2026-03-12 09:38:19', '2026-03-12 09:38:19', 1);
INSERT INTO `t_user_role` (`id`, `user_id`, `role_id`, `create_time`, `update_time`, `deleted`) VALUES (25, 12, 2, '2026-03-12 10:23:36', '2026-03-12 10:23:36', 1);
INSERT INTO `t_user_role` (`id`, `user_id`, `role_id`, `create_time`, `update_time`, `deleted`) VALUES (26, 12, 2, '2026-03-12 10:23:41', '2026-03-12 10:23:41', 0);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
