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
        "/showcase/plugins/plugin-1/gallery-01.png",
        "/showcase/plugins/plugin-1/gallery-02.png",
        "/showcase/plugins/plugin-1/gallery-03.png",
        "/showcase/plugins/plugin-1/gallery-04.png"
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
          image: "/showcase/plugins/plugin-1/items/controller-img2img.png",
          problem: "手动在 ComfyUI 中调整图生图参数繁琐且难以批量处理。",
          solution: "Web 界面封装图生图工作流，提供直观的参数控制和批量处理能力。",
          features: ["图像风格转换", "参数可视化", "批量生成"]
        },
        {
          title: "标题生成",
          desc: "基于图像内容或文本提示自动生成标题，集成智能文本生成模型。",
          tag: "AI",
          image: "/showcase/plugins/plugin-1/items/controller-title-gen.png",
          problem: "为大量生成内容手动编写标题耗时且缺乏一致性。",
          solution: "集成 AI 模型自动生成标题，支持自定义模板和风格。",
          features: ["智能标题生成", "模板定制", "批量处理"]
        },
        {
          title: "文本处理",
          desc: "批量导入和处理文本内容，支持文本预处理和格式化。",
          tag: "Batch",
          image: "/showcase/plugins/plugin-1/items/controller-text-proc.png",
          problem: "大量文本素材需要逐个手动输入到 ComfyUI 工作流中。",
          solution: "支持批量文本导入，自动对接工作流进行处理。",
          features: ["批量文本导入", "格式化处理", "自动队列"]
        },
        {
          title: "图像批处理",
          desc: "批量加载图像并自动执行工作流，支持结果实时预览和分类管理。",
          tag: "Batch",
          image: "/showcase/plugins/plugin-1/items/controller-batch-img.png",
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
          image: "/showcase/plugins/plugin-2/items/node-counter.png"
        },
        {
          title: "队列管理",
          desc: "基于倒计时的队列控制，支持一次性或即时触发模式。",
          tag: "Logic",
          command: "VrchCountdownQueueControlNode",
          image: "/showcase/plugins/plugin-2/items/node-queue.png"
        },
        {
          title: "节点状态切换器",
          desc: "达到指定计数后自动切换目标节点的启用/禁用状态。",
          tag: "Logic",
          command: "ImpactCountdownNodeStateSwitcher",
          image: "/showcase/plugins/plugin-2/items/node-switcher.png"
        },
        {
          title: "随机数字",
          desc: "生成指定范围内的随机整数、浮点数及字符串。",
          tag: "Logic",
          command: "VrchRandomNumber",
          image: "/showcase/plugins/plugin-2/items/node-random.png"
        },

        // Image Processing Nodes
        {
          title: "图像裁剪高级版",
          desc: "智能裁剪透明区域并按比例缩放，支持顶部/侧边空间控制。",
          tag: "Image",
          command: "ImageProcessor",
          image: "/showcase/plugins/plugin-2/items/node-processor.png"
        },
        {
          title: "裁剪透明区域",
          desc: "自动检测并裁剪图像中的透明区域，支持自定义边距。",
          tag: "Image",
          command: "CropTransparentImageNode",
          image: "/showcase/plugins/plugin-2/items/node-crop-trans.png"
        },
        {
          title: "裁剪透明并缩放",
          desc: "裁剪透明区域后缩放至指定尺寸，支持多种适配模式。",
          tag: "Image",
          command: "CropTransparentAndResizeNode",
          image: "/showcase/plugins/plugin-2/items/node-crop-resize.png"
        },
        {
          title: "裁剪黑白边框",
          desc: "自动检测并移除图像四周的黑色或白色边框。",
          tag: "Image",
          command: "CropBlackAndWhiteBordersNode",
          image: "/showcase/plugins/plugin-2/items/node-crop-bw.png"
        },
        {
          title: "扩展透明边",
          desc: "在图像四周增加指定像素的透明区域。",
          tag: "Image",
          command: "ExpandTransparentBorderNode",
          image: "/showcase/plugins/plugin-2/items/node-expand.png"
        },
        {
          title: "图像透明分割",
          desc: "基于透明度阈值将图像分割为多个独立部分。",
          tag: "Image",
          command: "ImageSplitterByTransparency",
          image: "/showcase/plugins/plugin-2/items/node-split.png"
        },
        {
          title: "隔离颜色（黑/白）",
          desc: "将图像中的黑色或白色背景转为透明。",
          tag: "Image",
          command: "VrchIsolateColorNode",
          image: "/showcase/plugins/plugin-2/items/node-isolate.png"
        },
        {
          title: "图像底部拉伸",
          desc: "拉伸图像底部边缘以填充指定比例的区域。",
          tag: "Image",
          command: "StretchBottomNode",
          image: "/showcase/plugins/plugin-2/items/node-stretch.png"
        },
        {
          title: "图像切换",
          desc: "根据条件在两张输入图像之间进行切换输出。",
          tag: "Image",
          command: "ImageSwitchNode",
          image: "/showcase/plugins/plugin-2/items/node-img-switch.png"
        },

        // IO Nodes
        {
          title: "批量加载图像",
          desc: "支持文件名模式匹配和循环读取的批量图像加载器。",
          tag: "IO",
          command: "Simple_Load_Image_Batch",
          image: "/showcase/plugins/plugin-2/items/node-load-batch.png"
        },
        {
          title: "加载透明PNG图像",
          desc: "支持从本地路径或 URL 加载带有 Alpha 通道的 PNG 图像。",
          tag: "IO",
          command: "LoadRGBALocalOrURL",
          image: "/showcase/plugins/plugin-2/items/node-load-rgba.png"
        },
        {
          title: "保存图像",
          desc: "增强版保存节点，支持日期文件夹和灵活的命名规则。",
          tag: "IO",
          command: "VrchSaveImageNode",
          image: "/showcase/plugins/plugin-2/items/node-save-img.png"
        },
        {
          title: "条件保存图像",
          desc: "仅在满足特定条件时执行保存操作。",
          tag: "IO",
          command: "ConditionalSaveImageNode",
          image: "/showcase/plugins/plugin-2/items/node-save-cond.png"
        },
        {
          title: "保存文本",
          desc: "将字符串内容保存为 TXT 文件，支持自动编号。",
          tag: "IO",
          command: "ZKZSaveTextNode",
          image: "/showcase/plugins/plugin-2/items/node-save-txt.png"
        },
        {
          title: "顺序文本读取",
          desc: "逐行读取文本文件，支持循环和重置。",
          tag: "IO",
          command: "SequentialReaderNode_ZKZ",
          image: "/showcase/plugins/plugin-2/items/node-read-seq.png"
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
        title: "繁琐的后期修补",
        desc: "虽然 AI 生成速度极快，但往往伴随着光影错误、水印残留或细节丢失。为了修正这些瑕疵，创作者不得不花费大量时间在 PS 中进行重复性的修补工作，这成为了工作流中最大的效率瓶颈。",
        stats: ["重复劳动", "难以精确控制", "细节丢失", "效率低下"]
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
          title: "打光溶图",
          desc: "通过 LoRA 模型精确控制画面光影，实现自然且富有层次的溶图效果，解决合成图像光感不统一的问题。",
          tag: "Lighting",
          command: "<lora:lighting_blend:0.8>",
          image: "/showcase/plugins/plugin-3/items/lighting-before.png",
          comparisonImage: "/showcase/plugins/plugin-3/items/lighting-after.png",
          trainingImage: "/showcase/plugins/plugin-3/items/lighting-train.png",
          trainingThoughts: "重点在于收集不同光照环境下的物体融合案例，训练模型理解光线在不同材质边缘的衰减与反射规律。",
          problem: "传统溶图需要大量手动绘制光影，效率低且容易穿帮。",
          solution: "自动化生成符合环境光照的融合效果，大幅提升合成效率。",
          features: ["环境光匹配", "边缘光影融合", "多光源支持"]
        },
        {
          title: "去水印",
          desc: "针对性训练的去水印模型，能够智能识别并移除画面中的复杂水印，同时自动修补被遮挡的纹理细节。",
          tag: "Utility",
          command: "<lora:watermark_remover:1.0>",
          image: "/showcase/plugins/plugin-3/items/watermark-before.png",
          comparisonImage: "/showcase/plugins/plugin-3/items/watermark-after.png",
          trainingImage: "/showcase/plugins/plugin-3/items/watermark-train.png",
          trainingThoughts: "构建包含‘水印/无水印’配对的数据集，强迫模型学习水印覆盖下的图像特征恢复。",
          problem: "常规去水印工具难以处理大面积或半透明的复杂水印。",
          solution: "利用深度学习理解图像上下文，实现无痕去除与纹理重构。",
          features: ["复杂水印识别", "纹理智能修补", "保持画质无损"]
        },
        {
          title: "人像过曝拉回",
          desc: "专门用于修复过曝人像的 LoRA，能够找回高光溢出区域的皮肤纹理与色彩细节，重塑面部立体感。",
          tag: "Portrait",
          command: "<lora:exposure_fix:0.7>",
          image: "/showcase/plugins/plugin-3/items/exposure-before.png",
          comparisonImage: "/showcase/plugins/plugin-3/items/exposure-after.png",
          trainingImage: "/showcase/plugins/plugin-3/items/exposure-train.png",
          trainingThoughts: "使用高动态范围（HDR）图像作为训练底板，让模型学习从过曝信息中推断原始纹理的能力。",
          problem: "摄影或生成中常见的人像过曝导致面部细节丢失，后期难以挽回。",
          solution: "智能重建高光区域的皮肤纹理，恢复正常的面部光影结构。",
          features: ["高光细节还原", "肤色自然过渡", "立体感增强"]
        },
        {
          title: "提取印花",
          desc: "从复杂背景或实物图中提取纯净印花图案的辅助模型，适用于服装设计与纹理素材制作。",
          tag: "Design",
          command: "<lora:pattern_extract:1.0>",
          image: "/showcase/plugins/plugin-3/items/pattern-before.png",
          comparisonImage: "/showcase/plugins/plugin-3/items/pattern-after.png",
          trainingImage: "/showcase/plugins/plugin-3/items/pattern-train.png",
          trainingThoughts: "训练集专注于‘图案/载体’的分离，强化模型对重复纹理和独立图形的边缘识别能力。",
          problem: "从实物照片中提取印花需要繁琐的抠图与去底工作。",
          solution: "一键分离印花与背景，输出可直接用于设计的纯净图案。",
          features: ["背景自动剔除", "图案完整性保持", "边缘锐利清晰"]
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
      },
      {
        title: "痛点: 训练时间过长，效率低下",
        content: "起因: 默认参数训练步数过多，导致时间成本高且收益边际递减。思路: 引入早停机制（Early Stopping）并优化 Batch Size。结果: 训练时间缩短 40% 且效果持平。收获: 效率优化是工程落地的关键。"
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
