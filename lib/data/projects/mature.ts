import type { Project } from '@/lib/types'

export const matureProjects: Project[] = [
  {
    id: "project-1",
    title: "Comfy Flow",
    description:
      "基于 Web 的 ComfyUI 任务调度系统。通过将节点工作流封装为可视化表单，解决了美术团队在多人共享 GPU 算力时的操作门槛与资源冲突问题。",
    type: "mature",
    technologies: ["Express", "WebSocket", "ComfyUI API", "JavaScript", "Python", "Sharp"],
    year: "2025",
    status: "active",
    link: "#",
    github: "#",
    mature: {
      tagline: "让 ComfyUI 从“玩具”变成团队的“生产力”",
      motivation: "在团队协作中，原生的 ComfyUI 存在两个落地难点：一是节点式连线的学习成本过高，阻碍了美术人员的创意落地；二是多人共用单台 GPU 服务器时，缺乏任务排队机制导致资源抢占。",
      heroStats: [
        { label: "预设模版", value: "9+", icon: "Layers" },
        { label: "学习成本", value: "0", icon: "Activity" },
        { label: "任务成功率", value: "100%", icon: "Shield" }
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
          title: "排队系统",
          subtitle: "痛点：资源抢占与冲突",
          desc: "引入 FIFO（先进先出）队列与状态机管理，所有提交的任务自动进入后台排队序列，确保多人并发场景下 GPU 资源的独占性调用。",
          stats: ["实时进度", "自动重试"],
          icon: "Layers"
        },
        {
          title: "简单界面",
          subtitle: "痛点：节点逻辑复杂",
          desc: "将复杂的 Node Workflow 抽象为业务层面的表单配置。美术人员仅需关注图像比例等核心参数，系统在后台自动映射并执行对应的节点逻辑。",
          stats: ["配置驱动", "动态表单"],
          icon: "Cpu"
        },
        {
          title: "批量处理",
          subtitle: "痛点：重复性机械劳动",
          desc: "支持拖入整个文件夹，系统会自动将目录下所有文件序列化为独立任务放入队列，处理完成后按预设规则自动分类存储。",
          stats: ["自动切片", "规则归档"],
          icon: "Globe"
        }
      ],
      impact: [
        { label: "效率", value: "单人维护", desc: "一个人就能维护全套流程" },
        { label: "易用", value: "开箱即用", desc: "新人不用培训直接上手" },
        { label: "稳定", value: "队列保存", desc: "重启也不会丢任务" }
      ]
    },
    insights: [
      {
        title: "挑战: 交互体验的实时性",
        content: "起因: 一开始用轮询，服务器压力大而且进度卡顿。思路: 改用了 WebSocket 长连接。结果: 进度条丝滑流畅，体验好多了。收获: 用户体验的流畅度，往往取决于看不见的底层通信方式。"
      },
      {
        title: "挑战: 公平调度算法",
        content: "起因: 在开放使用的初期，遭遇个别用户一次性提交数百个任务，导致其他成员整个下午都无法排进队列。思路: 引入“单人配额”与“动态降权”机制，限制单一用户连续占用显卡的时长，确保大家都有机会跑图。 结果: 有效遏制了资源独占现象，虽然仍需防范多账号等规避行为，但基本维持了团队的协作秩序。 收获: 系统设计不仅要追求处理效率，更要预判并约束“极端用户行为”，防止其破坏整体的使用体验。"
      },
      {
        title: "挑战: 状态一致性管理",
        content: "起因: 在“取消-新建”的高频操作下，因前后端时序差异，导致前端展示滞后于后端实际运行状态（即“幽灵任务”现象）。 思路: 彻底重构状态机逻辑，建立严格的前后端状态校验机制，确保任何边缘操作下的状态都能实时对齐。 收获: 状态管理最忌讳模糊不清，系统不仅要处理“成功”的路径，更要为“取消”、“中断”等异常流转定义明确的规则。"
      },
      {
        title: "挑战: 列表太长页面卡",
        content: "起因: 任务多了页面就卡死。思路: 用了虚拟滚动，只渲染看得到的部分。结果: 几千条任务也不卡了。收获: 性能优化不是为了炫技，而是为了让用户在数据量大的时候也能从容操作。"
      }
    ],
    conclusion: "从写脚本到做一个平台，难度是指数级上升的。当第一个用户因为队列堵塞而抱怨时，我意识到“好用”不仅仅是功能强大，更是对资源的公平分配。为了解决并发冲突与资源调度，我不得不深入后端逻辑的设计。这一过程让我意识到，优秀的工具应当是‘透明’的——通过后端复杂的逻辑封装，为前端用户提供确定性的、无感知的流畅体验。"
  },
  {
    id: "project-2",
    title: "Flow Master",
    description: "基于 PyQt5 和 Playwright 的桌面端自动化工具。通过可视化的表格界面编排网页操作，让不懂代码的人也能制作自动化脚本。",
    type: "mature",
    technologies: ["Python", "PyQt5", "Playwright", "Pandas", "PyInstaller"],
    year: "2025",
    status: "completed",
    link: "#",
    github: "#",
    mature: {
      tagline: "打破代码壁垒：让 Playwright 自动化脚本触手可及",
      motivation: "在协助运营团队处理重复性网页操作时，我深入调研了市面上的主流工具：影刀虽然功能强大，但配置繁琐、学习门槛过高；Automa虽易上手，但在处理长流程时稳定性不足。为了解决这些痛点，我开发了 Flow Master。它结合了 Playwright 的工业级稳定性与简洁的可视化交互，让不懂代码的同事也能轻松构建出高稳定性的自动化工作流。",
      heroStats: [
        { label: "脚本库", value: "50+", icon: "FileText" },
        { label: "运行稳定", value: "99.9%", icon: "Shield" },
        { label: "执行准确", value: "100%", icon: "Target" }
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
          title: "可视化编排",
          subtitle: "痛点：代码编写门槛",
          desc: "用表格来管理操作步骤，支持点击、输入、等待等常用操作。不用写代码，拖拖拽拽就能把流程配好。",
          stats: ["零代码", "拖拽编排"],
          icon: "Layers"
        },
        {
          title: "智能定位",
          subtitle: "痛点：DOM 结构不稳定",
          desc: "做了一个辅助工具，能自动生成稳定的元素定位符，就算网页微调了，脚本也能照样跑。",
          stats: ["语义化定位", "抗变动"],
          icon: "Cpu"
        },
        {
          title: "Excel 批量处理",
          subtitle: "痛点：海量数据处理",
          desc: "支持导入 Excel 表格，脚本会自动读取每一行数据去执行操作，适合批量填表、上架商品。",
          stats: ["变量映射", "批量循环"],
          icon: "Zap"
        }
      ],
      impact: [
        { label: "便携", value: "智能安装", desc: "自动检测依赖，缺失组件静默补全" },
        { label: "易用", value: "所见即所得", desc: "内置了定位辅助工具" },
        { label: "扩展", value: "脚本兼容", desc: "支持导出 Python 代码" }
      ]
    },
    insights: [
      {
        title: "挑战: 界面假死",
        content: "起因: 脚本执行时若阻塞主线程，会导致软件界面呈‘假死’状态，严重影响用户体验。策略: 利用 AI 协助实现了 GUI 线程与 Worker 线程的分离（Multithreading）。收获: 无论后台逻辑如何复杂，界面交互始终保持响应，这是桌面应用体验合格的基线。"
      },
      {
        title: "挑战: 换电脑就不能用",
        content: "起因: 目标用户的设备环境差异巨大，缺失 DLL 或依赖库是常态。思路: 放弃轻量化安装包的执念，转向‘全量依赖打包’方案。收获: 在工具开发中，兼容性与确定性的优先级高于软件体积，‘能运行’是解决问题的前提。"
      },
      {
        title: "挑战: 薛定谔的元素 (Heisenbug)",
        content: "起因: 定位时明明能找到元素，一运行脚本就找不到，非常玄学。思路: 开发了“高级选择器构建器”生成多种定位方式，并加上了“自动重试+人工介入”机制（失败自动重试上一步，不行再弹窗让用户选）。结果: 虽然不能100%自动，但至少不会莫名其妙挂在半路了。收获: 自动化不应追求理想状态下的 100% 成功率，而应具备处理 1% 异常情况的自我恢复能力。"
      }
    ],
    conclusion: "Flow Master 的开发过程强化了我的工程化思维：单纯的代码实现只是第一步，如何让软件在异构的硬件环境、不稳定的网络条件下依然保持‘抗造’的特性，才是挑战所在。作为一个对体验有高要求的开发者，这种对稳定性与确定性的追求，贯穿了产品的整个生命周期。"
  },
]
