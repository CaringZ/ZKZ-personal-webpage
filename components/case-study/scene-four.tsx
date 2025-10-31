"use client"

import SceneLayout, { type SceneTag } from "./scene-layout"

export default function SceneFour() {
  const tags: SceneTag[] = [
    { text: "环节一：AI生成/素材库获取高质量背景", position: "top-left" },
    { text: '环节二：自建"一键溶图"工作流', position: "top-right" },
    { text: "环节三：自研Blender插件批量渲染", position: "left" },
    { text: "产出：全套标准化的产品效果图", position: "bottom", highlight: true },
  ]

  return <SceneLayout title="第四步：自动化产品视觉呈现" tags={tags} />
}
