import type { Project } from '@/lib/types'

export const pluginProjects: Project[] = [
  {
    id: "plugin-1",
    title: "Comfy Controller",
    description: "ComfyController 是一个将复杂的 ComfyUI 工作流封装为现代化 Web 前端的尝试。它不仅仅是一个简单的接口调用工具，而是开发者（我）第一次借助 AI 的力量，将自己精心搭建的 ComfyUI 工作流（从图生图、文生图到标题生成）转化为一个可视化的、用户友好的桌面级应用。它隐藏了底层复杂的节点连接，实现了从‘技术后台’到‘产品前台’的跨越。",
    type: "plugin",
    technologies: ["Python", "JavaScript", "ComfyUI API", "WebSocket"],
    year: "2024",
    status: "completed",
    github: "#",
    plugin: {
      hasGlobalComparison: false,
      gallery: [
        "ASSET_SLOT: CONTROLLER_DASHBOARD.png",
        "ASSET_SLOT: CONTROLLER_TASK_LIST.png",
        "ASSET_SLOT: CONTROLLER_SETTINGS.png",
        "ASSET_SLOT: CONTROLLER_LOGS.png"
      ],
      painPoint: {
        title: "从节点到界面",
        desc: "作为一个 ComfyUI 的重度使用者，我搭建了一套成熟的工作流，但每次操作都要面对密密麻麻的节点和连线，效率极低且难以分享给他人使用。我希望打破 ComfyUI 的操作壁垒，将其封装成一个独立的 Web 应用。在这个过程中，我不仅是在写代码，更是在探索‘非程序员’如何通过与 AI 的深度对话，构建出功能完整、逻辑复杂的软件产品。",
        stats: ["操作繁琐", "难以分享"]
      },
      pipeline: {
        input: "批量文档 / 图像素材",
        process: "Web 前端调度 -> ComfyUI API 执行 -> 实时状态反馈",
        output: "分类归档的生成结果 & 结构化记录"
      },
      installation: {
        npm: "git clone comfy-controller"
      },
      items: [
        {
          title: "图生图",
          desc: "基于现有图像进行风格转换和内容重绘，支持多种生成模式和参数调节。",
          tag: "Core",
          image: "ASSET_SLOT: CONTROLLER_IMG2IMG.png",
          problem: "手动在 ComfyUI 中调整图生图参数繁琐且难以批量处理。",
          solution: "Web 界面封装图生图工作流，提供直观的参数控制和批量处理能力。",
          features: ["图像风格转换", "参数可视化", "批量生成"]
        },
        {
          title: "标题生成",
          desc: "基于图像内容或文本提示自动生成标题，集成智能文本生成模型。",
          tag: "AI",
          image: "ASSET_SLOT: CONTROLLER_TITLE_GEN.png",
          problem: "为大量生成内容手动编写标题耗时且缺乏一致性。",
          solution: "集成 AI 模型自动生成标题，支持自定义模板和风格。",
          features: ["智能标题生成", "模板定制", "批量处理"]
        },
        {
          title: "文本处理",
          desc: "批量导入和处理文本内容，支持文本预处理和格式化。",
          tag: "Batch",
          image: "ASSET_SLOT: CONTROLLER_TEXT_PROC.png",
          problem: "大量文本素材需要逐个手动输入到 ComfyUI 工作流中。",
          solution: "支持批量文本导入，自动对接工作流进行处理。",
          features: ["批量文本导入", "格式化处理", "自动队列"]
        },
        {
          title: "图像批处理",
          desc: "批量加载图像并自动执行工作流，支持结果实时预览和分类管理。",
          tag: "Batch",
          image: "ASSET_SLOT: CONTROLLER_BATCH_IMG.png",
          problem: "处理大量图像时需要反复手动操作，效率低下。",
          solution: "自动化批量图像处理流程，实时预览和结构化管理生成结果。",
          features: ["批量图像加载", "实时预览", "分类归档"]
        }
      ]
    },
    insights: [
      {
        title: "挑战: 文本回显的“幽灵”",
        content: "起因: 实时读取后端生成的 TXT 内容时，要么加载不出，要么只加载一次。思路: 优化前端轮询机制和后端文件写入逻辑，解决读取时机与异步更新的冲突。结果: 实现了稳定的文本实时回显。收获: 文件 I/O 与前端渲染的同步是实时交互的难点。"
      },
      {
        title: "挑战: 单文件代码的膨胀",
        content: "起因: 起初将所有代码写在一个文件里，导致维护困难，AI 也开始“晕头转向”。思路: 进行模块化重构，分离逻辑层和视图层。结果: 代码结构清晰，维护效率成倍提升。收获: 即使是小项目，良好的架构也是必不可少的。"
      },
      {
        title: "挑战: 与 UI 的细节博弈",
        content: "起因: 对布局对齐、交互反馈等 UI 细节有高要求。思路: 不断向 AI 描述想要的“感觉”，微调 CSS 参数。结果: 打磨出了既美观又实用的界面。收获: UI 开发不仅是代码，更是审美的磨合。"
      }
    ]
  },
  {
    id: "plugin-2",
    title: "ComfyUI-ZKZNodes",
    description: "ComfyUI-ZKZNodes 包含了一系列为了满足工作流完整性、可用性及便利性而定制的节点。从简单的图像裁剪、去背景，到复杂的队列管理、计数器逻辑，每一个节点都源于实际工作中的痛点。这个项目最大的特点在于：所有代码均由 AI 辅助完成。它记录了我从对代码一窍不通，到能够通过 AI 实现自动化 JS 脚本、封装复杂逻辑节点的完整心路历程。",
    type: "plugin",
    technologies: ["Python", "JavaScript", "ComfyUI Custom Nodes"],
    year: "2025",
    status: "active",
    github: "#",
    plugin: {
      hasGlobalComparison: false,
      painPoint: {
        title: "从需求到实现",
        desc: "在使用 ComfyUI 的过程中，我经常遇到一些“差一点点”的情况：现有的节点无法满足特定的裁剪需求，批量处理时缺乏有效的计数或队列控制，或者工作流的中间结果需要更灵活的保存方式。为了解决这些阻碍工作流顺畅运行的“小石子”，我决定借助 AI 的力量，补全这些缺失的拼图。",
        stats: ["功能缺失", "流程中断"]
      },
      pipeline: {
        input: "标准 ComfyUI 数据流",
        process: "自定义节点逻辑 (Python/JS)",
        output: "增强后的数据流 / 文件产物"
      },
      installation: {
        cmd: "git clone into custom_nodes"
      },
      items: [
        // Logic Nodes
        {
          title: "计数器",
          desc: "支持增减、随机及固定模式的通用计数器，状态持久化。",
          tag: "Logic",
          command: "CounterNode",
          image: "ASSET_SLOT: NODE_COUNTER.png"
        },
        {
          title: "队列管理",
          desc: "基于倒计时的队列控制，支持一次性或即时触发模式。",
          tag: "Logic",
          command: "VrchCountdownQueueControlNode",
          image: "ASSET_SLOT: NODE_QUEUE.png"
        },
        {
          title: "节点状态切换器",
          desc: "达到指定计数后自动切换目标节点的启用/禁用状态。",
          tag: "Logic",
          command: "ImpactCountdownNodeStateSwitcher",
          image: "ASSET_SLOT: NODE_SWITCHER.png"
        },
        {
          title: "随机数字",
          desc: "生成指定范围内的随机整数、浮点数及字符串。",
          tag: "Logic",
          command: "VrchRandomNumber",
          image: "ASSET_SLOT: NODE_RANDOM.png"
        },

        // Image Processing Nodes
        {
          title: "图像裁剪高级版",
          desc: "智能裁剪透明区域并按比例缩放，支持顶部/侧边空间控制。",
          tag: "Image",
          command: "ImageProcessor",
          image: "ASSET_SLOT: NODE_PROCESSOR.png"
        },
        {
          title: "裁剪透明区域",
          desc: "自动检测并裁剪图像中的透明区域，支持自定义边距。",
          tag: "Image",
          command: "CropTransparentImageNode",
          image: "ASSET_SLOT: NODE_CROP_TRANS.png"
        },
        {
          title: "裁剪透明并缩放",
          desc: "裁剪透明区域后缩放至指定尺寸，支持多种适配模式。",
          tag: "Image",
          command: "CropTransparentAndResizeNode",
          image: "ASSET_SLOT: NODE_CROP_RESIZE.png"
        },
        {
          title: "裁剪黑白边框",
          desc: "自动检测并移除图像四周的黑色或白色边框。",
          tag: "Image",
          command: "CropBlackAndWhiteBordersNode",
          image: "ASSET_SLOT: NODE_CROP_BW.png"
        },
        {
          title: "扩展透明边",
          desc: "在图像四周增加指定像素的透明区域。",
          tag: "Image",
          command: "ExpandTransparentBorderNode",
          image: "ASSET_SLOT: NODE_EXPAND.png"
        },
        {
          title: "图像透明分割",
          desc: "基于透明度阈值将图像分割为多个独立部分。",
          tag: "Image",
          command: "ImageSplitterByTransparency",
          image: "ASSET_SLOT: NODE_SPLIT.png"
        },
        {
          title: "隔离颜色（黑/白）",
          desc: "将图像中的黑色或白色背景转为透明。",
          tag: "Image",
          command: "VrchIsolateColorNode",
          image: "ASSET_SLOT: NODE_ISOLATE.png"
        },
        {
          title: "图像底部拉伸",
          desc: "拉伸图像底部边缘以填充指定比例的区域。",
          tag: "Image",
          command: "StretchBottomNode",
          image: "ASSET_SLOT: NODE_STRETCH.png"
        },
        {
          title: "图像切换",
          desc: "根据条件在两张输入图像之间进行切换输出。",
          tag: "Image",
          command: "ImageSwitchNode",
          image: "ASSET_SLOT: NODE_IMG_SWITCH.png"
        },

        // IO Nodes
        {
          title: "批量加载图像",
          desc: "支持文件名模式匹配和循环读取的批量图像加载器。",
          tag: "IO",
          command: "Simple_Load_Image_Batch",
          image: "ASSET_SLOT: NODE_LOAD_BATCH.png"
        },
        {
          title: "加载透明PNG图像",
          desc: "支持从本地路径或 URL 加载带有 Alpha 通道的 PNG 图像。",
          tag: "IO",
          command: "LoadRGBALocalOrURL",
          image: "ASSET_SLOT: NODE_LOAD_RGBA.png"
        },
        {
          title: "保存图像",
          desc: "增强版保存节点，支持日期文件夹和灵活的命名规则。",
          tag: "IO",
          command: "VrchSaveImageNode",
          image: "ASSET_SLOT: NODE_SAVE_IMG.png"
        },
        {
          title: "条件保存图像",
          desc: "仅在满足特定条件时执行保存操作。",
          tag: "IO",
          command: "ConditionalSaveImageNode",
          image: "ASSET_SLOT: NODE_SAVE_COND.png"
        },
        {
          title: "保存文本",
          desc: "将字符串内容保存为 TXT 文件，支持自动编号。",
          tag: "IO",
          command: "ZKZSaveTextNode",
          image: "ASSET_SLOT: NODE_SAVE_TXT.png"
        },
        {
          title: "顺序文本读取",
          desc: "逐行读取文本文件，支持循环和重置。",
          tag: "IO",
          command: "SequentialReaderNode_ZKZ",
          image: "ASSET_SLOT: NODE_READ_SEQ.png"
        }
      ]
    },
    insights: [
      {
        title: "挑战: 消失的节点与注册陷阱",
        content: "起因: 写好代码后节点不显示，或者忘记在 __init__.py 注册。思路: 理解了节点注册机制，养成检查 __init__.py 的习惯。结果: 能够熟练添加新节点。收获: 配置与代码同样重要。"
      },
      {
        title: "挑战: 输入输出的“类型之墙”",
        content: "起因: 节点连接时经常报错，因为不懂 INPUT_TYPES 和 RETURN_TYPES 的严格对应。思路: 学习数据流概念，严格规范类型定义。结果: 节点连接稳定可靠。收获: 类型系统是节点交互的基石。"
      },
      {
        title: "挑战: 计数器的“种子”奥秘",
        content: "起因: 计数器不更新，因为 ComfyUI 认为参数未变无需重跑。思路: 引入 seed 值作为“脉搏”强制唤醒节点。结果: 计数器正常工作。收获: 理解了 ComfyUI 的缓存与执行机制。"
      },
      {
        title: "挑战: AI 辅助下的全栈尝试",
        content: "起因: 想优化交互但不懂前端 JS。思路: 指挥 AI 编写 JS 扩展，模拟鼠标点击实现队列切换。结果: 实现了复杂的交互逻辑。收获: 即使不懂代码，也能通过 AI 实现全栈开发。"
      }
    ]
  },
  {
    id: "plugin-3",
    title: "Lora",
    description: "图像生成模型lora。",
    type: "plugin",
    technologies: ["PyTorch", "Stable Diffusion"],
    year: "2024",
    status: "active",
    github: "#",
    plugin: {
      hasGlobalComparison: false, // Disable global comparison
      painPoint: {
        title: "风格不统一",
        desc: "基础模型生成的图像风格多变，难以满足特定项目的统一视觉要求。",
        stats: ["风格漂移", "质量不稳定"]
      },
      pipeline: {
        input: "20张特定风格/角色的训练集图片",
        process: "LoRA 训练 & 权重提取",
        output: "轻量级风格模型 (.safetensors)",
      },
      installation: {
        cmd: "Place in models/loras folder"
      },
      items: [
        {
          title: "Cyberpunk Style",
          desc: "为画面注入强烈的霓虹色彩与高对比度光影，完美复刻赛博朋克视觉风格。",
          tag: "Style",
          command: "<lora:cyberpunk:0.8>",
          image: "ASSET_SLOT: CYBERPUNK_BEFORE.jpg",
          comparisonImage: "ASSET_SLOT: CYBERPUNK_AFTER.jpg",
          problem: "普通模型生成的赛博朋克场景缺乏质感与光影层次。",
          solution: "通过 5000+ 张精选赛博朋克概念图训练，精确捕捉霓虹光晕与金属质感。",
          features: ["增强霓虹光感", "强化金属反射", "暗部细节保留"]
        },
        {
          title: "Watercolor",
          desc: "模拟传统水彩画的晕染与笔触效果，让 AI 生成的图像拥有手绘的温度。",
          tag: "Art",
          command: "<lora:watercolor:1.0>",
          image: "ASSET_SLOT: WATERCOLOR_BEFORE.jpg",
          comparisonImage: "ASSET_SLOT: WATERCOLOR_AFTER.jpg",
          problem: "AI 生成的插画往往过于平滑，缺乏纸张纹理与颜料流动感。",
          solution: "专注于水彩边缘的随机性与颜色的透明叠加效果。",
          features: ["纸张纹理模拟", "边缘晕染效果", "色彩透明度控制"]
        },
        {
          title: "Mecha Design",
          desc: "专为机甲设计优化的模型，能够生成结构严谨、细节丰富的机械设定图。",
          tag: "Concept",
          command: "<lora:mecha:0.7>",
          image: "ASSET_SLOT: MECHA_BEFORE.jpg",
          comparisonImage: "ASSET_SLOT: MECHA_AFTER.jpg",
          problem: "通用模型生成的机械结构往往逻辑混乱，缺乏工业设计的合理性。",
          solution: "基于工业设计图纸训练，强化机械关节与装甲板的结构逻辑。",
          features: ["硬表面建模质感", "合理的关节结构", "丰富的面板细节"]
        }
      ]
    },
    insights: [
      {
        title: "痛点: LoRA 过拟合,效果变差",
        content: "起因: 盲目堆 100+ 张训练图,风格污染、泛化差。思路: 换成 20-30 张高质量同风格的小集。结果: 风格更纯、更稳。收获: 数据量不等于效果,清洗和一致性更关键。"
      },
      {
        title: "痛点: 学习率不稳,模型出噪或学不到",
        content: "起因: 学习率设高出噪点,设低学不到。思路: 区间锁在 1e-4~5e-4,配合 cosine decay。结果: 收敛更稳定。收获: 调参要有区间和节奏,不是瞎撞。"
      },
      {
        title: "痛点: 训练污染基础模型",
        content: "起因: 没有统一触发词,基础模型被无意改写。思路: 训练标注统一 trigger word,推理必须加该词。结果: 风格可控、不污染基础模型。收获: 约束是一种保护。"
      }
    ]
  },
  {
    id: "plugin-4",
    title: "workflows",
    description: "一些comfyui中的工作流。",
    type: "plugin",
    technologies: ["comfyui", "Stable Diffusion"],
    year: "2025",
    status: "active",
    github: "#",
    plugin: {
      hasGlobalComparison: false,
      painPoint: {
        title: "从零构建耗时",
        desc: "每次新建项目都需要重新搭建复杂的工作流，重复造轮子。",
        stats: ["时间浪费", "经验难以复用"]
      },
      pipeline: {
        input: "原始创意 / 基础提示词",
        process: "加载特定功能的 ComfyUI 工作流模版",
        output: "高质量、风格统一的生成结果"
      },
      installation: {
        cmd: "Load .json file"
      },
      items: [
        {
          title: "Hires Fix Ultimate",
          desc: "终极高清修复工作流，结合了 Tile ControlNet 与 Ultimate SD Upscale。",
          tag: "Upscale",
          image: "ASSET_SLOT: WORKFLOW_HIRES.png",
          problem: "直接生成的高分辨率图像容易出现崩坏或细节模糊。",
          solution: "通过分块重绘与 ControlNet 约束，在放大图像的同时增加细节。",
          features: ["8k 分辨率支持", "细节丰富度提升", "显存占用优化"]
        },
        {
          title: "Inpainting Master",
          desc: "全能局部重绘工作流，支持自动蒙版生成与无痕融合。",
          tag: "Edit",
          image: "ASSET_SLOT: WORKFLOW_INPAINT.png",
          problem: "传统重绘需要手动涂抹蒙版，且边缘融合效果差。",
          solution: "集成 SAM (Segment Anything) 自动抠图，配合 LaMa 模型实现无痕填充。",
          features: ["SAM 自动蒙版", "LaMa 无痕填充", "光影自动匹配"]
        },
        {
          title: "Video to Anime",
          desc: "真人视频转动漫风格工作流，保持画面稳定性与连贯性。",
          tag: "Video",
          image: "ASSET_SLOT: WORKFLOW_V2A.png",
          problem: "视频转绘容易出现闪烁（Flickering）与帧间不连贯。",
          solution: "利用 AnimateDiff 与 TemporalNet 锁定帧间一致性。",
          features: ["无闪烁处理", "风格高度统一", "支持长视频"]
        }
      ]
    },
    insights: [
      {
        title: "痛点: 参数过多吓退用户,过少又不够用",
        content: "起因: 通用工作流模板要兼顾小白和进阶用户。思路: 默认值覆盖 90% 场景,高级选项折叠给进阶。结果: 小白能直接跑,进阶不被束缚。收获: 分层设计能兼顾易用与灵活。"
      },
      {
        title: "痛点: 节点版本更新导致旧 JSON 失效",
        content: "起因: 节点 API 频繁更新,老工作流加载失败。思路: 记录节点版本并做简单迁移映射。结果: 老工作流可继续使用。收获: 留痕和迁移策略能减少维护风险。"
      }
    ]
  },
  {
    id: "plugin-5",
    title: "blender插件",
    description: "一款用于 Blender 的自动化脚本插件，专门为批量自动化渲染设计。",
    type: "plugin",
    technologies: ["python", "blender"],
    year: "2025",
    status: "completed",
    github: "#",
    plugin: {
      hasGlobalComparison: true,
      painPoint: {
        title: "渲染任务繁琐",
        desc: "手动设置每个场景的渲染参数耗时且容易出错，尤其是在处理数百个模型时。",
        stats: ["重复操作多", "易出错"]
      },
      pipeline: {
        input: "包含多个场景/视角的 .blend 源文件",
        process: "Python 脚本自动遍历 & 渲染队列",
        output: "按命名规则分类的渲染成品图"
      },
      installation: {
        cmd: "Install via Blender Preferences > Add-ons"
      }
    },
    insights: [
      {
        title: "痛点: Blender 版本差异导致脚本频繁报错",
        content: "起因: 2.8 到 3.0 API 差异大,脚本在不同版本崩溃。思路: 用 hasattr 做动态检测分支。结果: 同一脚本在多版本可跑。收获: 兼容性要前置,别等用户踩雷。"
      },
      {
        title: "痛点: 批量渲染内存飙升",
        content: "起因: 连续渲染数百场景,缓存不释放导致崩溃。思路: 渲染后手动清理 bpy.data.images,定期触发 GC。结果: 长时间批量跑不再崩。收获: 自动化也要对资源负责。"
      }
    ]
  },
]
