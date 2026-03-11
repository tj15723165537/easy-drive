CREATE DATABASE IF NOT EXISTS easy_drive DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE easy_drive;

CREATE TABLE IF NOT EXISTS t_user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '用户ID',
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    password VARCHAR(255) NOT NULL COMMENT '密码',
    phone VARCHAR(20) NOT NULL COMMENT '手机号',
    nickname VARCHAR(50) COMMENT '昵称',
    avatar VARCHAR(255) COMMENT '头像',
    status INT DEFAULT 1 COMMENT '状态：1-正常，0-禁用',
    create_time DATETIME COMMENT '创建时间',
    update_time DATETIME COMMENT '更新时间',
    deleted INT DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
    INDEX idx_username (username),
    INDEX idx_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

CREATE TABLE IF NOT EXISTS t_car (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '车辆ID',
    brand VARCHAR(50) COMMENT '品牌',
    model VARCHAR(50) COMMENT '车型',
    price DECIMAL(10,2) COMMENT '价格',
    mileage INT COMMENT '里程数(公里)',
    year INT COMMENT '年份',
    color VARCHAR(20) COMMENT '颜色',
    fuel_type VARCHAR(20) COMMENT '燃料类型',
    transmission VARCHAR(20) COMMENT '变速箱',
    description TEXT COMMENT '描述',
    images VARCHAR(500) COMMENT '图片URL(逗号分隔)',
    location VARCHAR(100) COMMENT '位置',
    status INT DEFAULT 1 COMMENT '状态：1-在售，0-已售',
    user_id BIGINT COMMENT '发布用户ID',
    create_time DATETIME COMMENT '创建时间',
    update_time DATETIME COMMENT '更新时间',
    deleted INT DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
    INDEX idx_brand (brand),
    INDEX idx_price (price),
    INDEX idx_year (year),
    INDEX idx_user_id (user_id),
    FOREIGN KEY (user_id) REFERENCES t_user(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='车辆表';
