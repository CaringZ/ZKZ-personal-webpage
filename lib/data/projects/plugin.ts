import type { Project } from '@/lib/types'

export const pluginProjects: Project[] = [
  {
    id: "plugin-1",
    title: "Comfy Controller",
    description: "一个 Web 版的 ComfyUI 控制器。把复杂的节点工作流封装成简单的网页界面，支持批量上传图片和文档，让不懂节点的人也能用。",
    type: "plugin",
    technologies: ["Python", "JavaScript", "ComfyUI API", "WebSocket"],
    year: "2024",
    status: "completed",
    github: "#",
    plugin: {
      colorTheme: "purple",
      hasGlobalComparison: false,
      gallery: [
        "/showcase/plugins/plugin-1/gallery-01.png",
        "/showcase/plugins/plugin-1/gallery-02.png",
        "/showcase/plugins/plugin-1/gallery-03.png",
        "/showcase/plugins/plugin-1/gallery-04.png"
      ],
      painPoint: {
        title: "工作流复用性差",
        desc: "我自己搭的工作流很好用，但全是节点连线，发给同事他们根本不会用。我想把它做成一个简单的网页，别人只需要上传图片、点个按钮就行了。",
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
          desc: "基于现有图像进行裂变，支持批量以及多种参数调节。",
          tag: "Core",
          image: "/showcase/plugins/plugin-1/items/controller-img2img.png",
          problem: "手动在 ComfyUI 中调整图生图参数繁琐且难以批量处理。",
          solution: "Web 界面封装图生图工作流，提供直观的参数控制和批量处理能力。",
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
          solution: "支持批量txt文本导入，批量直观可视化进行，确认内容后安全批量保存。",
          features: ["批量文本导入", "格式化处理", "自动队列"]
        },
        {
          title: "图像批处理",
          desc: "批量加载图像并自动执行工作流，支持结果实时预览和分类管理。",
          tag: "Batch",
          image: "/showcase/plugins/plugin-1/items/controller-batch-img.png",
          problem: "处理大量图像时需要反复手动操作，效率低下，默认的图像查看器对透明背景的纯黑/纯白图像查看效果很差。",
          solution: "自动化批量图像处理流程，实时预览和结构化管理生成结果。对于透明背景图像可替换不同的容器背景方便查看细节效果。可对图像进行分组保存。",
          features: ["批量图像加载", "实时预览", "分类归档"]
        }
      ]
    },
    insights: [
      {
        title: "挑战: 文本显示不出来",
        content: "起因: 后端生成了文字，但前端有时候读不到。思路: 改成了轮询机制，每隔几秒去问一下后端有没有新内容。结果: 文字能正常显示了。"
      },
      {
        title: "痛点: 状态同步的噩梦",
        content: "起因: 为了交互快，把状态放在前端管理。结果后端跑完任务，前端状态没更新，用户以为卡死了。思路: 被迫重写了状态管理，以前端为主改为以 WebSocket 推送的后端状态为准。结果: 交互慢了一点点，但再也不会出现“假执行”了。"
      },
      {
        title: "挑战: 界面细节调整",
        content: "起因: 想要界面好看点，但 CSS 很难调。思路: 不断截图给 AI 看，让它帮我微调参数。结果: 调出了满意的效果。"
      }
    ]
  },
  {
    id: "plugin-2",
    title: "ComfyUI-ZKZNodes",
    description: "一套 ComfyUI 自定义节点集合。包含了计数器、队列管理、图像裁剪等实用工具，都是为了解决我在实际使用中遇到的小问题。",
    type: "plugin",
    technologies: ["Python", "JavaScript", "ComfyUI Custom Nodes"],
    year: "2025",
    status: "active",
    github: "#",
    plugin: {
      colorTheme: "purple",
      hasGlobalComparison: false,
      painPoint: {
        title: "功能缺失与流程断点",
        desc: "用 ComfyUI 的时候经常觉得“要是能有个节点能自动计数就好了”或者“要是能自动裁剪透明区域就好了”。既然官方没有，我就自己用 AI 写一个。",
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
        title: "挑战: 节点不显示",
        content: "起因: 代码写好了，但 ComfyUI 里找不到节点。思路: 发现是忘了在配置文件里注册节点。结果: 加上注册代码就显示了。"
      },
      {
        title: "挑战: 连线报错",
        content: "起因: 节点的输入输出类型不匹配，连不上。思路: 严格按照 ComfyUI 的类型规范来定义。结果: 连线正常了。"
      },
      {
        title: "挑战: 计数器不动",
        content: "起因: ComfyUI 觉得参数没变就不重新运行。思路: 加了一个随机数种子作为参数，强制它每次都运行。结果: 计数器能动了。"
      },
      {
        title: "挑战: 想改界面交互",
        content: "起因: 想在节点上加个按钮，但不懂前端。思路: 让 AI 帮我写 JS 扩展。结果: 实现了想要的按钮功能。"
      }
    ]
  },
  {
    id: "plugin-3",
    title: "Lora",
    description: "一组用于优化图像生成的 LoRA 模型。",
    type: "plugin",
    technologies: ["PyTorch", "Stable Diffusion"],
    year: "2024",
    status: "active",
    github: "#",
    plugin: {
      colorTheme: "emerald",
      hasGlobalComparison: false, // Disable global comparison
      painPoint: {
        title: "后期修补繁琐",
        desc: "美术的素材图经常有小瑕疵，比如光影不对、有水印或者脸部过曝。每次都要去 PS 里修半天，效率太低。我通过训练这些 LoRA 为他们解决问题。",
        stats: ["重复劳动", "效率低下"]
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
          desc: "通过 LoRA 模型精确融合画面光影，实现自然且富有层次的溶图效果，解决合成图像光感不统一的问题。",
          tag: "Lighting",
          command: "<lora:lighting_blend:1>",
          image: "/showcase/plugins/plugin-3/items/lighting-before.png",
          comparisonImage: "/showcase/plugins/plugin-3/items/lighting-after.png",
          trainingImage: "/showcase/plugins/plugin-3/items/lighting-train.png",
          trainingThoughts: "重点在于准备高质量前后对比图集。图像素材收集可借助AI，取成品图使用AI先去除产品，再将产品扣出，略调整产品光影、对比度、颜色等，而后贴回原位置，制作前后对比图。",
          problem: "传统溶图需要大量手动绘制光影，效率低且容易穿帮。",
          solution: "自动化生成符合环境光照的融合效果，大幅提升合成效率。",
          features: ["环境光匹配", "边缘光影融合", "多光源支持"]
        },
        {
          title: "去水印",
          desc: "针对性训练的去水印模型，能够智能识别并移除画面中的复杂水印，同时自动修补被遮挡的纹理细节。",
          tag: "Utility",
          command: "<lora:watermark_remover:1>",
          image: "/showcase/plugins/plugin-3/items/watermark-before.png",
          comparisonImage: "/showcase/plugins/plugin-3/items/watermark-after.png",
          trainingImage: "/showcase/plugins/plugin-3/items/watermark-train.png",
          trainingThoughts: "构建包含“水印/无水印”配对的数据集，强迫模型学习水印覆盖下的图像特征恢复。准备训练素材时“水印”可人为后期添加。",
          problem: "常规去水印工具难以处理大面积或半透明的复杂水印。",
          solution: "利用深度学习理解图像上下文，实现无痕去除与纹理重构。",
          features: ["复杂水印识别", "纹理智能修补", "保持画质无损"]
        },
        {
          title: "人像过曝拉回",
          desc: "专门用于修复过曝人像的 LoRA，能够找回高光溢出区域的皮肤纹理与色彩细节，重塑面部立体感。",
          tag: "Portrait",
          command: "<lora:exposure_fix:0.8>",
          image: "/showcase/plugins/plugin-3/items/exposure-before.png",
          comparisonImage: "/showcase/plugins/plugin-3/items/exposure-after.png",
          trainingImage: "/showcase/plugins/plugin-3/items/exposure-train.png",
          trainingThoughts: "使用高动态范围（HDR）图像作为训练底板，让模型学习从过曝信息中推断原始纹理的能力。收集素材方法可与去水印lora类似。",
          problem: "摄影或生成中常见的人像过曝导致面部细节丢失，后期难以挽回。",
          solution: "智能重建高光区域的皮肤纹理，恢复正常的面部光影结构。",
          features: ["高光细节还原", "肤色自然过渡", "立体感增强"]
        },
        {
          title: "提取印花",
          desc: "从复杂背景或实物图中提取纯净印花图案的辅助模型，适用于服装设计与纹理素材制作。",
          tag: "Design",
          command: "<lora:pattern_extract:1>",
          image: "/showcase/plugins/plugin-3/items/pattern-before.png",
          comparisonImage: "/showcase/plugins/plugin-3/items/pattern-after.png",
          trainingImage: "/showcase/plugins/plugin-3/items/pattern-train.png",
          trainingThoughts: "训练集专注于‘图案/载体’的分离，强化模型对重复纹理和独立图形的边缘识别能力。对非电商行业爱好者而言，收集素材较为困难苛刻。这是同样可以逆向操作，使用印花图去制作效果图。",
          problem: "从实物照片中提取印花需要繁琐的抠图与去底工作。",
          solution: "一键分离印花与背景，输出可直接用于设计的纯净图案。",
          features: ["背景自动剔除", "图案完整性保持", "边缘锐利清晰"]
        }
      ]
    },
    insights: [
      {
        title: "痛点: 训练素材不是越多越好",
        content: "起因: 一开始塞了100多张图，结果练出来的模型效果很差。思路: 精选了20张质量最高的图。结果: 效果反而更好了。收获: 素材质量比数量更重要。"
      },
      {
        title: "痛点: 学习率很难调",
        content: "起因: 学习率设高了全是噪点，设低了学不会。思路: 试了很多次，找到了一个合适的区间。结果: 模型收敛了。"
      },
      {
        title: "痛点: 容易污染底模",
        content: "起因: 练好的模型会影响其他不该影响的东西。思路: 给训练素材都打上特定的标签。结果: 只有输入标签时才会触发效果。"
      },
      {
        title: "痛点: 训练太慢",
        content: "起因: 默认设置跑太久了。思路: 发现其实跑一半步数效果就差不多了。结果: 节省了一半时间。"
      }
    ]
  },
  {
    id: "plugin-4",
    title: "Mockup Batch Renderer",
    description: "Blender 批量渲染插件。解决多视角、多背景组合渲染时的重复操作问题，支持自动队列和内存清理。",
    type: "plugin",
    technologies: ["Python", "Blender API", "Batch Processing"],
    year: "2024",
    status: "completed",
    github: "#",
    plugin: {
      colorTheme: "orange",
      hasGlobalComparison: false,
      painPoint: {
        title: "手动渲染效率低下",
        desc: "做一个产品展示，要出几十张图，换背景、换角度、换材质，每次都要手动点，容易出错还特别累。我就写了这个插件，自动帮我把这些组合都渲染出来。",
        stats: ["重复操作繁琐", "内存溢出频发"]
      },
      pipeline: {
        input: "设计图文件夹 + 背景库 + Blender源文件",
        process: "智能队列调度 -> 自动材质替换 -> 内存监控与GC -> 断点续传",
        output: "结构化命名的成品图库"
      },
      installation: {
        cmd: "Install via Blender Preferences > Add-ons"
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
        title: "痛点: 配置繁琐与命名约束",
        content: "起因: 渲染层级多时配置极易混乱，且对材质命名有严格匹配要求。思路: 开发了“视图一键克隆”功能来复用配置，减轻重复劳动。结果: 解决了配置效率问题，但严格的命名规范依然是当前的体验瓶颈，后续需引入模糊匹配。"
      },
      {
        title: "痛点: 渲染久了内存爆满",
        content: "起因: 连续渲染几百张图，内存不释放，最后 Blender 崩了。思路: 加上了强制清理内存的代码。结果: 内存占用稳定了，不会崩了。"
      }
    ]
  },
]
