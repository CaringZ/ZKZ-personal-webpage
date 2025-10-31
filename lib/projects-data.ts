export type ProjectType = "mature" | "plugin" | "hobby"

export interface Project {
  id: string
  title: string
  description: string
  type: ProjectType
  technologies: string[]
  year: string
  status: "active" | "completed" | "archived"
  link?: string
  github?: string
}

export const projects: Project[] = [
  // 成熟软件 (2个)
  {
    id: "project-1",
    title: "Comfy Flow",
    description:
      "一个功能完整的任务管理平台，支持团队协作、进度追踪和数据分析。采用现代化的技术栈，提供流畅的用户体验。",
    type: "mature",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    year: "2024",
    status: "active",
    link: "#",
    github: "#",
  },
  {
    id: "project-2",
    title: "Flow Master",
    description: "轻量级的本地文件管理和共享系统，支持多用户权限管理、文件预览和在线编辑功能。",
    type: "mature",
    technologies: ["Node.js", "Express", "React", "MongoDB"],
    year: "2023",
    status: "completed",
    link: "#",
    github: "#",
  },

  // 小插件小脚本 (6个)
  {
    id: "plugin-1",
    title: "blender插件",
    description: "自动格式化多种编程语言的代码片段，支持自定义规则配置。",
    type: "plugin",
    technologies: ["JavaScript", "CLI"],
    year: "2024",
    status: "active",
    github: "#",
  },
  {
    id: "plugin-2",
    title: "Lora",
    description: "命令行工具，批量压缩图片并保持质量，支持多种格式。",
    type: "plugin",
    technologies: ["Python", "PIL"],
    year: "2024",
    status: "active",
    github: "#",
  },
  {
    id: "plugin-3",
    title: "Comfy Controller",
    description: "分析 Git 仓库的提交历史，生成可视化统计报告。",
    type: "plugin",
    technologies: ["Python", "Git"],
    year: "2023",
    status: "completed",
    github: "#",
  },
  {
    id: "plugin-4",
    title: "ZKZNodes",
    description: "在 JSON、YAML、XML 等数据格式之间快速转换。",
    type: "plugin",
    technologies: ["JavaScript", "Node.js"],
    year: "2024",
    status: "active",
    github: "#",
  },
  {
    id: "plugin-5",
    title: "workflows",
    description: "自动化网页截图脚本，支持全页面和指定区域截图。",
    type: "plugin",
    technologies: ["Puppeteer", "Node.js"],
    year: "2023",
    status: "active",
    github: "#",
  },
  {
    id: "plugin-6",
    title: "PS/AI脚本",
    description: "实时预览 Markdown 文件的浏览器插件，支持自定义主题。",
    type: "plugin",
    technologies: ["JavaScript", "CSS"],
    year: "2024",
    status: "active",
    github: "#",
  },

  // 业余小软件 (5个)
  {
    id: "hobby-1",
    title: "截图",
    description: "简洁的番茄工作法计时器，帮助提高工作效率。",
    type: "hobby",
    technologies: ["React", "Electron"],
    year: "2024",
    status: "active",
    github: "#",
  },
  {
    id: "hobby-2",
    title: "excel",
    description: "实时查看天气信息，支持多城市切换和未来预报。",
    type: "hobby",
    technologies: ["Vue.js", "API"],
    year: "2023",
    status: "active",
    github: "#",
  },
  {
    id: "hobby-3",
    title: "ArroEngine",
    description: "简单的收支记录工具，支持分类统计和图表展示。",
    type: "hobby",
    technologies: ["React Native", "SQLite"],
    year: "2024",
    status: "active",
    github: "#",
  },
  {
    id: "hobby-4",
    title: "背景去除",
    description: "生成安全的随机密码，可自定义长度和字符类型。",
    type: "hobby",
    technologies: ["JavaScript", "HTML"],
    year: "2023",
    status: "completed",
    github: "#",
  },
  {
    id: "hobby-5",
    title: "打卡",
    description: "轻量级本地音乐播放器，支持歌词显示和播放列表管理。",
    type: "hobby",
    technologies: ["Electron", "React"],
    year: "2024",
    status: "active",
    github: "#",
  },
]

export const projectTypeConfig = {
  mature: {
    label: "成熟软件",
    color: "text-primary",
    icon: "🌳",
    description: "功能完整的大型项目",
  },
  plugin: {
    label: "小插件",
    color: "text-accent",
    icon: "🍃",
    description: "实用的工具和脚本",
  },
  hobby: {
    label: "业余项目",
    color: "text-chart-2",
    icon: "🌱",
    description: "个人兴趣开发",
  },
}
