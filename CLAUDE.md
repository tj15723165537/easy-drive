# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Easy Drive 是一个全栈云原生二手车交易平台，采用现代化微服务架构。提供车辆信息管理、在线交易、用户管理和系统管理等功能。

## 技术栈

**后端：**
- Java 21 + Spring Boot 3.2.5
- MyBatis Plus 3.5.9 ORM框架
- Spring Security + JWT (0.12.3) 身份认证
- Knife4j 4.5.0 API文档（OpenAPI3标准）
- MySQL 9.1.0 数据库
- Lombok、Hutool 工具库

**前端：**
- React 18 + TypeScript
- Vite 2.9.9 构建工具
- Ant Design 5.27.4 UI组件库
- Zustand 5.0.8 状态管理
- React Router v6、Axios、ECharts

## 项目结构

```
easy-drive/
├── admin/                    # 前端应用
│   ├── src/
│   │   ├── api/             # API接口定义
│   │   ├── components/      # 可复用UI组件
│   │   ├── hooks/           # 自定义React hooks
│   │   ├── layouts/         # 布局组件
│   │   ├── routers/         # 路由配置
│   │   ├── store/           # Zustand状态管理
│   │   ├── views/           # 页面组件
│   │   └── utils/           # 工具函数
│   └── package.json
├── serve/                    # 后端应用
│   ├── src/main/java/com/easy/drive/serve/
│   │   ├── common/          # 通用工具和配置
│   │   │   ├── config/      # Swagger、WebMvc、MyBatis Plus配置
│   │   │   ├── exception/   # 全局异常处理
│   │   │   ├── result/      # 统一响应包装
│   │   │   └── util/        # JWT工具类
│   │   ├── modules/
│   │   │   ├── auth/        # 用户认证与用户管理
│   │   │   ├── car/         # 车辆管理（controller/entity/mapper/service）
│   │   │   ├── file/        # 文件上传服务
│   │   │   └── system/      # 系统管理（菜单、角色、权限）
│   │   └── resources/
│   │       └── schema.sql   # 数据库架构
│   └── pom.xml
├── AGENTS.md                 # 开发指南
└── README.md
```

## 核心模块

**认证模块** - 用户注册、JWT令牌登录、BCrypt密码加密、令牌生成与验证。

**车辆管理模块** - 车辆CRUD操作、高级筛选搜索（品牌、型号、价格、年份）、分页、图片管理、车辆状态管理。

**系统管理** - 用户管理、角色权限管理、动态路由菜单管理、RBAC访问控制。

**文件管理** - 图片和文档的文件上传服务。

## 常用命令

### 前端（admin目录）

```bash
cd admin

# 安装依赖
pnpm install

# 开发服务器（localhost:5173）
pnpm dev

# 生产构建
pnpm build:pro

# 开发环境构建
pnpm build:dev

# TypeScript类型检查
npx tsc --noEmit

# 代码格式化
npx prettier --write "src/**/*.{ts,tsx,js,jsx,less,css,json}"
```

### 后端（serve目录）

```bash
cd serve
```

## 开发规范

### 前端
- 使用TypeScript严格模式
- 组件命名：PascalCase（如 `LoginForm`）
- 函数/变量：camelCase（如 `getUserData`）
- 常量：UPPER_SNAKE_CASE
- 使用路径别名 `@/` 导入内部模块
- 导入顺序：React → 第三方库 → 项目内部 → 样式文件
- Zustand状态管理（位于 `src/store/`）

### 后端
- Java 21语法 + Lombok注解
- 类命名：PascalCase
- 方法/变量：camelCase
- 包名：全小写，用点分隔
- RESTful API设计
- 使用 `@Slf4j` 记录日志，`@Data` 简化Getter/Setter
- 分层架构：Controller → Service → Repository（Mapper）

### Git
- 提交消息使用中文
- 提交前运行类型检查和格式化

## 关键配置文件

- `admin/package.json` - 前端依赖和脚本
- `admin/vite.config.ts` - Vite配置
- `serve/pom.xml` - Maven依赖和构建配置
- `serve/src/main/resources/schema.sql` - 数据库架构
