# Portfolio Website

一个基于 Next.js + React + Three.js 构建的现代化作品集网站，展示个人项目、商业案例和艺术作品。

## 技术栈

### 核心框架
- **Next.js 16.0** - React 框架（App Router）
- **React 19.2** - UI 库
- **TypeScript** - 类型安全

### 3D 与动画
- **Three.js** - 3D 图形库
- **@react-three/fiber** - React Three.js 渲染器
- **@react-three/drei** - Three.js 辅助工具
- **Framer Motion** - 动画库

### UI 组件
- **Radix UI** - 无样式 UI 组件
- **Tailwind CSS 4** - 样式框架
- **Lucide React** - 图标库

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 生产构建

```bash
npm run build
npm start
```

### 代码检查

```bash
npm run lint
```

## 项目结构

```
├── app/                      # Next.js App Router 页面
│   ├── welcome/             # 欢迎页（机器人导航）
│   ├── showcase/            # 项目展示（3D 滚动）
│   ├── business-cases/      # 商业案例
│   ├── art-gallery/         # 艺术画廊
│   ├── projects/[id]/       # 项目详情页
│   ├── layout.tsx           # 根布局
│   ├── page.tsx             # 首页
│   └── globals.css          # 全局样式
├── components/              # React 组件
│   ├── ui/                  # 基础 UI 组件（shadcn/ui）
│   ├── projects/            # 项目相关组件
│   ├── case-study/          # 案例研究组件
│   └── ...                  # 其他通用组件
├── lib/                     # 工具函数和数据
│   ├── data/                # 数据文件
│   │   ├── projects/        # 项目数据（按类型拆分）
│   │   └── chat-data.ts     # 聊天机器人数据
│   ├── types.ts             # TypeScript 类型定义
│   └── utils.ts             # 工具函数
├── hooks/                   # 自定义 React Hooks
├── public/                  # 静态资源
│   ├── painting/            # 艺术作品图片
│   ├── 3D/                  # 3D 相关资源
│   └── images/              # 其他图片资源
└── package.json
```

## 主要功能

### 1. 欢迎页 (`/welcome`)
- 3D 机器人导航
- 智能聊天助手
- 平滑滚动动画

### 2. 项目展示 (`/showcase`)
- 3D 沉浸式滚动
- 按类型分类（成熟项目、插件、业余项目）
- 玻璃态 3D 对象

### 3. 商业案例 (`/business-cases`)
- 管道流程可视化
- 案例详情展示

### 4. 艺术画廊 (`/art-gallery`)
- 时间线画廊布局
- 网格画廊布局
- 3D 模型展示
- 图片模态框

### 5. 项目详情 (`/projects/[id]`)
- 动态路由
- 三种主题样式：
  - **Mature** - 成熟项目主题
  - **Plugin** - 插件主题
  - **Hobby** - 业余项目主题

## 数据管理

项目数据存储在 `lib/data/projects/` 目录下，按类型拆分：
- `mature.ts` - 成熟软件项目
- `plugin.ts` - 小插件和脚本
- `hobby.ts` - 业余项目

所有数据通过 `lib/data/projects/index.ts` 统一导出。

## 环境变量

创建 `.env.local` 文件（参考 `.env.example`）：

```env
# 基础路径（用于 GitHub Pages 等部署）
NEXT_PUBLIC_BASE_PATH=
```

## 部署

### Vercel（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo)

### 其他平台

```bash
npm run build
```

将 `.next` 目录部署到任何支持 Node.js 的平台。

## 开发指南

### 添加新项目

1. 在 `lib/data/projects/` 中对应的文件添加项目数据
2. 确保遵循 `Project` 类型定义（见 `lib/types.ts`）
3. 项目会自动出现在相应页面

### 自定义主题

编辑 `app/globals.css` 中的 CSS 变量：
- `:root` - 亮色主题
- `.dark` - 暗色主题
- 支持双语切换

## 许可证 / License

本项目采用 **混合授权 (Hybrid License)** 策略：

### 1. 源代码 (Source Code)
本仓库中的源代码（包括 HTML 逻辑结构、CSS 样式代码、JavaScript 脚本等）基于 **[MIT 许可证](./LICENSE)** 开源。
✅ **你可以**：自由地学习、复制、修改代码逻辑，或将其用于你自己的项目中（包括商业项目）。

### 2. 内容与设计 (Content & Design)
本仓库中的**非代码资产**（包括但不限于：个人简历信息、作品集图片、3D 模型渲染图、文案、以及网站整体的 UI 视觉设计）保留所有权利 (**© All Rights Reserved**)。
❌ **你不能**：在未获得明确书面许可的情况下，直接复制我的个人图片、抄袭我的设计风格用于公共展示，或将其用于商业用途。

---

### Summary in English
* **Code:** The source code of this project is licensed under the **MIT License**. You are free to use the code logic for your own projects.
* **Assets:** The content, images, 3D models, and specific UI design of this portfolio are **Copyrighted (All Rights Reserved)**. Please do not reproduce or distribute them without permission.

## 作者

[ZKZ]
