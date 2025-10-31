"use client"

import SceneLayout, { type SceneTag } from "./scene-layout"

export default function SceneFive() {
  const tags: SceneTag[] = [
    { text: "内容生成：AI高效生成精准标题", position: "top-left" },
    { text: "上架执行：自研RPA软件 'FlowMaster' 自动化上品", position: "top-right" },
    { text: "核心策略：矩阵式铺货，最大化爆品概率", position: "left" },
    { text: "成果：AI+技术大量替代重复性工作", position: "bottom", highlight: true },
  ]

  return <SceneLayout title="第五步：AI 赋能自动化运营" tags={tags} />
}
