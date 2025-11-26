import { projects } from './projects';

export interface ChatResponse {
    text: string;
    action?: string; // Optional action to trigger (e.g., navigation)
}

// Helper to find project by keyword
const findProject = (keyword: string) => {
    return projects.find(p =>
        p.title.toLowerCase().includes(keyword.toLowerCase()) ||
        p.description.toLowerCase().includes(keyword.toLowerCase())
    );
};

export function getChatResponse(input: string): ChatResponse {
    const lowerInput = input.toLowerCase();

    // 1. Greetings & Self-Intro
    if (lowerInput.includes('你好') || lowerInput.includes('hello') || lowerInput.includes('hi')) {
        return { text: "你好！我是你的智能助手。你可以问我关于作品集、开发经历或者具体项目的问题。" };
    }
    if (lowerInput.includes('是谁') || lowerInput.includes('介绍') || lowerInput.includes('yourself')) {
        return { text: "我是基于 Three.js 开发的 3D 智能助手。我不仅能陪你聊天，还能带你浏览这个作品集中的所有精彩项目！" };
    }

    // 2. Personal Journey & Stories (New)
    if (lowerInput.includes('美术') || lowerInput.includes('转型') || lowerInput.includes('老师')) {
        return { text: "这是一个关于跨界的故事。我曾经是一名美术老师，后来转型成为 AI 工程师。我利用美术背景和 AI 工具，打破了代码的壁垒，实现了从“画画”到“造工具”的转变。" };
    }
    if (lowerInput.includes('效率') || lowerInput.includes('30人') || lowerInput.includes('管线')) {
        return { text: "这是我在商业案例中实现的成果。通过搭建自动化管线，将单人产能提升了 30 倍。点击下方按钮，带你去详细了解这个案例。", action: '/business-cases/' };
    }
    if (lowerInput.includes('ai') && (lowerInput.includes('写代码') || lowerInput.includes('辅助') || lowerInput.includes('编程'))) {
        return { text: "我并不死记硬背语法。我把 AI 当作结对编程伙伴，我负责逻辑设计和架构，AI 负责具体实现。ZKZNodes 和 ArroEngine 都是这样诞生的。" };
    }
    if (lowerInput.includes('冒名顶替') || lowerInput.includes('焦虑') || lowerInput.includes('虚')) {
        return { text: "我也曾有过“冒名顶替综合症”，觉得自己不懂底层。但后来我明白，解决问题比定义问题更重要。能用 AI 做出好用的工具，就是我的核心竞争力。" };
    }
    if (lowerInput.includes('blender') || lowerInput.includes('3d')) {
        return { text: "我尝试打通了 AI 与 Blender 的链路，开发了自动化插件，实现了从 AI 生成贴图到 3D 模型的快速映射，探索了 AI 辅助 3D 资产预处理的高效工作流。" };
    }

    // 3. Project Specific Queries

    // Comfy Flow
    if (lowerInput.includes('comfy flow') || lowerInput.includes('flow')) {
        return { text: "Comfy Flow 是一个基于 Express 和 WebSocket 的多用户队列管理平台。它解决了团队共享 GPU 时的资源冲突问题，让 ComfyUI 的使用变得像“一键生产”一样简单。" };
    }

    // Flow Master
    if (lowerInput.includes('flow master') || lowerInput.includes('master')) {
        return { text: "Flow Master 是一个桌面端自动化编排平台。它结合了 PyQt5 的界面和 Playwright 的强大能力，让不懂代码的人也能通过拖拽来创建复杂的网页自动化脚本。" };
    }

    // Comfy Controller
    if (lowerInput.includes('controller')) {
        return { text: "Comfy Controller 是我第一次尝试用 AI 辅助开发的 Web 应用。它把复杂的 ComfyUI 节点封装成了漂亮的网页界面，支持图生图、标题生成等功能，非常适合批量处理任务。" };
    }

    // ZKZNodes
    if (lowerInput.includes('zkz') || lowerInput.includes('nodes')) {
        return { text: "ComfyUI-ZKZNodes 是我为了补全 ComfyUI 功能缺失而开发的一套自定义节点。从图像裁剪到逻辑控制，这些节点都是我在实际工作中遇到痛点后，用 AI 辅助写出来的。" };
    }

    // ArroEngine
    if (lowerInput.includes('arro') || lowerInput.includes('engine')) {
        return { text: "ArroEngine 是一个极简但逻辑强大的文件管理器。它有“时光机”撤销功能和双轨处理引擎，是我验证“AI + 审美 + 逻辑构建”的实验性项目。" };
    }

    // AirShot
    if (lowerInput.includes('airshot') || lowerInput.includes('截图')) {
        return { text: "AirShot 是一款极简的桌面截图工具。它支持屏幕钉图、延时截图和美观的标注，旨在填补微信截图和专业软件之间的空白，让截图变得轻量又高效。" };
    }

    // 4. General Categories - Main Navigation Buttons
    if (lowerInput.includes('商业') || lowerInput.includes('business') || lowerInput.includes('案例')) {
        return { text: "点击下方的\"商业案例\"按钮，我可以带你去看看那些成熟的商业落地项目。", action: '/business-cases/' };
    }
    if (lowerInput.includes('开发') || lowerInput.includes('dev') || lowerInput.includes('code') || lowerInput.includes('作品') || lowerInput.includes('项目')) {
        return { text: "我对开发很有热情！你可以查看\"项目开发\"板块，那里有我所有的开源项目和技术探索。", action: '/showcase/' };
    }
    if (lowerInput.includes('艺术') || lowerInput.includes('art') || lowerInput.includes('gallery') || lowerInput.includes('画廊')) {
        return { text: "艺术是我的灵感来源。去\"艺术画廊\"逛逛吧，那里收藏了很多精美的 AI 生成艺术作品。", action: '/art-gallery/' };
    }

    // 5. Fallback
    return { text: "这个问题有点深奥... 要不你问问关于我的转型经历？或者 Comfy Flow 是怎么做到 1 人抵 30 人的？" };
}
