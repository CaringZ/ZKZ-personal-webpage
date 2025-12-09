import type { Project } from '@/lib/types'

export const pluginProjects: Project[] = [
  {
    id: "plugin-1",
    title: "Comfy Controller",
    description: "基于 Web 架构的 ComfyUI 远程控制系统。通过中间件技术将复杂的节点流封装为可视化操作面板，支持资源批量调度与处理，专为非技术团队设计的图形化交互方案。",
    type: "plugin",
    technologies: ["Python", "JavaScript", "ComfyUI API", "WebSocket"],
    year: "2024",
    status: "completed",
    plugin: {
      colorTheme: "purple",
      hasGlobalComparison: false,
      painPoint: {
        desc: "原生 ComfyUI 的节点式交互对创意类（如美术）人员存在极高的认知壁垒，导致优秀的自动化流程难以在团队内推广。我旨在开发一个去技术化的“黑盒”界面，将底层逻辑隐藏，仅暴露业务所需的输入与控制接口。",
        stats: ["操作繁琐", "难以分享"]
      },
      items: [
        {
          title: "图生图",
          desc: "基于现有图像进行裂变，支持批量以及多种参数调节。",
          tag: "Core",
          image: "/showcase/plugins/plugin-1/items/controller-img2img.png",
          problem: "手动在 ComfyUI 中调整图生图参数繁琐且难以批量处理。",
          solution: "构建参数映射层，实现工作流参数的可视化配置；引入队列机制，支持从单图裂变到批量生成的自动化作业。",
          features: ["图像裂变", "参数可视化", "批量生成"]
        },
        {
          title: "标题生成",
          desc: "基于图像内容或文本提示自动生成标题，集成更聪明的高参数LLM模型。",
          tag: "AI",
          image: "/showcase/plugins/plugin-1/items/controller-title-gen.png",
          problem: "为大量生成内容手动编写标题耗时且难整理。",
          solution: "集成 AI 模型自动生成标题，支持自定义模板和关键词。",
          features: ["智能标题生成", "模板定制", "批量处理"]
        },
        {
          title: "文本处理",
          desc: "批量导入和处理文本内容，支持文本筛选、批量修改和格式化。",
          tag: "Batch",
          image: "/showcase/plugins/plugin-1/items/controller-text-proc.png",
          problem: "生成的大量标题需要做内容检查、细节调整，传统文本编辑无法批量进行。",
          solution: "提供基于 Web 的文本批处理管线，集成“导入-清洗-预览-归档”全流程，确保大批量文本数据在进入生成环节前的规范性与安全性。",
          features: ["批量文本导入", "格式化处理", "自动队列"]
        },
        {
          title: "图像批处理",
          desc: "批量加载图像并自动执行工作流，支持结果实时预览和分类管理。",
          tag: "Batch",
          image: "/showcase/plugins/plugin-1/items/controller-batch-img.png",
          problem: "处理大量图像时需要反复手动操作，效率低下，原生查看器缺乏对 Alpha 通道的透明度网格支持，导致在处理透明背景素材时难以辨识细节。",
          solution: "自动化批量图像处理流程，实时预览和结构化管理生成结果。内置专业级图像预览引擎，支持动态切换棋盘格/纯色背景，准确还原透明通道细节。可对图像进行分组保存。",
          features: ["批量图像加载", "实时预览", "分类归档"]
        }
      ]
    },
    insights: [
      {
        title: "挑战: 文本显示不出来",
        content: "起因: 后端生成了文字，但前端有时候读不到。思路: 改成了轮询机制，每隔几秒去问一下后端有没有新内容。结果: 文字能正常显示了。收获: 在高可靠性要求场景下，技术的选择应服务于结果的确定性，而非单纯追求架构的先进性。。"
      },
      {
        title: "挑战: 状态同步的噩梦",
        content: "起因: 为了交互快，把状态放在前端管理。结果后端跑完任务，前端状态没更新，用户以为卡死了。思路: 被迫重写了状态管理，以前端为主改为以 WebSocket 推送的后端状态为准。结果: 交互慢了一点点，但再也不会出现“假执行”了。收获:在异步任务流中，数据的一致性优先级高于交互的即时性，用户的等待需要被真实的状态填补。"
      },
      {
        title: "挑战: 界面细节调整",
        content: "起因: 作为开发者，在 CSS 像素级还原上耗时过长。思路: 与多模态 AI 共同进行视觉和代码上的博弈，辅助微调布局参数。结果: 调出了满意的效果。收获: 善用 AI 的视觉识别能力，可以有效填补开发者在 UI 审美与实现之间的“像素差”。"
      }
    ],
    conclusion: "起初，我只是想做一个能让自己躺在沙发上跑图的‘遥控器’。但随着开发的深入，我意识到‘好用’的门槛比想象中高得多——不仅要能跑通，还要跑得顺手。为了消除点击按钮后的那种‘不确定感’，我不得不去死磕底层的通信逻辑。这个工具的每一个细节打磨，不是为了追求极致的技术指标，而是为了让像我一样的创作者，在按下‘生成’键的那一刻，能感到踏实和掌控。"
  },
  {
    id: "plugin-2",
    title: "ComfyUI-ZKZNodes",
    description: "面向生产环境的 ComfyUI 功能扩展库。弥补了原生节点在逻辑控制（计数/队列）与精细化图像处理（透明裁切/边缘检测）方面的能力缺失。",
    type: "plugin",
    technologies: ["Python", "JavaScript", "ComfyUI Custom Nodes"],
    year: "2025",
    status: "active",
    plugin: {
      colorTheme: "purple",
      hasGlobalComparison: false,
      painPoint: {
        desc: "原生 ComfyUI 在处理“循环逻辑”与“Alpha 通道精细操作”时存在明显的组件空白。用户往往因为缺乏一个基础的“计数器”或“裁剪器”，而不得不中断工作流去寻求外部软件的帮助，导致生产链路割裂。",
        stats: ["功能缺失", "流程中断"]
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
        title: "挑战: 视觉直觉与代码逻辑的鸿沟",
        content: "起因: 作为美术，我很清楚“裁剪透明区域”是什么效果，但不知道如何用代码去操作多维数组来实现它。思路: 我不再试图去学高深的线性代数，而是用自然语言把“像素变化规律”描述给 AI。结果: 实现了想要的功能。收获: 编程的本质不是背诵语法，而是把感性的视觉需求准确翻译成理性的数学逻辑，AI 是这个过程最好的翻译官。"
      },
      {
        title: "挑战: 静默失败的调试",
        content: "起因: 节点代码本身逻辑完备，但加载后“凭空消失”，控制台没有任何错误堆栈信息。思路: 深入排查 ComfyUI 的插件加载机制，发现宿主程序依赖 __init__.py 中的 NODE_CLASS_MAPPINGS 字典来建立索引，而非自动扫描类。结果: 加上注册代码就显示了。收获: 系统集成不仅仅是写好功能类，更要严格遵守宿主程序的“握手协议”，接口定义的规范性决定了代码的可见性。"
      },
      {
        title: "挑战: 连线报错",
        content: "起因: 自定义节点的输入输出缺乏严格定义，导致在复杂连线中经常报错。思路: 建立完善的类型检查机制，确保 INT、FLOAT 等数据类型严格对应。结果: 连线正常了。收获: 建立完善的类型检查机制，确保 INT、FLOAT 等数据类型严格对应。"
      },
      {
        title: "挑战: 计数器不动",
        content: "起因: ComfyUI 为了节省资源，会自动跳过参数未发生变化的节点（惰性计算）。思路: 引入随机种子作为“触发器”，强制节点在每次运行时都重新计算。结果: 计数器能动了。收获: 开发插件的前提，是必须读懂宿主程序的运行逻辑，顺势而为。"
      }
    ],
    conclusion: "作为视觉工作者，我对“混乱”有着天然的排斥。这套节点组的初衷，是为了将琐碎的胶水逻辑封装进黑盒，还给工作流一片清爽。在开发过程中，我被迫与 ComfyUI 严苛的类型系统“搏斗”，但最终我理解了这种严谨的必要性。这不仅是一套工具，更是一个非科班开发者试图用工程化的手段，去驯服无序创意的实践记录。"
  },
  {
    id: "plugin-3",
    title: "Lora",
    description: "基于 Flux Kontext 的图像编辑 LoRA 矩阵。将传统的 PS 修图逻辑（如溶图、去水印、扣印花）转化为 AI 模型能力，专用于设计素材的快速预处理。",
    type: "plugin",
    technologies: ["PyTorch", "Stable Diffusion"],
    year: "2025",
    status: "active",
    plugin: {
      colorTheme: "emerald",
      hasGlobalComparison: false, // Disable global comparison
      painPoint: {
        desc: "在日常设计工作中，处理原始素材耗费了大量精力：把产品合成到背景需要手绘光影、下载的样图有水印、实拍照片过曝或需要提取衣服上的印花。这些机械性的“脏活累活”往往占据了设计师 80% 的时间。",
        stats: ["重复劳动", "效率低下"]
      },
      items: [
        {
          title: "打光溶图",
          desc: "针对电商合成场景，当把产品贴入新背景时，模型能依据环境光源自动计算并生成真实的投影与边缘光，代替原本耗时的手动“加深/减淡”操作。",
          tag: "Lighting",
          command: "<lora:lighting_blend:1>",
          image: "/showcase/plugins/plugin-3/items/lighting-before.png",
          comparisonImage: "/showcase/plugins/plugin-3/items/lighting-after.png",
          trainingImage: "/showcase/plugins/plugin-3/items/lighting-train.png",
          trainingThoughts: "重点在于准备高质量前后对比图集。图像素材收集可借助AI，取成品图使用AI先去除产品，再将产品扣出，略调整产品光影、对比度、颜色等，而后贴回原位置，制作前后对比图。",
          problem: "传统溶图需要大量手动绘制光影，效率低且容易穿帮。",
          solution: "自动化生成符合环境光照的融合效果，大幅提升合成效率。",
          features: ["环境光匹配", "边缘光影融合", "多光源支持"],
          trainingParams: {
            resolution: "1024x1024",
            rank: "64",
            dataset: "30对",
            learningRate: "1e-4",
            steps: "1200",
            baseModel: "flux1-dev-kontext_fp8_scaled.safetensors",
            triggerWord: "Fix the lighting and blend the product into the background naturally"
          }
        },
        {
          title: "去水印",
          desc: "不同于传统的污点修复工具，该模型能理解被水印覆盖的物体结构。在移除水印的同时，基于上下文逻辑“脑补”出原本被遮挡的复杂纹理（如毛发、布料），实现无痕还原。",
          tag: "Utility",
          command: "<lora:watermark_remover:1>",
          image: "/showcase/plugins/plugin-3/items/watermark-before.png",
          comparisonImage: "/showcase/plugins/plugin-3/items/watermark-after.png",
          trainingImage: "/showcase/plugins/plugin-3/items/watermark-train.png",
          trainingThoughts: "构建包含“水印/无水印”配对的数据集，强迫模型学习水印覆盖下的图像特征恢复。准备训练素材时“水印”可人为后期添加。",
          problem: "常规去水印工具难以处理大面积或半透明的复杂水印。",
          solution: "利用深度学习理解图像上下文，实现无痕去除与纹理重构。",
          features: ["复杂水印识别", "纹理智能修补", "保持画质无损"],
          trainingParams: {
            resolution: "1024+",
            rank: "64",
            dataset: "50对",
            learningRate: "1e-4",
            steps: "1600",
            baseModel: "flux1-dev-kontext_fp8_scaled.safetensors",
            triggerWord: "Remove image watermark"
          }
        },
        {
          title: "人像过曝拉回",
          desc: "针对实拍人像摄影中的“死白”区域。模型并非简单的压暗亮度，而是重新生成丢失的皮肤毛孔与色调信息，修复因布光失误导致的废片。",
          tag: "Portrait",
          command: "<lora:exposure_fix:0.8>",
          image: "/showcase/plugins/plugin-3/items/exposure-before.png",
          comparisonImage: "/showcase/plugins/plugin-3/items/exposure-after.png",
          trainingImage: "/showcase/plugins/plugin-3/items/exposure-train.png",
          trainingThoughts: "使用高动态范围（HDR）图像作为训练底板，让模型学习从过曝信息中推断原始纹理的能力。收集素材方法可与去水印lora类似。",
          problem: "摄影或生成中常见的人像过曝导致面部细节丢失，后期难以挽回。",
          solution: "智能重建高光区域的皮肤纹理，恢复正常的面部光影结构。",
          features: ["高光细节还原", "肤色自然过渡", "立体感增强"],
          trainingParams: {
            resolution: "1024+",
            rank: "64",
            dataset: "40对",
            learningRate: "1e-4",
            steps: "2000",
            baseModel: "flux1-dev-kontext_fp8_scaled.safetensors",
            triggerWord: "Correct the overexposure and restore skin details"
          }
        },
        {
          title: "提取印花",
          desc: "将拍摄的实物（如褶皱的T恤、贴图的马克杯）还原为平整的数字纹理素材。模型能自动去除光影干扰与透视形变，直接提取出可复用的印花图案。",
          tag: "Design",
          command: "<lora:pattern_extract:1>",
          image: "/showcase/plugins/plugin-3/items/pattern-before.png",
          comparisonImage: "/showcase/plugins/plugin-3/items/pattern-after.png",
          trainingImage: "/showcase/plugins/plugin-3/items/pattern-train.png",
          trainingThoughts: "训练集专注于‘图案/载体’的分离，强化模型对重复纹理和独立图形的边缘识别能力。对非电商行业爱好者而言，收集素材较为困难苛刻。这是同样可以逆向操作，使用印花图去制作效果图。",
          problem: "从实物照片中提取印花需要繁琐的抠图与去底工作。",
          solution: "一键分离印花与背景，输出可直接用于设计的纯净图案。",
          features: ["背景自动剔除", "图案完整性保持", "边缘锐利清晰"],
          trainingParams: {
            resolution: "1024+",
            rank: "128",
            dataset: "60对",
            learningRate: "1e-4",
            steps: "2500",
            baseModel: "flux1-dev-kontext_fp8_scaled.safetensors",
            triggerWord: "Extract product printing pattern"
          }
        }
      ]
    },
    insights: [
      {
        title: "挑战: 数据集的“成对”质量",
        content: "起因: 早期为了追求泛化，使用了大量素材，未严格处理素材的对齐，导致模型在修图时出现严重的重影。思路: 彻底清洗数据集，构建像素级对齐的 Before/After 成对数据（Paired Dataset），并剔除任何模糊样本。收获: 在图像编辑任务中，数据的“精准度”远比“规模”重要，20 对高质量数据足以训练出生产级模型。"
      },
      {
        title: "挑战: 学习率与细节保留",
        content: "起因: 高学习率下，虽然速度是快了，但模型容易“用力过猛”，在去除水印的同时也抹平了衣服的纹理细节。思路: 采用低学习率配合高 Rank 的策略，让模型“缓慢”地学习变化特征。收获: 图像编辑的本质是“微创手术”，参数调整必须在“改变”与“保留”之间找到极窄的平衡点。"
      },
      {
        title: "挑战: 结构保持",
        content: "起因: 以前为了防止画风污染，必须准备很多张正则图。但在训练 Flux 时发现，即便不加正则，模型也能完美隔离概念。思路: 放弃复杂的正则集，专注于精准的触发词设计。收获: 强大的底模让“概念隔离”变得自动化，我们终于可以专注于模型功能本身，而不是由于技术缺陷带来的补丁。"
      },
      {
        title: "挑战: 训练步数的边际效应",
        content: "起因: 习惯性地跑几千步，结果模型过拟合，对非训练集的泛化能力极差。思路: 采用“人肉盲测”法，每隔一定步数保存一个版本，最后通过实际修图效果进行横向比对（XYZ Plot）。结果: 最佳模型往往不是跑完进度条的那个，而是中间某个“刚刚好”的版本。收获: 在图像编辑领域，数据曲线可能会骗人，但设计师的眼睛不会。"
      }
    ],
    conclusion: "这套模型库的初衷，是想把设计师从枯燥的“素材处理”中解放出来。以前需要精修一小时的溶图光影，现在只需数秒。训练这些 LoRA 的过程，其实是在教 AI 学习 PS 高手的“手感”——如何处理高光、如何平整纹理。这不是关于创造力的宏大叙事，这是关于效率的极致务实：让机器去处理像素，让人回归设计。"
  },
  {
    id: "plugin-4",
    title: "Mockup Batch Renderer",
    description: "Blender 批量渲染插件。解决多视角、多背景组合渲染时的重复操作问题，支持自动队列和内存清理。",
    type: "plugin",
    technologies: ["Python", "Blender API", "Batch Processing"],
    year: "2024",
    status: "completed",
    plugin: {
      colorTheme: "orange",
      hasGlobalComparison: false,
      painPoint: {
        desc: "商业渲染往往面临 N 个产品 × M 个视角 × K 种环境的“笛卡尔积”式需求。手动管理成百上千个渲染图层不仅效率低下，且极易因人为疲劳导致材质错配或命名混乱。",
        stats: ["重复操作繁琐", "内存溢出频发"]
      },
      items: [

        {
          title: "智能批量队列 (Core)",
          desc: "核心调度引擎，能够自动遍历指定文件夹下的所有设计图，并将其与预设的多个相机视角和背景进行全排列组合渲染。",
          tag: "Core Logic",
          command: "bpy.ops.mockup.render_batch()",
          // No image, use code snippet
          codeSnippet: `def process_render_queue(self, context):
    # 智能批次计算
    total_batches = (len(self._design_files) + props.batch_size - 1) // props.batch_size
    
    # 动态加载设计图与背景
    design_file = current_batch[self._current_design_index]
    design_path = os.path.join(props.design_folder, design_file)
    
    # 自动匹配材质节点
    if design_material:
        self.update_texture(design_material, design_path, props.design_node_name)`,
          problem: "手动切换材质和背景，渲染100张图需要点击数千次。",
          solution: "一键启动，自动完成所有组合的渲染任务。",
          features: ["全排列组合", "自动材质替换", "多视角支持"]
        },
        {
          title: "视图一键克隆",
          desc: "基于现有集合快速创建新的渲染视图，自动处理对象复制、材质独立化和重命名，极大简化了多角度场景的搭建过程。",
          tag: "Workflow",
          command: "bpy.ops.mockup.copy_view()",
          codeSnippet: `def execute(self, context):
    # 深度复制集合与对象
    new_coll = bpy.data.collections.new(name=new_coll_name)
    
    # 智能重命名与材质解耦
    for old_obj in source_coll.objects:
        new_obj = old_obj.copy()
        if new_obj.data:
            new_obj.data = new_obj.data.copy() # Data Deep Copy
        
        # 材质独立化处理
        if old_mat.users <= len(source_coll.objects):
            new_mat = old_mat.copy() # Material Deep Copy`,
          problem: "创建相似的新视角需要手动复制集合并逐个调整材质，容易造成关联混乱。",
          solution: "深度复制算法，自动解耦材质和对象关联，保持场景整洁。",
          features: ["深度复制", "自动重命名", "材质解耦"]
        },
        {
          title: "智能内存管理",
          desc: "内置内存监控系统，在批量渲染过程中实时监测资源占用。支持激进的垃圾回收（GC）策略和定时重启机制，防止长时间渲染导致的内存泄漏崩溃。",
          tag: "Stability",
          command: "cleanup_resources(aggressive=True)",
          codeSnippet: `def cleanup_resources(self, context, aggressive=False):
    # 基础清理
    bpy.ops.outliner.orphans_purge(do_recursive=True)
    gc.collect()
    
    # 激进模式：主动移除未引用图像
    if aggressive:
        for img in bpy.data.images:
            if img.users == 0:
                bpy.data.images.remove(img)`,
          problem: "Blender 在连续渲染数百张图后往往会因为内存泄漏而闪退。",
          solution: "主动式内存清理与资源释放策略，确保连续渲染稳定性。",
          features: ["内存监控", "主动GC", "孤立数据清理"]
        },
        {
          title: "断点续传系统",
          desc: "实时记录渲染进度到本地检查点文件。如果渲染意外中断或手动暂停，下次启动时可精确恢复到中断的那一张图继续渲染，无需从头开始。",
          tag: "Utility",
          command: "save_checkpoint()",
          codeSnippet: `def save_checkpoint(self, context):
    checkpoint_data = {
        'batch_index': self._current_batch_index,
        'design_index': self._current_design_index,
        'view_index': self._current_view_index,
        'timestamp': time.time()
    }
    with open(self._checkpoint_file, 'w') as f:
        json.dump(checkpoint_data, f)`,
          problem: "渲染了99张图突然断电，前功尽弃。",
          solution: "毫秒级进度记录，随时中断，随时继续。",
          features: ["进度持久化", "自动恢复", "异常保护"]
        }
      ]
    },
    insights: [
      {
        title: "挑战: 配置繁琐与命名约束",
        content: "起因: 渲染层级多时配置极易混乱，且对材质命名有严格匹配要求。思路: 开发了“视图一键克隆”功能来复用配置，减轻重复劳动。结果: 解决了配置效率问题，但严格的命名规范依然是当前的体验瓶颈，后续需引入模糊匹配。收获: 自动化工具的尽头是规范化，没有规范就没有自动化。"
      },
      {
        title: "挑战: 渲染久了内存爆满",
        content: "Blender 在脚本模式下并不会自动释放上一张图占用的纹理内存，导致渲染速度随时间线性下降甚至崩溃。思路: 在每一帧渲染结束后，显式调用底层 API 强制清除未引用数据块。收获: 对于长期运行的脚本，内存泄漏的治理是比功能实现更严峻的挑战。"
      }
    ],
    conclusion: "面对几百个 SKU 的渲染需求，手动操作不仅是体力的透支，更是对创造力的浪费。我开发这个插件的初衷很简单：我想把时间花在“设计”上，而不是“点击”上。"
  },
]
