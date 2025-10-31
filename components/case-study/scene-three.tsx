"use client"

import SceneLayout, { type SceneTag } from "./scene-layout"

export default function SceneThree() {
  const tags: SceneTag[] = [
    { text: "创意来源1: AI生成Prompt (文生图)", position: "top-left" },
    { text: "创意来源2: 优秀样本创意裂变 (图生图)", position: "top-right" },
    { text: "核心优势：无限创意 x 极低成本", position: "left" },
    { text: "产出：海量、多样化的核心产品设计图", position: "bottom", highlight: true },
  ]

  return <SceneLayout title="第三步：ComfyUI 自动化设计工作流" tags={tags} />
}
