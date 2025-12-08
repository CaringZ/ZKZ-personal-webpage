import type { Project } from '@/lib/types'

export const hobbyProjects: Project[] = [
  {
    id: "hobby-1",
    title: "3D Paint Studio",
    description: "辅助 3D 艺术家进行材质验证的网页工具。它能在不改变模型几何与机位的前提下，快速为白膜上色，并尝试逆向分析出 Blender 节点方案。",
    type: "hobby",
    technologies: ["Gemini API", "Three.js", "TypeScript", "Blender"],
    year: "2025",
    status: "active",
    github: "#",
    hobby: {
      colorTheme: "orange",
      tagline: "从 2D 灵感到 3D 材质节点的辅助工具",
      motivation: "在 Blender 和 Substance Painter 之间反复倒腾太麻烦了。拆 UV、烘焙、堆材质，最后发现配色不好看又要重来。我想要一个简单的工具，能先在白膜上快速试错，确定了方向再进 Blender 细化，而不是一开始就陷进技术细节里。",
      features: [
        {
          title: "上下文感知材质",
          desc: "能识别模型是机甲还是怪物，自动生成合理的材质质感，比如金属磨损或皮肤纹理。",
          icon: "Cpu"
        },
        {
          title: "色彩分区控制",
          desc: "强制按照 60/30/10 的比例分配主辅色，避免生成的配色太乱或太单调。",
          icon: "Layout"
        },
        {
          title: "材质参数分析",
          desc: "分析生成图的材质特征，给出对应的 Blender 节点连接建议，比如粗糙度该调多少，噪波怎么连。",
          icon: "Activity"
        },
        {
          title: "工作流交互",
          desc: "界面设计模仿了专业软件，操作过程有明确的状态反馈，让等待过程不那么焦虑。",
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
        title: "挑战: AI 总想改模型",
        content: "起因: AI 上色时经常会给角色加头发或者改结构。思路: 换了更听话的模型版本，并在提示词里强调“不要改几何”。结果: 模型结构保住了，只改颜色。收获: 选对模型和写对约束同样重要。"
      },
      {
        title: "挑战: 材质看起来像塑料",
        content: "起因: 生成的材质缺乏质感，全是塑料味。思路: 引入了“材质组分”的概念，分别描述金属、布料等不同材质的物理属性。结果: 材质区分度变高了。收获: 描述得越具体，AI 生成得越准确。"
      },
      {
        title: "挑战: 等待时间太长",
        content: "起因: 分析过程需要几秒钟，界面没反应让人以为卡了。思路: 加了详细的加载状态提示。结果: 虽然速度没变，但用户知道在运行就不焦虑了。收获: 及时的状态反馈能提升体验。"
      }
    ]
  },
  {
    id: "hobby-2",
    title: "Smart Material Gen",
    description: "为 Blender 引入图层化工作流的材质插件。通过封装复杂的节点逻辑，实现像处理 2D 图像一样叠加磨损、污渍等写实效果。",
    type: "hobby",
    technologies: ["Python", "Blender API", "Shader Nodes"],
    year: "2025",
    status: "active",
    github: "#",
    hobby: {
      colorTheme: "orange",
      tagline: "像修图一样简单的材质制作工具",
      motivation: "Blender 的节点系统太复杂了，对于只是想给模型加点旧化效果的人来说，门槛有点高。我想把这些复杂的节点逻辑封装起来，让用户像在修图软件里叠图层一样，简单直观地做出写实材质。",
      features: [
        {
          title: "图层化效果",
          desc: "把生锈、磨损、灰尘等效果做成独立的图层，用户可以单独开关和调整，不用管底下的节点怎么连。",
          icon: "Layers"
        },
        {
          title: "自动节点连接",
          desc: "插件会自动识别当前的材质结构，把新的效果节点正确地连进去，不用手动去连线。",
          icon: "Cpu"
        },
        {
          title: "按需加载",
          desc: "核心的材质库是独立的，只有用到某种效果时才会加载，这样插件体积小，运行也快。",
          icon: "Box"
        },
        {
          title: "防卡顿设计",
          desc: "调整参数时不会实时刷新，而是等手停下来再更新，避免因为计算量大导致 Blender 卡死。",
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
        title: "痛点: 节点连线太乱了",
        content: "起因: 效果一多，节点连线就乱成一团麻。思路: 把每种效果封装成一个独立的组，外面只留几个接口。结果: 结构清晰多了，维护也方便。收获: 封装是解决混乱的好办法。"
      },
      {
        title: "痛点: 用户误操作导致报错",
        content: "起因: 用户删了某个关键节点，插件就崩了。思路: 每次运行前先检查节点还在不在，不在就自动补上。结果: 插件变得很皮实，不容易坏。收获: 要预判用户的各种奇怪操作。"
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
      tagline: "AI 辅助构建的文件自动化工具",
      motivation: "我一直想做一个既好看又好用的文件管理工具。我不懂复杂的算法，但我知道我需要什么样的逻辑：文件和文件夹的处理方式应该是不同的，规则应该是可视化的。这个项目是我用自然语言指挥 AI，把我的逻辑变成代码的一次尝试。",
      features: [
        {
          title: "可视化规则",
          desc: "不用写代码，像搭积木一样设置规则。比如“把所有大于 500MB 的视频移到视频文件夹”。",
          icon: "Layout"
        },
        {
          title: "双轨逻辑",
          desc: "针对单文件和文件夹设计了两套不同的处理逻辑，避免混淆，操作更精准。",
          icon: "Cpu"
        },
        {
          title: "撤销/重做",
          desc: "所有的操作都记录下来了，改错了名字或者移错了位置，点一下撤销就能恢复。",
          icon: "History"
        },
        {
          title: "实时预览",
          desc: "在执行之前，能直观地看到哪些文件会被修改，改成了什么样，确认无误再执行。",
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
        content: "起因: 处理单个文件和处理整个文件夹的逻辑不一样，混在一起容易出 bug。思路: 在界面和代码上都把它们严格分开。结果: 逻辑清晰了，不容易出错。收获: 复杂的逻辑要拆分开来处理。"
      },
      {
        title: "挑战: 批量改名容易覆盖",
        content: "起因: 批量改名时，如果名字重复了，后面的文件会覆盖前面的。思路: 加了一个预检查机制，改名前先检查会不会重名。结果: 避免了文件丢失。收获: 涉及文件操作要格外小心，多做检查。"
      },
      {
        title: "心得: AI 是手，逻辑是脑",
        content: "起因: AI 写代码很快，但复杂的业务逻辑它容易晕。思路: 我负责设计逻辑流程，AI 负责写具体的代码。结果: 顺利完成了复杂功能。收获: 写代码可以靠 AI，但逻辑设计还得靠人。"
      }
    ]
  },
  {
    id: "hobby-4",
    title: "AirShot",
    description: "专注于“视觉参考”的桌面截图工具。核心特性是“屏幕钉图”与“延时捕捉”，旨在解决设计与开发过程中频繁切换窗口查看参考图的痛点。",
    type: "hobby",
    technologies: ["Python", "PyQt5"],
    year: "2024",
    status: "active",
    github: "#",
    hobby: {
      colorTheme: "purple",
      tagline: "简单好用的截图笔记工具",
      motivation: "现有的截图工具要么太简单（像微信截图），要么太复杂（像 ShareX）。我想要一个中间状态的工具：平时用起来很简单，但当我有需要的时候，它也能提供钉图、延时截图这些进阶功能。",
      features: [
        {
          title: "屏幕钉图",
          desc: "截完图可以钉在屏幕上，写代码或者看文档的时候用来做参考很方便。",
          icon: "Layout"
        },
        {
          title: "标注工具",
          desc: "提供了常用的标注功能，线条粗细、颜色都可以调，还能打马赛克。",
          icon: "Edit"
        },
        {
          title: "延时截图",
          desc: "可以设置几秒钟后截图，专门用来截那些一动鼠标就消失的菜单。",
          icon: "Clock"
        },
        {
          title: "流畅体验",
          desc: "优化了绘图性能，就算标注画了很多，界面也不会卡顿。",
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
        title: "挑战: 界面要简洁",
        content: "问题: 功能多了界面容易乱。解决: 只有选中工具的时候才显示相关选项。这种“按需显示”的设计让界面看起来很清爽。"
      },
      {
        title: "挑战: 窗口置顶问题",
        content: "问题: 钉在屏幕上的图有时候会被遮挡。解决: 专门调整了窗口层级，确保它始终在最上面。"
      },
      {
        title: "心得: 克制",
        content: "不是所有功能都要放上去。如果不常用，就藏起来或者干脆不做。保持简单很重要。"
      },
      {
        title: "心得: 体验优先",
        content: "用户不关心技术实现，只关心好不好用。启动快、不卡顿、操作顺手，这些才是最重要的。"
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
      tagline: "本地运行的批量抠图工具",
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
          title: "现代化界面",
          desc: "界面设计简洁现代，支持深色模式，用起来很舒服。",
          icon: "Layout"
        },
        {
          title: "灵活输出",
          desc: "可以输出透明背景的 PNG，也可以输出黑白的遮罩图，方便后续使用。",
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
        content: "起因: 批量处理大量图片时，内存一直在涨。思路: 在 AI 指导下加了手动释放内存的代码。结果: 内存占用稳定了。"
      },
      {
        title: "心得: 代码只是翻译",
        content: "只要我清楚逻辑——比如图片怎么处理、出错了怎么办——AI 就能帮我把这些逻辑翻译成代码。"
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
    description: "基于“索引对齐”逻辑的表格差异分析工具。不同于传统的行号对比，它通过唯一关键列（如SKU）匹配数据，精准定位内容变更。",
    type: "hobby",
    technologies: ["Python", "PyQt5", "Pandas", "OpenPyXL"],
    year: "2024",
    status: "completed",
    github: "#",
    hobby: {
      colorTheme: "emerald",
      tagline: "告别 VLOOKUP 的表格对比工具",
      motivation: "处理表格数据时，经常遇到版本迭代导致行号对不上的问题，用 Excel 公式对比很麻烦。我需要一个工具，能忽略行号的变化，直接通过关键列（比如 SKU）来对比数据，并且自动忽略掉一些无关紧要的格式差异。",
      features: [
        {
          title: "索引对齐",
          desc: "不管数据行怎么乱，只要关键列（比如 ID）对得上，就能正确对比。",
          icon: "GitMerge"
        },
        {
          title: "智能清洗",
          desc: "自动处理格式差异，比如 '100' 和 '100.00' 会被视为相同，避免误报。",
          icon: "Sparkles"
        },
        {
          title: "列映射",
          desc: "支持手动指定哪些列需要对比，即使列名不一样也能关联起来。",
          icon: "List"
        },
        {
          title: "快速启动",
          desc: "启动速度很快，只有在开始对比时才加载必要的库，不浪费时间。",
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
        content: "问题: 引入 Pandas 后软件启动变慢了。解决: 改成点击开始对比时才加载 Pandas，启动瞬间完成。"
      },
      {
        title: "挑战: 数据格式不统一",
        content: "问题: Excel 里的数字格式千奇百怪。解决: 做了一套数据清洗逻辑，先把格式统一了再对比，减少误报。"
      },
      {
        title: "心得: 信任感",
        content: "数据对比工具最重要的是准确，不能漏报也不能误报。在数据清洗上花的时间比写界面多多了。"
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
        title: "第一次搞“开机自启”",
        content: "以前觉得开机自启很复杂，问了 AI 才知道要改注册表。虽然不懂原理，但 AI 解释得很清楚，照着做就成功了。"
      },
      {
        title: "聊着天就把软件做完了",
        content: "这个软件真是“聊”出来的。我提需求，AI 写代码。只要逻辑通顺，AI 就是最好的帮手。"
      }
    ],
  },

]
