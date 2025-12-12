import type { Project } from '@/lib/types'

export const hobbyProjects: Project[] = [
  {
    id: "hobby-1",
    title: "3D Paint Studio",
    description: "面向 3D 资产生产管线的材质验证与预演工具。基于 AO 白模进行非破坏性的视觉迭代，利用多模态模型逆向推演 Blender 材质节点逻辑，实现从概念草图到工程落地的平滑过渡。",
    type: "hobby",
    technologies: ["Gemini API", "Three.js", "TypeScript", "Blender"],
    year: "2025",
    status: "active",
    github: "#",
    hobby: {
      colorTheme: "orange",
      tagline: "桥接 2D 视觉意图与 3D 材质工程的中间层工具",
      motivation: "痛点：传统 PBR 流程的高昂试错成本。在传统管线中，材质验证严重滞后于 UV 展开与贴图烘焙等技术环节，导致反馈回路过长。目标：实现“审美决策”与“技术实现”的解耦。构建一个轻量级验证环境，允许在进入复杂的 Shader 节点构建之前，以低成本完成色彩与质感的快速原型迭代。",
      features: [
        {
          title: "语义驱动的材质映射",
          desc: "根据语义识别模型是拓扑结构特征（如硬表面 vs 有机体），注入符合物理属性的材质细节，比如金属磨损或皮肤纹理。",
          icon: "Cpu"
        },
        {
          title: "色彩分区控制",
          desc: "强制按照 60/30/10 的比例分配主辅色，避免生成的配色太乱或太单调。",
          icon: "Layout"
        },
        {
          title: "节点图谱逆向推断",
          desc: "解析生成图像的纹理特征，映射为可执行的 Blender Shader Node 拓扑结构，输出包含 Roughness、Noise Texture 等参数的标准化建议。",
          icon: "Activity"
        },
        {
          title: "确定性的交互反馈机制",
          desc: "对齐专业软件的交互范式。通过精细化的状态机管理异步任务，消除长耗时生成过程中的用户感知不确定性。",
          icon: "Zap"
        }
      ],
      useCases: [
        {
          title: "独立游戏角色定调",
          pain: "3D美术需要快速验证多套配色，传统流程要拆 UV、堆材质，成本高。",
          solution: "上传白膜，切换预设风格几分钟生成多版方案供投票，无需手绘草图。"
        },
        {
          title: "Blender 新手的节点导师",
          pain: "想做磨损喷漆金属但不会连节点。",
          solution: "生成满意图后点“分析”，得到 Musgrave/ColorRamp 等节点接法与参数提示。"
        },
        {
          title: "概念设计快速统一风格",
          pain: "Kitbash 资产材质风格不统一，整体构图混乱。",
          solution: "截图上传选择“统一材质”标签，AI 按同一视觉语言重涂并保持几何。"
        }
      ],
      devLog: [
        { status: "done", text: "核心功能实现：支持异步对多个白膜图像进行上色与分析" },
        { status: "active", text: "材质逆向分析优化：提升准确度，细化输出格式" },
        { status: "todo", text: "分析结果图形化：更直观的材质参数展示" },
        { status: "todo", text: "Blender 插件集成：打通数据链路，直接应用分析结果" }
      ],
    },
    insights: [
      {
        title: "挑战: 生成式模型的几何幻觉",
        content: "起因: Img2Img 模型在重绘过程中倾向于破坏原始几何特征（如增加非必要的装饰性结构）。思路: 建立结构一致性约束。通过筛选高保真基座模型并配合否定提示词进行边界控制。结果: 模型结构保住了，只改颜色。收获: 拓扑保护的优先级高于风格化渲染。"
      },
      {
        title: "挑战: PBR 物理属性的语义丢失",
        content: "起因: 泛化模型难以区分不同材质的光照反射特性，导致输出趋同于“塑料感”。思路: 引入“材质组件化”提示策略。显式分离 Diffuse、Roughness、Metalness 的语义描述，强制模型进行物理属性区分。结果: 精准区分材质。收获: 提示词工程的本质是将模糊的视觉直觉转化为精确的参数化描述。"
      },
      {
        title: "挑战: 异步任务的感知延迟",
        content: "起因: 图像生成与分析属于计算密集型任务，长响应时间引发了“应用假死”的误判。思路: 加了详细的加载状态提示。结果: 虽然速度没变，但用户知道在运行就不焦虑了。收获: 及时的状态反馈能提升体验。"
      }
    ]
  },
  {
    id: "hobby-2",
    title: "Smart Material Gen",
    description: "面向 Blender 的程序化材质中间件。通过构建抽象层，将底层的 Shader Node 逻辑封装为可视化的图层堆栈，实现非破坏性的多通道纹理合成。",
    type: "hobby",
    technologies: ["Python", "Blender API", "Shader Nodes"],
    year: "2025",
    status: "active",
    github: "#",
    hobby: {
      colorTheme: "orange",
      tagline: "模块化驱动材质构建方案",
      motivation: "Blender 的节点系统太复杂了，对于只是想给模型加点旧化效果的人来说，门槛有点高。我想把这些复杂的节点逻辑封装起来，让用户像在修图软件里叠图层一样，简单直观地做出写实材质。",
      features: [
        {
          title: "图层化效果",
          desc: "采用栈式管理策略，将复杂的 Mix Shader 逻辑解耦为独立的“效果层”。支持图层级的参数覆写与可见性切换，实现逻辑与数据的分离。",
          icon: "Layers"
        },
        {
          title: "自动化的图谱注入",
          desc: "内置拓扑分析算法，能够智能解析当前 Shader Node Tree 的结构，自动寻找最佳插入点并接管 Link 关系，消除人工连线的重复劳动。",
          icon: "Cpu"
        },
        {
          title: "资产动态加载",
          desc: "实施资源的懒加载策略。仅在实例化特定效果时才从磁盘读取对应的纹理组或节点组，显著降低运行时的内存占用。",
          icon: "Box"
        },
        {
          title: "防卡顿设计",
          desc: "针对渲染引擎重编译 Shader 耗时高的问题，在参数调节接口引入防抖算法。合并高频触发的 Update 事件，确保 UI 线程的流畅性与响应度。",
          icon: "Zap"
        }
      ],
      useCases: [
        {
          title: "写实材质的制作门槛",
          pain: "制作一个逼真的旧化金属材质通常需要连接几十上百个节点，涉及复杂的数学运算和纹理混合。",
          solution: "解耦的堆栈式设计，让材质制作像修图一样简单直观。内置7种老化效果，一键生成。"
        },
        {
          title: "手动连接的易错性",
          pain: "手动连接几十个混合节点容易出错，且难以维护。",
          solution: "算法自动管理节点拓扑，确保连接逻辑永远正确。智能识别现有材质结构，自动注入老化逻辑。"
        },
        {
          title: "复杂的节点树更新耗时",
          pain: "复杂的节点树更新非常耗时，实时响应会导致界面卡死。",
          solution: "引入异步延迟更新机制 (Debounce)，保证交互流畅性。"
        }
      ],
      devLog: [
        { status: "done", text: "核心架构：节点重构引擎与资产加载系统" },
        { status: "done", text: "完成粗糙铁 (Rough Iron) 的全套纹理效果" },
        { status: "active", text: "扩展金属材质库：纯金 (Pure Gold)、拉丝铝 (Brushed Aluminum)" },
        { status: "todo", text: "开发塑料 (Plastic) 等非金属材质体系" },
        { status: "todo", text: "持续扩充材质预设库" }
      ],
    },
    insights: [
      {
        title: "痛点：节点连线太乱了",
        content: "起因：随着材质复杂度提升，节点图谱的连接复杂度呈指数级增长，导致可读性急剧下降。思路：实施黑盒化封装策略。将复杂的运算逻辑收敛至 Node Group 内部，仅暴露标准化的 Input/Output 接口。结果: 结构清晰多了，维护也方便。复盘: 良好的软件工程不仅是代码整洁，更包括可视化逻辑的模块化治理。"
      },
      {
        title: "痛点：用户行为的不可预测性",
        content: "起因：3D 环境的高度自由性允许用户随意破坏插件生成的节点结构，导致下游逻辑崩溃。思路：建立防御性编程机制与自愈逻辑。操作执行前进行完整性校验，若检测到关键节点缺失，触发自动重建流程。结果: 插件变得很皮实，不容易坏。收获: 工具的鲁棒性体现在对异常状态的兼容与自我恢复能力上。"
      }
    ]
  },
  {
    id: "hobby-3",
    title: "ArroEngine",
    description: "基于规则的自动化文件管理引擎。支持可视化编排整理规则，通过“文件”与“文件夹”双轨逻辑，实现复杂的批量重命名与归档任务。",
    type: "hobby",
    technologies: ["Electron", "TypeScript", "React", "Vite", "Tailwind CSS"],
    year: "2025",
    status: "active",
    github: "#",
    hobby: {
      colorTheme: "blue",
      tagline: "AI 协同开发的本地I/O 自动化解决方案",
      motivation: "我一直想做一个既好看又好用的文件管理工具。我不懂复杂的算法，但我知道我需要什么样的逻辑：文件和文件夹的处理方式应该是不同的，规则应该是可视化的。这个项目是我用自然语言指挥 AI，把我的逻辑变成代码的一次尝试。",
      features: [
        {
          title: "可视化规则",
          desc: "通过可视化 UI 构建条件管道。支持链式组合 Filter（筛选）、Transform（重命名）、Action（移动/归档）等原子操作，实现逻辑复用。",
          icon: "Layout"
        },
        {
          title: "上下文隔离",
          desc: "严格区分 File Context 与 Directory Context 的执行作用域。防止因递归逻辑错误导致的文件层级混乱，确保处理边界清晰。",
          icon: "Cpu"
        },
        {
          title: "撤销/重做",
          desc: "引入操作日志与快照机制。所有 I/O 变更均被封装为可回滚的事务，确保在误操作或异常中断时能够恢复数据一致性。",
          icon: "History"
        },
        {
          title: "实时预览",
          desc: "在执行之前，基于内存中的虚拟文件树进行模拟执行。提供 Diff 视图对比变更前后的状态，能直观地看到哪些文件会被修改，改成了什么样，确认无误再执行。",
          icon: "Activity"
        }
      ],
      useCases: [
        {
          title: "设计师的“素材收集癖”救星",
          pain: "下载文件夹里堆满了 PSD、AI、JPG、Reference 图，找素材像大海捞针。",
          solution: "设置 ArroEngine 监听下载目录。一旦检测到 .psd，自动移动到 素材库/源文件；检测到 .jpg 且文件名包含 ref，自动归档到 素材库/参考图。"
        },
        {
          title: "摄影师的“原片整理”助理",
          pain: "每次外拍回来，几千张 DSC_0001.ARW 毫无意义，整理照片要花半天。",
          solution: "一键拖入 SD 卡目录，规则引擎自动提取 Exif 拍摄时间，将文件名批量清洗为 2024-11-25_上海_外滩_001.ARW，并按 年份/月份 自动创建文件夹归档。"
        },
        {
          title: "开发者的“自动中转站”",
          pain: "经常需要解压各种 GitHub 源码包、整理 Log 日志、归档旧版本 Build。",
          solution: "设定“自动解压”规则，监控特定文件夹，压缩包一落地即自动解压并重命名为项目标准格式，旧文件自动打标归档到 Backup 目录。"
        }
      ],
      devLog: [
        { status: "done", text: "Electron 主进程与渲染进程通信" },
        { status: "active", text: "规则引擎 (Rule Engine) 设计" },
        { status: "todo", text: "接入轻量级本地大模型 (Llama 3)" },
        { status: "todo", text: "集成离线 OCR 引擎" },
        { status: "todo", text: "智能文件 Agent 主动建议" }
      ],
    },
    insights: [
      {
        title: "挑战: 逻辑容易混淆",
        content: "起因：处理单个文件和处理整个文件夹的逻辑不一样，混在一起容易出 bug。思路: 在界面和代码上都把它们严格分开。复盘：复杂的业务逻辑不能靠“特例判断”来修补，必须从结构上拆分。"
      },
      {
        title: "挑战: 批量改名容易覆盖",
        content: "起因：批量重命名时产生的重名冲突，会导致文件被静默覆盖，这是自动化工具最致命的缺陷。思路: 加了一个预检查机制，在执行写入前先扫描目标路径，遇到冲突自动添加后缀，确保文件数据安全。复盘：涉及文件 I/O 的工具，安全性（Safety）的优先级永远高于功能性。"
      },
      {
        title: "心得: 基于 AI 的伪代码工程",
        content: "洞察：LLM 擅长战术层面的代码补全，但在战略层面的系统设计上存在上下文窗口限制导致的逻辑漂移。实践：我转向“主架构师”角色，将业务逻辑拆解为精确的伪代码或流程图输入给 AI。AI 退化为高效的编译器，而人类保留对核心业务逻辑的控制权。总结：AI 时代的工程能力，取决于将模糊需求转化为精确指令的能力。"
      }
    ]
  },
  {
    id: "hobby-4",
    title: "AirShot",
    description: "面向开发与设计工作流的高精度屏幕捕捉工具。集成像素级选区控制、时序标注与画中画（PiP）参考功能，旨在填补轻量级 IM 截图与专业级软件之间的生态位空缺。",
    type: "hobby",
    technologies: ["Python", "PyQt5"],
    year: "2024",
    status: "active",
    github: "#",
    hobby: {
      colorTheme: "purple",
      tagline: "零配置的即时生产力与标注工具",
      motivation: "现有的截图工具要么太简单（像微信截图），要么太复杂（像 ShareX）。我想要一个中间状态的工具：平时用起来很简单，但当我有需要的时候，它也能提供钉图、延时截图这些进阶功能，。",
      features: [
        {
          title: "悬浮参考",
          desc: "利用窗口置顶技术，将截图实例化为无边框悬浮窗。支持多实例并行与透明度调节，消除编码时频繁 Alt-Tab 切换带来的上下文丢失。",
          icon: "Layout"
        },
        {
          title: "结构化标注系统",
          desc: "内置时序标记与像素级脱敏工具。支持自动递增的步骤序号（1, 2, 3...）与矢量化的选区修正，专为编写技术文档与 Bug 报告设计。",
          icon: "Edit"
        },
        {
          title: "延时截图",
          desc: "引入延时触发器。专门解决 Hover 菜单、Tooltip 等一旦失去焦点即消失的“幽灵元素”的捕获难题，支持毫秒级的倒计时控制。",
          icon: "Clock"
        },
        {
          title: "流畅体验",
          desc: "重构文件保存逻辑，支持一键热存至预设目录。将图像编码与磁盘写入操作移至后台线程，确保在前台连续截图时 UI 零冻结。",
          icon: "Zap"
        }
      ],
      useCases: [
        {
          title: "零门槛的快速分享",
          pain: "给稍微有点需求但又不想花太多时间学习新软件的用户推荐截图软件。",
          solution: "AirShot 的界面没有任何晦涩的术语。截取 -> 标注 -> 双击保存/复制。逻辑直观，无需学习，安装即用。"
        },
        {
          title: "重度用户的“极速流”",
          pain: "需要连续截取多张图时，每次都要经历繁琐的保存流程。",
          solution: "支持自定义保存路径与一键保存热键。截图后按下空格键，图片自动按时间戳命名并秒存到指定目录。"
        },
        {
          title: "捕捉“幽灵”菜单",
          pain: "想截取软件的下拉菜单，但一按截图键菜单就缩回去了。",
          solution: "开启“3秒延时”，点击开始，然后从容地打开下拉菜单，等待 AirShot 自动捕捉那一瞬间。"
        }
      ],
      devLog: [
        { status: "done", text: "实现了全局热键监听 (Global Hotkey)" },
        { status: "done", text: "完成了截图区域选择算法" },
        { status: "active", text: "滚动截图 (Scroll Capture): 自动滚动网页拼接长图" },
        { status: "todo", text: "固定位置截图 (Fixed Region Capture): 一键重复截取同一区域" },
        { status: "todo", text: "一键分享 (One-click Sharing): 打通微信/QQ接口" },
        { status: "todo", text: "添加 OCR 文字识别功能" }
      ],
    },
    insights: [
      {
        title: "挑战: 功能密度与界面简洁的冲突",
        content: "解决：实施上下文感知布局。标注工具栏采用渐进式披露设计，仅在特定状态下渲染相关控件，避免视觉干扰。复盘：好的 GUI 架构应该降低用户的认知噪音，让工具“隐形”。"
      },
      {
        title: "挑战: 窗口层级管理",
        content: "问题：多任务环境中，普通的置顶属性容易被其他系统级应用抢占焦点。解决: 强制设定窗口的 WindowFlag 属性，并结合系统 API 进行层级加固，确保悬浮窗始终处于视口最前端。复盘：桌面端开发必须精通原生窗口管理器的交互机制。"
      },
      {
        title: "心得: 特性蔓延的克制",
        content: "洞察：开发者容易陷入“堆砌功能”的陷阱，导致产品臃肿。实践：严格执行最小可行性原则。对于非核心需求（如复杂的图像滤镜），坚决做减法。总结：工具的价值在于解决核心痛点的信噪比。"
      },
      {
        title: "心得: 感知性能",
        content: "洞察：对于高频使用的工具，毫秒级的卡顿都会被放大。实践：优化应用的冷启动时间，并将所有 IO 耗时操作放入后台线程。总结：响应速度是工具类软件的第一用户体验。"
      }
    ]
  },
  {
    id: "hobby-5",
    title: "Background Removal",
    description: "运行于本地的批量抠图工作站。利用 AI 模型实现文件夹级的自动去底，旨在解决在线工具的隐私泄露风险与数量限制问题。",
    type: "hobby",
    technologies: ["Python", "PyQt5", "Rembg", "ONNX Runtime", "PIL"],
    year: "2024",
    status: "completed",
    github: "#",
    hobby: {
      colorTheme: "emerald",
      tagline: "免费、断网可用的批量抠图神器",
      motivation: "在线抠图工具要么收费，要么有数量限制，而且把照片传到云端总觉得不安全。我想要一个完全在本地运行的工具，免费、安全，而且能一次处理很多张图。",
      features: [
        {
          title: "本地运行",
          desc: "所有计算都在本地电脑上完成，不用联网，不用担心隐私泄露。",
          icon: "Cpu"
        },
        {
          title: "双模式",
          desc: "支持单张图片精修，也支持直接把一个文件夹的图片扔进去批量处理。",
          icon: "Layers"
        },
        {
          title: "灵活输出",
          desc: "可以输出透明背景的 PNG以及黑白的遮罩图，方便美术后续使用。",
          icon: "Image"
        }
      ],
      useCases: [
        {
          title: "电商美工的“上新日”",
          pain: "双十一前夕，有500个 SKU 的产品图需要扣除背景做海报，PS 钢笔工具扣到手抽筋。",
          solution: "打开“批量处理模式”，指向摄影师给的原始图文件夹，点击开始。去喝杯咖啡，回来时500张透明底的产品图已经整齐地躺在输出目录里了。"
        },
        {
          title: "AI 模型训练师",
          pain: "需要制作 LoRA 或 ControlNet 的训练集，需要大量的高质量 Mask 蒙版。",
          solution: "选择“获取图像轮廓”模式，批量将数千张素材转换为二值化蒙版，极大地加速了数据集准备流程。"
        },
        {
          title: "UI/UX 设计师的日常",
          pain: "这种图标/人像素材需要快速去底看看效果，打开 PS 太慢。",
          solution: "保持软件常驻后台。直接把素材拖进窗口，秒出预览图。拖动滑块检查边缘，满意直接保存。"
        }
      ],
      devLog: [
        { status: "done", text: "集成 rembg 库进行背景去除" },
        { status: "done", text: "实现了批量处理队列" },
        { status: "done", text: "添加了轮廓描边算法" },
        { status: "done", text: "实现无边框窗口与自定义标题栏" },
        { status: "done", text: "优化内存管理，解决批量处理泄漏问题" }
      ],
    },
    insights: [
      {
        title: "挑战: 界面卡死",
        content: "起因: 点击开始处理后，界面就动不了了。思路: AI 告诉我需要把计算任务放到后台线程去跑。结果: 加上多线程后，处理过程中界面也能随意拖动了。"
      },
      {
        title: "挑战: 自定义窗口",
        content: "起因: 想要无边框的窗口，但去掉了标题栏就没法拖动了。思路: 告诉 AI 我想要的效果，它帮我实现了自定义的拖动逻辑。结果: 还原了原生窗口的拖动体验。"
      },
      {
        title: "挑战: 内存占用过高",
        content: "起因: 批量处理大量图片时，内存一直在涨。思路: 发现 Python 不会自动把用完的“垃圾”清理干净。我加上了强制清理内存的代码，哪怕连续跑一万张图，内存占用也是平稳的。结果: 内存占用稳定了。"
      },
      {
        title: "深度复盘: PyTorch + PyQt5 DLL 冲突终极解决方案",
        content: "起因: 在 Windows 环境下，PyTorch 和 PyQt5 因共享底层依赖 (OpenSSL/MKL) 及 multiprocessing 的 spawn 机制导致严重的 DLL 加载冲突 (WinError 1114)。思路: 放弃常规的 import 调整，重构为三层进程隔离架构。Launcher 入口保持纯净，主进程独占 Qt5 GUI，子进程独占 PyTorch AI 推理，确保两者永不相见。结果: 彻底根治了 DLL 冲突，同时实现了 GUI 秒开。收获: 解决复杂依赖问题的最佳路径往往不是“修复”，而是“隔离”。"
      },
      {
        title: "心得: 享受报错",
        content: "以前怕报错，现在觉得报错是发现问题的机会。把报错信息发给 AI，看它分析原因，也是一种学习。"
      }
    ]
  },
  {
    id: "hobby-6",
    title: "Excel Data Compare",
    description: "能够自动对齐数据的表格找茬工具。它不依赖行号，而是像人一样通过“关键列”（比如 SKU 或 身份证号）来匹配数据，专门用来找出两个表格到底哪里不一样。",
    type: "hobby",
    technologies: ["Python", "PyQt5", "Pandas", "OpenPyXL"],
    year: "2024",
    status: "completed",
    github: "#",
    hobby: {
      colorTheme: "emerald",
      tagline: "无需公式，一键搞定表格差异核对",
      motivation: "处理表格数据时，经常遇到版本迭代导致行号对不上的问题，用 Excel 公式对比很麻烦。我需要一个工具，能忽略行号的变化，直接通过关键列（比如 SKU）来对比数据，并且自动忽略掉一些无关紧要的格式差异。",
      features: [
        {
          title: "索引对齐",
          desc: "不管数据行怎么乱，只要关键列（比如 ID）对得上，就能正确对比。",
          icon: "GitMerge"
        },
        {
          title: "智能清洗",
          desc: "在对比前会自动“清洗”数据。不管是文本格式的数字，还是带空格的文字，它都能自动识别并统一标准，防止因为格式问题导致误报。。",
          icon: "Sparkles"
        },
        {
          title: "列映射",
          desc: "支持手动指定哪些列需要对比，即使列名不一样也能关联起来。",
          icon: "List"
        },
        {
          title: "快速启动",
          desc: "采用了按需加载的策略，打开软件时不加载沉重的处理功能，只有当你点击“开始对比”时才运行，保证软件秒开。",
          icon: "Zap"
        },
        {
          title: "简单易用",
          desc: "操作很简单，大部分情况下点一下自动匹配就能开始对比。",
          icon: "MousePointer"
        }
      ],
      useCases: [
        {
          title: "电商运营的 SKU 价格核对",
          pain: "供应商发来新的价格表，几千个 SKU，顺序全乱了，只想知道哪些商品涨价了。",
          solution: "以‘SKU编码’为索引，自动匹配‘供货价’列。工具会直接输出所有价格变动的商品明细，涨跌一目了然。"
        },
        {
          title: "HR 的花名册更新",
          pain: "总部发来的新名单和本地名单对比，有人离职，有人新入职，还有人改了电话。",
          solution: "以‘身份证号’或‘工号’为索引，全选所有列进行对比。工具不仅能发现信息变更，还能通过未匹配的索引快速找出新增和减少的人员。"
        },
        {
          title: "财务报表的版本比对",
          pain: "财务系统导出的 V1 版和 V2 版报表，金额看起来一样，但总数对不上，不知道是哪一笔出了问题。",
          solution: "利用工具的‘智能清洗’功能，忽略格式差异，精准定位到那笔被修改了‘0.01’元的异常账目。"
        }
      ],
      devLog: [
        { status: "done", text: "Pandas 数据帧差异比对核心逻辑" },
        { status: "done", text: "PyQt5 界面布局设计" },
        { status: "done", text: "实现了差异结果的高亮显示" },
        { status: "done", text: "实现懒加载 (Lazy Import) 优化启动速度" },
        { status: "done", text: "开发数据归一化管道 (Normalization Pipeline)" }
      ],
    },
    insights: [
      {
        title: "挑战: 启动慢",
        content: "问题: 数据处理库（Pandas）太大了，一运行软件就要加载很久，体验很差。解决: 改成了“懒加载”。软件启动时只显示界面，等你真正要处理数据了，再在后台加载那个庞大的库。这样界面就能秒开了。"
      },
      {
        title: "挑战: 数据格式不统一",
        content: "问题: Excel 里的数字格式千奇百怪。解决: 做了一套预处理规则。在对比前，先把所有数据都“刷”一遍，去掉空格、统一数字格式，确保对比的是内容本身。"
      },
      {
        title: "心得: 信任感",
        content: "对于财务或运营来说，工具报的一个错可能就要查半天。所以我在“防误报”上花的精力，比做漂亮界面要多一些。工具可以不够美，但绝对不能骗人。"
      },
      {
        title: "心得: 顺应直觉",
        content: "工具的操作流程应该符合直觉，让用户感觉不到“操作”的存在，直接就能上手用。"
      }
    ]
  },

  {
    id: "hobby-7",

    title: "自动打卡小助手",
    description: "解决下班忘记打卡问题的自动化辅助工具。支持定时触发与开机自启，是验证 AI 辅助开发全流程的轻量级实践。",
    type: "hobby",
    technologies: ["python", "QT5"],
    year: "2024",
    status: "completed",
    github: "#",
    hobby: {
      colorTheme: "purple",
      tagline: "解决下班忘打卡的小工具",
      motivation: "纯粹是为了解决自己老忘打卡的问题。这也是我第一次尝试完全用 AI 来写一个实用的小工具，整个过程就像聊天一样轻松。",
      features: [
        { title: "开机自启", icon: "Zap", desc: "电脑开机自动运行，不用手动点。" },
        { title: "定时触发", icon: "History", desc: "到了下班时间自动弹窗提醒。" },
        { title: "模拟点击", icon: "Activity", desc: "自动帮你点一下打卡按钮。" }
      ],
      useCases: [
        { title: "下班忘打卡", pain: "经常忙到忘记点打卡软件", solution: "设置定时任务，到点自动弹窗并模拟点击" },
        { title: "电脑重启后失效", pain: "重启后忘记重新打开软件", solution: "实现开机自启，无感运行" }
      ],
      devLog: [
        { status: "done", text: "第一次实现开机自启功能" },
        { status: "done", text: "调试注册表写入权限" },
        { status: "done", text: "优化托盘图标交互" }
      ],
    },
    insights: [
      {
        title: "怎么让软件一开机就跑？",
        content: "我直接询问 AI “怎么实现开机自启”，它不仅给了代码，还解释了原理。我发现只要把问题描述清楚，技术难点其实很好解决。"
      },
      {
        title: "从“写代码”到“审代码”",
        content: "这个软件真是“聊”出来的。我提需求，AI 写代码。只要逻辑通顺，AI 就是最好的帮手。"
      }
    ],
  },

]
