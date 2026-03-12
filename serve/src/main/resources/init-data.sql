-- =============================================
-- Easy Drive 数据库初始化脚本
-- 作者：系统初始化
-- 日期：2026-03-11
-- 描述：初始化基础数据（角色、菜单、用户、权限关联）
-- =============================================

-- 使用数据库
USE easy_drive;

-- 1. 插入基础角色数据
INSERT INTO t_role (name, description, create_time, update_time, deleted)
VALUES
('admin', '系统管理员，拥有所有权限', NOW(), NOW(), 0),
('user', '普通用户，拥有基本权限', NOW(), NOW(), 0)
ON DUPLICATE KEY UPDATE
description = VALUES(description),
update_time = NOW();

-- 2. 插入基础菜单数据
INSERT INTO t_menu (parent_id, title, icon, path, sort, create_time, update_time, deleted)
VALUES
-- 首页
(0, '首页', 'HomeOutlined', '/home', 1, NOW(), NOW(), 0),
-- 系统管理模块
(0, '系统管理', 'SettingOutlined', '/system', 2, NOW(), NOW(), 0),
(2, '用户管理', 'UserOutlined', '/system/user', 3, NOW(), NOW(), 0),
(2, '角色管理', 'TeamOutlined', '/system/role', 4, NOW(), NOW(), 0),
(2, '菜单管理', 'MenuOutlined', '/system/menu', 5, NOW(), NOW(), 0),
-- 车辆管理模块
(0, '车辆管理', 'CarOutlined', '/car', 6, NOW(), NOW(), 0),
(6, '车辆列表', 'UnorderedListOutlined', '/car/list', 7, NOW(), NOW(), 0),
(6, '车辆发布', 'UploadOutlined', '/car/publish', 8, NOW(), NOW(), 0),
-- 个人中心
(0, '个人中心', 'UserOutlined', '/profile', 9, NOW(), NOW(), 0),
(9, '个人信息', 'InfoCircleOutlined', '/profile/info', 10, NOW(), NOW(), 0),
(9, '我的车辆', 'CarOutlined', '/profile/cars', 11, NOW(), NOW(), 0)
ON DUPLICATE KEY UPDATE
title = VALUES(title),
icon = VALUES(icon),
path = VALUES(path),
sort = VALUES(sort),
update_time = NOW();

-- 3. 插入测试用户数据（密码：123456，已使用BCrypt加密）
INSERT INTO t_user (username, password, phone, nickname, avatar, status, create_time, update_time, deleted)
VALUES
('admin', '$2a$10$IvFbFXGS3LLuDFSpqZYd6etr5UjVYbnOA1Bwunp0quD47upDu/KQS', '13800138000', '系统管理员', 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin', 1, NOW(), NOW(), 0),
('testuser', '$2a$10$IvFbFXGS3LLuDFSpqZYd6etr5UjVYbnOA1Bwunp0quD47upDu/KQS', '13800138001', '测试用户', 'https://api.dicebear.com/7.x/avataaars/svg?seed=testuser', 1, NOW(), NOW(), 0)
ON DUPLICATE KEY UPDATE
phone = VALUES(phone),
nickname = VALUES(nickname),
avatar = VALUES(avatar),
status = VALUES(status),
update_time = NOW();

-- 4. 插入角色菜单关联数据（管理员拥有所有菜单权限，普通用户拥有部分权限）
-- 管理员拥有所有菜单权限
INSERT INTO t_role_menu (role_id, menu_id, create_time, update_time, deleted)
SELECT r.id, m.id, NOW(), NOW(), 0
FROM t_role r, t_menu m
WHERE r.name = 'admin'
ON DUPLICATE KEY UPDATE
update_time = NOW();

-- 普通用户拥有的菜单权限
INSERT INTO t_role_menu (role_id, menu_id, create_time, update_time, deleted)
SELECT r.id, m.id, NOW(), NOW(), 0
FROM t_role r, t_menu m
WHERE r.name = 'user' AND m.id IN (1, 6, 7, 9, 10, 11)
ON DUPLICATE KEY UPDATE
update_time = NOW();

-- 5. 插入用户角色关联数据
INSERT INTO t_user_role (user_id, role_id, create_time, update_time, deleted)
SELECT u.id, r.id, NOW(), NOW(), 0
FROM t_user u, t_role r
WHERE (u.username = 'admin' AND r.name = 'admin') OR (u.username = 'testuser' AND r.name = 'user')
ON DUPLICATE KEY UPDATE
update_time = NOW();

-- 6. 插入测试车辆数据
INSERT INTO t_car (brand, model, price, mileage, year, color, fuel_type, transmission, description, images, location, status, user_id, create_time, update_time, deleted)
VALUES
('丰田', '凯美瑞', 180000.00, 50000, 2020, '黑色', '汽油', '自动', '2020款丰田凯美瑞，车况良好，定期保养', 'https://picsum.photos/seed/car1/800/600.jpg,https://picsum.photos/seed/car2/800/600.jpg', '北京', 1, 2, NOW(), NOW(), 0),
('本田', '雅阁', 160000.00, 60000, 2019, '白色', '汽油', '自动', '2019款本田雅阁，经济实惠，适合家用', 'https://picsum.photos/seed/car3/800/600.jpg,https://picsum.photos/seed/car4/800/600.jpg', '上海', 1, 2, NOW(), NOW(), 0),
('大众', '迈腾', 170000.00, 55000, 2020, '灰色', '汽油', '自动', '2020款大众迈腾，商务首选，空间宽敞', 'https://picsum.photos/seed/car5/800/600.jpg,https://picsum.photos/seed/car6/800/600.jpg', '广州', 1, 2, NOW(), NOW(), 0)
ON DUPLICATE KEY UPDATE
price = VALUES(price),
mileage = VALUES(mileage),
year = VALUES(year),
color = VALUES(color),
fuel_type = VALUES(fuel_type),
transmission = VALUES(transmission),
description = VALUES(description),
images = VALUES(images),
location = VALUES(location),
status = VALUES(status),
user_id = VALUES(user_id),
update_time = NOW();

-- 验证插入结果
SELECT '角色数据' as type, count(*) as count FROM t_role WHERE deleted = 0
UNION ALL
SELECT '菜单数据' as type, count(*) as count FROM t_menu WHERE deleted = 0
UNION ALL
SELECT '用户数据' as type, count(*) as count FROM t_user WHERE deleted = 0
UNION ALL
SELECT '角色菜单关联数据' as type, count(*) as count FROM t_role_menu WHERE deleted = 0
UNION ALL
SELECT '用户角色关联数据' as type, count(*) as count FROM t_user_role WHERE deleted = 0
UNION ALL
SELECT '车辆数据' as type, count(*) as count FROM t_car WHERE deleted = 0;
