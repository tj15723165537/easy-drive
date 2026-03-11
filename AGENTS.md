# Easy Drive 项目指南

本项目为编码代理提供代码规范和开发指南。

---

## 项目结构

- `admin/` - React前端应用
- `serve/` - Spring Boot后端应用

---

## 构建/检查命令

### 前端

**进入前端目录：**
```bash
cd admin
```

**开发模式：**
```bash
pnpm dev
```

**生产构建：**
```bash
pnpm build:pro
```

**开发环境构建：**
```bash
pnpm build:dev
```

**TypeScript类型检查：**
```bash
npx tsc --noEmit
```

**代码格式化：**
```bash
npx prettier --write "src/**/*.{ts,tsx,js,jsx,less,css,json}"
```

### 后端

**进入后端目录：**
```bash
cd serve
```

**编译项目：**
```bash
./mvnw clean compile
```

**运行测试：**
```bash
./mvnw test
```

**运行单个测试：**
```bash
./mvnw test -Dtest=类名#方法名
```

**打包：**
```bash
./mvnw clean package
```

**运行应用：**
```bash
./mvnw spring-boot:run
```

---

## 前端代码规范

### 导入规范

- 优先使用路径别名 `@/` 导入项目内部模块
- 第三方库导入放在顶部
- 相对路径导入使用 `./` 或 `../`
- 导入顺序：React相关 → 第三方库 → 项目内部模块 → 样式文件

### 格式化规范

- 使用 Prettier 自动格式化
- 每行最大字符数：120
- 缩进：2个空格（不使用Tab）
- 引号：单引号
- 分号：不使用尾部分号
- 尾逗号：ES5标准

### 类型规范

- 严格TypeScript模式
- 为所有变量、函数参数、返回值指定类型
- 避免使用 `any` 类型
- 使用接口（interface）定义对象类型
- 使用类型别名（type）定义联合类型等复杂类型
- 导出类型定义放在 `typings/` 目录

### 命名规范

- 组件：PascalCase（如 `LoginForm`）
- 函数/变量：camelCase（如 `getUserData`）
- 常量：UPPER_SNAKE_CASE（如 `API_BASE_URL`）
- 类：PascalCase
- 文件名：PascalCase（组件）、camelCase（工具/配置）

### 文件组织

- `src/api/` - API接口定义
- `src/store/` - Zustand状态管理
- `src/views/` - 页面组件
- `src/components/` - 通用组件
- `src/layouts/` - 布局组件
- `src/routers/` - 路由配置
- `src/hooks/` - 自定义Hooks
- `src/utils/` - 工具函数
- `src/enums/` - 枚举定义
- `src/config/` - 配置文件
- `src/styles/` - 全局样式

### 错误处理

- 使用 try-catch 处理异步错误
- API错误已在 axios 拦截器中统一处理
- 显示错误消息使用 Antd 的 `message.error()`
- 不在控制台打印敏感信息

### 组件规范

- 使用函数组件 + Hooks
- 组件名与文件名一致
- Props 接口单独定义并导出
- 必要时使用 React.memo 优化性能

### 状态管理

- 使用 Zustand 进行全局状态管理
- store 文件放在 `src/store/` 目录
- 使用 persist 中间件持久化关键状态

### 路由规范

- 路由配置放在 `src/routers/modules/` 目录
- 使用 React Router v6
- 使用路由守卫验证权限

---

## 后端代码规范

### Java规范

- Java 21 语法特性
- 使用 Lombok 减少样板代码
- 类命名：PascalCase
- 包命名：全小写，使用点分隔
- 方法/变量：camelCase
- 常量：UPPER_SNAKE_CASE

### 代码组织

- Controller层：处理HTTP请求
- Service层：业务逻辑
- Repository层：数据访问
- Entity：实体类

### 注解规范

- 使用 @Slf4j 进行日志记录
- 使用 @Data 简化Getter/Setter
- 使用 @Builder 支持构建器模式
- 使用 RESTful 风格的控制器注解

---

## 通用规范

### Git提交

- 提交消息简洁明确
- 使用中文描述
- 提交前进行类型检查和格式化

### 注释规范

- 不添加无用注释
- 复杂逻辑添加必要注释
- API接口使用 JSDoc 注释

### 环境变量

- 前端环境变量定义在 `.env`、`.env.development`、`.env.production`
- 后端环境变量使用 Spring Boot 配置文件

---

## 开发注意事项

1. 修改代码后运行类型检查
2. 提交前进行代码格式化
3. 确保所有API接口都有类型定义
4. 遵循现有的代码结构和命名规范
5. 新增功能时创建对应的类型、接口和测试