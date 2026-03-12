# Easy Drive - 二手车交易平台

## 项目介绍

Easy Drive 是一个现代化的二手车交易平台，提供车辆信息展示、在线交易、用户管理等核心功能。平台采用前后端分离架构，为用户提供高效、便捷的二手车交易服务。

## 技术栈

### 前端
- **框架**：React 18
- **路由**：React Router v6
- **UI组件库**：Ant Design
- **状态管理**：Zustand
- **构建工具**：Vite
- **语言**：TypeScript
- **图表库**：ECharts
- **HTTP客户端**：Axios

### 后端
- **框架**：Spring Boot
- **语言**：Java 21
- **构建工具**：Maven
- **ORM**：Spring Data JPA
- **数据库**：MySQL/PostgreSQL
- **简化工具**：Lombok

## 项目结构

```
easy-drive/
├── admin/          # 前端应用
│   ├── src/        # 源代码
│   ├── .env        # 环境变量
│   └── package.json
├── serve/          # 后端应用
│   ├── src/        # 源代码
│   └── pom.xml
└── README.md       # 项目文档
```

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8
- Java >= 21
- Maven >= 3.8
- MySQL/PostgreSQL

### 前端启动

```bash
# 进入前端目录
cd admin

# 安装依赖
pnpm install

# 开发模式启动
pnpm dev

# 生产构建
pnpm build:pro

# 类型检查
npx tsc --noEmit

# 代码格式化
npx prettier --write "src/**/*.{ts,tsx,js,jsx,less,css,json}"
```

### 后端启动

```bash
# 进入后端目录
cd serve

# 编译项目
./mvnw clean compile

# 运行应用
./mvnw spring-boot:run

# 打包
./mvnw clean package

# 运行测试
./mvnw test
```

## 功能特性

### 用户端
- 🚗 车辆浏览与搜索
- 🔍 车辆详情查看
- ⭐ 收藏与对比功能
- 💬 在线咨询
- 📱 响应式设计

### 管理端
- 👥 用户管理
- 🚗 车辆管理
- 📊 数据统计
- 🔑 权限管理
- 📝 操作日志

## 开发规范

### 前端
- 使用 TypeScript 严格模式
- 组件使用 PascalCase 命名
- 函数/变量使用 camelCase 命名
- 遵循 React Hooks 最佳实践
- 使用 Prettier 格式化代码

### 后端
- 遵循 Java 代码规范
- 使用 Lombok 简化代码
- RESTful API 设计
- 统一异常处理
- 日志记录规范

## License

MIT License
