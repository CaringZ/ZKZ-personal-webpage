import type { Project } from '@/lib/types'

export const matureProjects: Project[] = [
  {
    id: "project-1",
    title: "Comfy Flow",
    description:
      "一个基于 Web 的 ComfyUI 任务队列管理工具。支持多用户排队、任务进度监控和批量文件处理，解决了团队多人共用一台 GPU 服务器时的冲突问题。",
    type: "mature",
    technologies: ["Express", "WebSocket", "ComfyUI API", "JavaScript", "Python", "Sharp"],
    year: "2025",
    status: "active",
    link: "#",
    github: "#",
    mature: {
      tagline: "让不懂节点的美术也能用 ComfyUI",
      motivation: "团队里的美术同事想用 AI 出图，但 ComfyUI 复杂的节点逻辑学习门槛太高。而且大家共用一台显卡，经常出现资源抢占。我就做了这个网页版工具，把复杂的节点封装成简单的表单，大家排队使用，既简单又有序。",
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
          desc: "就像去银行办业务一样，大家提交的任务会自动排队，一个接一个跑，不会因为同时提交而报错。",
          stats: ["实时进度", "自动重试"],
          icon: "Layers"
        },
        {
          title: "简单界面",
          subtitle: "痛点：节点逻辑复杂",
          desc: "把复杂的节点参数变成了简单的填空题。美术只需要上传图片、选个风格，点生成就行，不用管节点怎么连。",
          stats: ["配置驱动", "动态表单"],
          icon: "Cpu"
        },
        {
          title: "批量处理",
          subtitle: "痛点：重复性机械劳动",
          desc: "支持直接把一个文件夹的图拖进去，系统会自动一张张处理完，并按规则保存好。",
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
        title: "痛点: 进度条不准",
        content: "起因: 一开始用轮询，服务器压力大而且进度卡顿。思路: 改用了 WebSocket 长连接。结果: 进度条丝滑流畅，体验好多了。"
      },
      {
        title: "痛点: 队列被“麦霸”占满",
        content: "起因: 解决了并发问题后，发现有个同事一次性提交了500张图，导致其他人一下午都排不上队。思路: 引入了“公平调度算法”和单人配额限制。结果: 解决了资源垄断，但又得处理“多账号薅羊毛”的新问题。"
      },
      {
        title: "痛点: 消失的任务",
        content: "起因: 对上一个任务进行取消，创建新任务，前端会自动返回旧任务时的状态，将新任务隐藏了，后台还在运行，直到这条任务全部跑完才出现在前端。思路: 捋顺各种状态下任务列表更新、保存的规则。"
      },
      {
        title: "痛点: 列表太长页面卡",
        content: "起因: 任务多了页面就卡死。思路: 用了虚拟滚动，只渲染看得到的部分。结果: 几千条任务也不卡了。"
      }
    ]
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
      motivation: "在协助运营团队处理重复性网页操作时，我深入调研了市面上的主流工具：**影刀**虽然功能强大，但配置繁琐、学习门槛过高；**Automa** 虽易上手，但在处理长流程时稳定性不足。为了解决这些痛点，我开发了 Flow Master。它结合了 Playwright 的工业级稳定性与简洁的可视化交互，让不懂代码的同事也能轻松构建出高稳定性的自动化工作流。",
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
        { label: "便携", value: "解压即用", desc: "不用安装环境，拷过去就能用" },
        { label: "易用", value: "所见即所得", desc: "内置了定位辅助工具" },
        { label: "扩展", value: "脚本兼容", desc: "支持导出 Python 代码" }
      ]
    },
    insights: [

      {
        title: "痛点: 界面假死",
        content: "起因: 自动化脚本跑起来的时候，界面就卡住了。思路: 把脚本放到后台线程去跑。结果: 脚本跑脚本的，界面还能动。"
      },
      {
        title: "痛点: 换电脑就不能用",
        content: "起因: 别人的电脑没装环境，脚本跑不起来。思路: 把浏览器和环境都打包到软件里。结果: 拷到哪都能直接用。"
      },
      {
        title: "痛点: 薛定谔的元素 (Heisenbug)",
        content: "起因: 定位时明明能找到元素，一运行脚本就找不到，非常玄学。思路: 开发了“高级选择器构建器”生成多种定位方式，并加上了“自动重试+人工介入”机制（失败自动重试上一步，不行再弹窗让用户选）。结果: 虽然不能100%自动，但至少不会莫名其妙挂在半路了。"
      }
    ]
  },
]
