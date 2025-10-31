"use client"
import SceneLayout, { type SceneTag } from "./scene-layout"

export default function SceneOne() {
  const tags: SceneTag[] = [
    { text: "输入：目标销售地区", position: "top-left" },
    { text: "输入：当下社交媒体热点", position: "top-right" },
    { text: "输入：用户画像与审美偏好", position: "left" },
    { text: "核心技术：大语言模型 (LLM)", position: "right" },
    { text: "输出：高潜力选品方向与创意主题", position: "bottom", highlight: true },
  ]

  return <SceneLayout title="第一步：AI 趋势洞察与选品" tags={tags} />
}
