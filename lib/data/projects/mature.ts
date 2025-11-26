import type { Project } from '@/lib/types'

export const matureProjects: Project[] = [
  {
    id: "project-1",
    title: "Comfy Flow",
    description:
      "基于 Express + WebSocket 的 ComfyUI 多用户队列管理平台。通过统一配置驱动封装 9 种预配置工作流，将复杂的节点连线操作简化为一键式 Web 交互。实现了任务队列调度、实时进度监控及批量文件自动化处理，解决了团队共享 GPU 资源时的协作痛点。",
    type: "mature",
    technologies: ["Express", "WebSocket", "ComfyUI API", "JavaScript", "Python", "Sharp"],
    year: "2025",
    status: "active",
    link: "#",
    github: "#",
    mature: {
      tagline: "ComfyUI 工作流工程化实践：从“节点连线”到“一键生产”的降维打击",
      motivation: "作为一名从美术老师转型的开发者，我深知传统美术人员面对复杂的 ComfyUI 节点连线时的无力感。我开发这个项目的初衷，就是为了搭建一座桥梁：将底层复杂的 Python 逻辑和节点图，封装为美术人员最熟悉的“图形化界面”。这不仅是一个工具，更是我“技术服务于艺术”理念的工程化实践，旨在让不懂代码的美术同事也能享受到 AI 带来的生产力革命。",
      heroStats: [
        { label: "生产级模版", value: "9+", icon: "Layers" },
        { label: "学习成本", value: "0", icon: "Activity" },
        { label: "任务必达", value: "100%", icon: "Shield" }
      ],
      architecture: {
        diagramNote: "基于 Web 的队列管理器：Express + WebSocket + ComfyUI API。支持 JSON 持久化的多用户任务调度。",
        techStack: [
          { category: "Core Engine", value: "ComfyUI (HTTP/WebSocket API)" },
          { category: "Frontend", value: "Vanilla JavaScript + HTML/CSS" },
          { category: "Backend", value: "Express + express-session" },
          { category: "Queue System", value: "In-memory + JSON persistence" },
          { category: "Image Processing", value: "Sharp + Multer" }
        ]
      },
      features: [
        {
          title: "智能队列调度 (Smart Queue)",
          subtitle: "痛点：资源抢占与冲突",
          desc: "针对多用户共享单 GPU 的场景，设计了基于 WebSocket 的实时任务队列。实现了任务的自动排队、失败重试、断线重连及进度实时推送，彻底解决了多人并发时的资源冲突与任务丢失问题。",
          stats: ["实时进度", "自动重试"],
          icon: "Layers"
        },
        {
          title: "低代码工作流封装 (Low-Code Encapsulation)",
          subtitle: "痛点：使用门槛过高",
          desc: "通过深度解析 ComfyUI API，将文生图、图生图、Inpainting 等 9 种复杂工作流封装为统一的 JSON 配置。前端根据配置动态生成表单，让美术人员无需理解底层节点逻辑，仅需调整核心参数即可产出高质量资产。",
          stats: ["配置驱动", "动态表单"],
          icon: "Cpu"
        },
        {
          title: "批量资产管线 (Mass Production Pipeline)",
          subtitle: "痛点：重复性手工劳动",
          desc: "构建了全自动化的批量处理管线。支持文件夹拖拽上传，后端自动进行切片分发、任务调度、结果回收及按规则重命名归档。将原本需要人工重复操作数千次的流程，压缩为一次“拖拽+点击”。",
          stats: ["自动切片", "规则归档"],
          icon: "Globe"
        }
      ],
      impact: [
        { label: "工程化", value: "单人维护", desc: "一人构建全套自动化管线" },
        { label: "易用性", value: "开箱即用", desc: "新人无需培训即可上手" },
        { label: "稳定性", value: "队列持久化", desc: "服务重启不丢失任务" }
      ]
    },
    insights: [
      {
        title: "痛点: 轮询压垮服务器 / 进度不准",
        content: "起因: 初期使用 HTTP 轮询获取进度，导致服务器负载过高且延迟明显。思路: 重构为 WebSocket 长连接，配合心跳检测与消息缓存机制。结果: 实现了毫秒级的进度同步与断线重连，用户体验大幅提升。收获: 实时交互场景下，WebSocket 是比轮询更优雅的解。"
      },
      {
        title: "痛点: 单实例 ComfyUI 资源抢占",
        content: "起因: 多个请求同时发给 ComfyUI 会导致显存溢出或任务混乱。思路: 在 Node.js 层实现一个 FIFO (先进先出) 内存队列，严格控制并发，并增加用户配额管理。结果: 确保了 GPU 资源的有序利用，杜绝了任务冲突。收获: 中间件层的流量整形是保护后端服务的关键。"
      },
      {
        title: "痛点: 工作流 JSON 维护困难",
        content: "起因: 随着 ComfyUI 节点更新，硬编码的 JSON 经常失效。思路: 建立“配置驱动”架构，将易变参数提取为配置文件，底层 JSON 作为模版动态注入。结果: 工作流更新只需修改配置，无需动代码。收获: 动静分离是降低维护成本的黄金法则。"
      },
      {
        title: "痛点: 批量任务前端渲染卡顿",
        content: "起因: 任务列表超过 1000 条时，DOM 节点过多导致页面假死。思路: 引入虚拟滚动 (Virtual Scrolling) 技术，仅渲染可视区域内的 DOM 节点。结果: 即使万级任务列表也能流畅滑动。收获: 性能优化往往在于“不做什么”，而不是“多做什么”。"
      }
    ]
  },
  {
    id: "project-2",
    title: "Flow Master",
    description: "基于 PyQt5 与 Playwright 构建的桌面端可视化自动化编排平台。它将复杂的浏览器自动化脚本开发降维为图形化拖拽操作，内置智能选择器构建器与 Excel 数据驱动引擎，让非技术人员也能轻松构建高鲁棒性的自动化工作流。",
    type: "mature",
    technologies: ["Python", "PyQt5", "Playwright", "Pandas", "PyInstaller"],
    year: "2025",
    status: "completed",
    link: "#",
    github: "#",
    mature: {
      tagline: "打破代码壁垒：让 Playwright 自动化脚本触手可及",
      motivation: "在协助运营团队处理重复性网页操作时，我尝试过市面上的主流工具，但都不尽如人意：**影刀**虽然功能强大，但配置繁琐、流程过于复杂，对非技术人员极不友好；**Automa** 在处理长流程时界面难以管理，且存在严重的稳定性问题。为了解决这些痛点，我开发了 Flow Master，旨在打造一个既有 Playwright 的强大稳定性，又具备简洁可视化交互的“中间层”，让不懂代码的同事也能轻松构建高鲁棒性的自动化工作流。",
      heroStats: [
        { label: "脚本库", value: "50+", icon: "FileText" },
        { label: "运行稳定性", value: "99.9%", icon: "Shield" },
        { label: "执行准确率", value: "100%", icon: "Target" }
      ],
      architecture: {
        diagramNote: "Hybrid Architecture: PyQt5 Sync UI + Playwright Async Engine. Portable runtime environment.",
        techStack: [
          { category: "GUI Framework", value: "PyQt5 (Custom Widget System)" },
          { category: "Core Engine", value: "Playwright (Async/Await)" },
          { category: "Data Processing", value: "Pandas (Excel/CSV)" },
          { category: "Deployment", value: "PyInstaller + Embedded Python" }
        ]
      },
      features: [
        {
          title: "可视化任务编排 (Visual Orchestration)",
          subtitle: "痛点：代码编写门槛高",
          desc: "设计了基于表格的动作编排系统，支持点击、输入、悬停、等待等 10+ 种核心操作。用户无需编写一行代码，通过简单的增删改查即可构建复杂的业务逻辑，且支持动作的拖拽排序与实时预览。",
          stats: ["零代码", "拖拽编排"],
          icon: "Layers"
        },
        {
          title: "智能选择器构建 (Smart Selector Builder)",
          subtitle: "痛点：元素定位脆弱",
          desc: "针对动态网页元素难以定位的难题，开发了高级选择器构建器。支持“链式定位”（父子级关系）、“相对定位”（Near/Left-of）及“索引定位”，自动生成高鲁棒性的 Playwright 选择器，彻底告别脆弱的 XPath。",
          stats: ["语义化定位", "抗变动"],
          icon: "Cpu"
        },
        {
          title: "Excel 数据驱动 (Data-Driven Execution)",
          subtitle: "痛点：批量处理繁琐",
          desc: "深度集成了 Pandas 数据处理引擎。用户只需导入 Excel 表格，即可将列数据映射为输入变量。脚本运行时会自动遍历表格行，实现“一次配置，批量执行”，完美适配电商上架、表单填报等场景。",
          stats: ["变量映射", "批量循环"],
          icon: "Zap"
        }
      ],
      impact: [
        { label: "工程化", value: "便携部署", desc: "内嵌 Python 环境，解压即用" },
        { label: "易用性", value: "所见即所得", desc: "内置选择器生成工具" },
        { label: "扩展性", value: "脚本兼容", desc: "支持导出标准 Python 代码" }
      ]
    },
    insights: [
      {
        title: "痛点: PyQt5 同步主线程 vs Playwright 异步逻辑",
        content: "起因: Playwright 的 async/await 机制与 PyQt5 的事件循环冲突，直接运行会导致界面假死。思路: 采用多线程架构，将 Playwright 逻辑封装在 QThread Worker 中，通过 PyQt Signal/Slot 机制实现跨线程通信与状态同步。结果: 实现了流畅的 UI 响应与稳定的后台执行。"
      },
      {
        title: "痛点: 打包后 Playwright 无法启动浏览器",
        content: "起因: 开发环境一切正常，但打包后在其他电脑无法启动，Playwright 坚持去默认路径(C盘)找浏览器，且缺少 Node 依赖。思路: 逆向分析 Playwright 启动流程，发现冻结环境下需手动指定 `PLAYWRIGHT_BROWSERS_PATH` 环境变量，并直接调用内部 `node.exe` + `cli.js` 启动内核，而非依赖系统 Python。结果: 彻底解决了“换台电脑就挂”的部署难题，实现了真正的便携式启动。"
      },
      {
        title: "痛点: 动态 ID 导致自动化脚本频繁失效",
        content: "起因: 现代前端框架（如 React/Vue）生成的随机 Class/ID 导致传统选择器失效。思路: 引入 Playwright 的语义化定位（Locate by Role/Text）及相对定位策略，并开发图形化构建器辅助生成。结果: 脚本对 UI 变动的容忍度大幅提升，维护成本降低 80%。"
      }
    ]
  },
]
