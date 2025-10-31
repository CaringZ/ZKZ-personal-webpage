"use client"

import SceneLayout, { type SceneTag } from "./scene-layout"

export default function SceneTwo() {
  const tags: SceneTag[] = [
    { text: "验证方式：销售平台前端数据", position: "top-left" },
    { text: "分析对象：头部竞品销量、评论、关键词", position: "top-right" },
    { text: "闭环：AI建议 → 市场数据 → 快速迭代", position: "left" },
    { text: "结论：锁定成功概率更高的产品和设计方向", position: "bottom", highlight: true },
  ]

  return <SceneLayout title="第二步：数据驱动的市场可行性验证" tags={tags} />
}
