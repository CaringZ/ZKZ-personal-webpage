"use client"

import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from "react"

type NodeType = "step" | "detail"

interface BaseNode {
  id: string
  type: NodeType
  title: string
  description: string
  position: { x: number; y: number }
  parentId?: string
}

interface EdgeDefinition {
  id: string
  from: string
  to: string
}

interface PipelineSceneProps {
  onRequestBack?: () => void
  isActive?: boolean
}

type NodePositions = Record<string, { x: number; y: number }>
type NodeSizes = Record<string, { width: number; height: number }>

const MIN_SCALE = 0.12
const MAX_SCALE = 4

const stepNodes: BaseNode[] = [
  {
    id: "step-1",
    type: "step",
    title: "第一步：AI 驱动的市场情报分析",
    description: "部署自动化脚本抓取社媒趋势与用户画像，利用 LLM 语义提取技术提炼核心洞察，自动输出高转化潜力的品类白皮书。",
    position: { x: 0, y: 0 },
  },
  {
    id: "step-2",
    type: "step",
    title: "第二步：多维数据验证与风险风控",
    description: "基于竞品销量与评价数据进行多维分析，辅助判断新品的市场潜力，有效降低选品试错风险，确保资源投入的准确性。",
    position: { x: 1200, y: 0 },
  },
  {
    id: "step-3",
    type: "step",
    title: "第三步：ComfyUI 程序化资产管线",
    description: "搭建基于 Node 的非线性工作流，集成 ControlNet 精准控制与 LoRA 风格微调，实现‘单人日产 800+’的高质量设计稿吞吐。",
    position: { x: 2250, y: 0 },
  },
  {
    id: "step-4",
    type: "step",
    title: "第四步：自动化渲染与合成工厂",
    description: "编写 Python 脚本打通 Blender 与 AI 链路，实现 3D 场景的批量自动化渲染与光影合成，输出商业级视觉素材。",
    position: { x: 3250, y: 0 },
  },
  {
    id: "step-5",
    type: "step",
    title: "第五步：RPA 智能分发与运营",
    description: "利用 RPA (FlowMaster) 机器人接管繁琐的上架流程，结合 AI 生成的 SEO 优选文案，实现多平台、多店铺的矩阵式自动化铺货。",
    position: { x: 4350, y: 0 },
  },
  {
    id: "step-6",
    type: "step",
    title: "第六步：1人抵30人的降维打击",
    description: "1.5 个月落地 15,000+ SKU。这不仅是技术的胜利，更是‘技术美术’思维对传统电商生产力的重构。",
    position: { x: 5450, y: 0 },
  },
]

const detailNodeDefinitions: Array<Omit<BaseNode, "position"> & { offset: { x: number; y: number } }> = [
  // Step 1 details
  {
    id: "step-1-tag-1",
    type: "detail",
    parentId: "step-1",
    title: "输入：目标销售地区",
    description: "锁定目标消费市场，匹配当地政策和物流条件，为后续策略设定边界。",
    offset: { x: -360, y: -240 },
  },
  {
    id: "step-1-tag-2",
    type: "detail",
    parentId: "step-1",
    title: "自动化抓取：社媒热点趋势",
    description: "Python 脚本自动监控 TikTok、小红书等平台热度榜单，筛选具有扩散潜力的话题。",
    offset: { x: 360, y: -260 },
  },
  {
    id: "step-1-tag-3",
    type: "detail",
    parentId: "step-1",
    title: "自动化抓取：用户画像数据",
    description: "通过历史订单与人群标签构建画像，明确视觉和功能偏好。",
    offset: { x: -380, y: 60 },
  },
  {
    id: "step-1-tag-4",
    type: "detail",
    parentId: "step-1",
    title: "核心技术：LLM 语义提取",
    description: "利用垂直调优的 LLM 融合多源数据，自动生成候选品类与卖点矩阵。",
    offset: { x: 450, y: 310 },
  },
  {
    id: "step-1-tag-5",
    type: "detail",
    parentId: "step-1",
    title: "输出：高转化潜力品类白皮书",
    description: "形成优先级排序的选品列表，为下一阶段验证提供聚焦方向。",
    offset: { x: 0, y: 335 },
  },
  // Step 2 details
  {
    id: "step-2-tag-1",
    type: "detail",
    parentId: "step-2",
    title: "验证方式：销售平台前端数据",
    description: "利用第三方平台以及主要销售平台前端，获取目标产品近中期销售数据。",
    offset: { x: -320, y: -240 },
  },
  {
    id: "step-2-tag-2",
    type: "detail",
    parentId: "step-2",
    title: "分析对象：头部竞品销量、评论、关键词",
    description: "围绕竞品销量曲线、关键词热度与情感分析完成对标评估。",
    offset: { x: 340, y: -240 },
  },
  {
    id: "step-2-tag-3",
    type: "detail",
    parentId: "step-2",
    title: "闭环：AI建议 → 市场数据 → 快速迭代",
    description: "验证结果即时回写策略引擎，驱动下一轮选品和设计迭代。",
    offset: { x: -360, y: 100 },
  },
  {
    id: "step-2-tag-4",
    type: "detail",
    parentId: "step-2",
    title: "结论：锁定成功概率更高的产品和设计方向",
    description: "剔除高风险品类，保留兼具需求与利润空间的候选方案。",
    offset: { x: 40, y: 320 },
  },
  // Step 3 details
  {
    id: "step-3-tag-1",
    type: "detail",
    parentId: "step-3",
    title: "创意来源1: AI生成Prompt (文生图)",
    description: "根据模板框架AI自动生成与产品搭配的设计图prompt。",
    offset: { x: -320, y: -260 },
  },
  {
    id: "step-3-tag-2",
    type: "detail",
    parentId: "step-3",
    title: "创意来源2: 优秀样本创意裂变 (图生图)",
    description: "以竞品素材为基，快速衍生多种设计方案，提升灵感覆盖面。",
    offset: { x: 340, y: -240 },
  },
  {
    id: "step-3-tag-3",
    type: "detail",
    parentId: "step-3",
    title: "核心优势：无限创意 x 极低成本",
    description: "自动化试错将创意成本极大程度降低，同时保证产出效果满足甚至优于可接受范围。",
    offset: { x: -360, y: 60 },
  },
  {
    id: "step-3-tag-4",
    type: "detail",
    parentId: "step-3",
    title: "产出：海量、多样化的核心产品设计图",
    description: "一键自动化运行，为后续环节提供充足素材池。",
    offset: { x: 40, y: 320 },
  },
  // Step 4 details
  {
    id: "step-4-tag-1",
    type: "detail",
    parentId: "step-4",
    title: "环节一：AI生成/素材库获取高质量背景",
    description: "结合 AI 生图与内部素材库，匹配符合渠道审美的背景场景。",
    offset: { x: -320, y: -260 },
  },
  {
    id: "step-4-tag-2",
    type: "detail",
    parentId: "step-4",
    title: '环节二：自建"一键溶图"工作流',
    description: "将产品图与背景图完成光影融合和透视调整，实现自然过渡。",
    offset: { x: 360, y: -240 },
  },
  {
    id: "step-4-tag-3",
    type: "detail",
    parentId: "step-4",
    title: "环节三：自研Blender插件批量渲染",
    description: "通过 Blender 插件驱动参数化建模，实现多角度自动渲染。",
    offset: { x: -360, y: 60 },
  },
  {
    id: "step-4-tag-4",
    type: "detail",
    parentId: "step-4",
    title: "产出：全套标准化的产品效果图",
    description: "输出符合平台规范的规格图集，可直接投入详情页搭建。",
    offset: { x: 60, y: 320 },
  },
  // Step 5 details
  {
    id: "step-5-tag-1",
    type: "detail",
    parentId: "step-5",
    title: "内容生成：AI高效生成精准标题",
    description: "结合关键词库与竞品评价，自动生成高转化标题与卖点文案。",
    offset: { x: -320, y: -240 },
  },
  {
    id: "step-5-tag-2",
    type: "detail",
    parentId: "step-5",
    title: "上架执行：自研RPA软件 'FlowMaster' 自动化上品",
    description: "RPA 机器人完成建品、上传素材、设定价格等重复操作。",
    offset: { x: 360, y: -240 },
  },
  {
    id: "step-5-tag-3",
    type: "detail",
    parentId: "step-5",
    title: "核心策略：矩阵式铺货，最大化爆品概率",
    description: "多账号与多店铺同时铺货，通过数据反馈快速筛选潜力品。",
    offset: { x: -360, y: 60 },
  },
  {
    id: "step-5-tag-4",
    type: "detail",
    parentId: "step-5",
    title: "成果：AI+技术大量替代重复性工作",
    description: "释放运营团队时间投入策略与品牌建设，在低人力成本下扩张。",
    offset: { x: 60, y: 320 },
  },
  // Step 6 details
  {
    id: "step-6-tag-1",
    type: "detail",
    parentId: "step-6",
    title: "SKU 落地数量：15,000+",
    description: "1.5 个月完成 15,000 件商品上架，自动化效率相当于 30 人团队 3 天产出。",
    offset: { x: -360, y: -240 },
  },
  {
    id: "step-6-tag-2",
    type: "detail",
    parentId: "step-6",
    title: "爆品 A 销量：30,000+",
    description: "通过数据驱动选品和自动化投放，首个爆品在两个月达到 30,000+ 销量。",
    offset: { x: 360, y: -240 },
  },
  {
    id: "step-6-tag-3",
    type: "detail",
    parentId: "step-6",
    title: "爆品 B 销量：40,000+",
    description: "多渠道矩阵铺货策略帮助新品在三个月内突破 40,000+ 销量。",
    offset: { x: -360, y: 80 },
  },
  {
    id: "step-6-tag-4",
    type: "detail",
    parentId: "step-6",
    title: "人效提升：3000% (1人 vs 30人)",
    description: "成功打通从 AI 技术到商业盈利的全流程，形成可复制的增长闭环。",
    offset: { x: 320, y: 320 },
  },
]

const stepPositionMap = stepNodes.reduce<Record<string, { x: number; y: number }>>((acc, node) => {
  acc[node.id] = node.position
  return acc
}, {})

const detailNodes: BaseNode[] = detailNodeDefinitions.map(({ offset, ...node }) => {
  const parentPosition = node.parentId ? stepPositionMap[node.parentId] : undefined
  const baseX = parentPosition?.x ?? 0
  const baseY = parentPosition?.y ?? 0
  return {
    ...node,
    position: {
      x: baseX + offset.x,
      y: baseY + offset.y,
    },
  }
})

const nodeDefinitions: BaseNode[] = [...stepNodes, ...detailNodes]

const edgeDefinitions: EdgeDefinition[] = [
  ...stepNodes.slice(0, -1).map((current, index) => ({
    id: `edge-${current.id}-${stepNodes[index + 1].id}`,
    from: current.id,
    to: stepNodes[index + 1].id,
  })),
  ...detailNodes.map((detail) => ({
    id: `edge-${detail.parentId}-${detail.id}`,
    from: detail.parentId as string,
    to: detail.id,
  })),
]

const stepColorPalette = ["#6fc2b5", "#6faed8", "#7ec88a", "#d8c78e", "#c6a7df", "#f0a6a6"]

function getStepIndexFromId(id: string) {
  const match = id.match(/step-(\d+)/)
  return match ? Math.max(0, Number(match[1]) - 1) : 0
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "")
  if (normalized.length === 3) {
    const r = parseInt(normalized[0] + normalized[0], 16)
    const g = parseInt(normalized[1] + normalized[1], 16)
    const b = parseInt(normalized[2] + normalized[2], 16)
    return { r, g, b }
  }
  const r = parseInt(normalized.slice(0, 2), 16)
  const g = parseInt(normalized.slice(2, 4), 16)
  const b = parseInt(normalized.slice(4, 6), 16)
  return { r, g, b }
}

function rgbaFromHex(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function mixHexColors(hexA: string, hexB: string, weight: number) {
  const a = hexToRgb(hexA)
  const b = hexToRgb(hexB)
  const clampWeight = Math.max(0, Math.min(1, weight))
  return {
    r: Math.round(a.r * (1 - clampWeight) + b.r * clampWeight),
    g: Math.round(a.g * (1 - clampWeight) + b.g * clampWeight),
    b: Math.round(a.b * (1 - clampWeight) + b.b * clampWeight),
  }
}

function rgbaFromRgb(rgb: { r: number; g: number; b: number }, alpha: number) {
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function createInitialPositionMap(): NodePositions {
  return nodeDefinitions.reduce<NodePositions>((acc, node) => {
    acc[node.id] = { ...node.position }
    return acc
  }, {})
}

const defaultSizes: NodeSizes = nodeDefinitions.reduce<NodeSizes>((acc, node) => {
  acc[node.id] =
    node.type === "step"
      ? { width: 480, height: 360 }
      : {
        width: 280,
        height: 200,
      }
  return acc
}, {})

type TransformState = { x: number; y: number; scale: number }

export default function PipelineScene({ onRequestBack, isActive = false }: PipelineSceneProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState<TransformState>({ x: 0, y: 0, scale: 1 })
  const transformRef = useRef(transform)
  const [positions, setPositions] = useState<NodePositions>(() => createInitialPositionMap())
  const positionsRef = useRef(positions)
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    nodeDefinitions.reduce<Record<string, boolean>>((acc, node) => {
      acc[node.id] = true
      return acc
    }, {}),
  )
  const allExpanded = useMemo(() => Object.values(expanded).every(Boolean), [expanded])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [sizes, setSizes] = useState<NodeSizes>(defaultSizes)
  const [hasInitialFit, setHasInitialFit] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const [hasPlayedEntrance, setHasPlayedEntrance] = useState(false)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({})

  transformRef.current = transform
  positionsRef.current = positions

  useEffect(() => {
    if (!("ResizeObserver" in window)) {
      return
    }
    resizeObserverRef.current = new ResizeObserver((entries) => {
      setSizes((prev) => {
        let shouldUpdate = false
        const next: NodeSizes = { ...prev }
        for (const entry of entries) {
          const id = entry.target.getAttribute("data-node-id")
          if (!id) continue
          const { width, height } = entry.contentRect
          const existing = prev[id]
          if (!existing || existing.width !== width || existing.height !== height) {
            next[id] = { width, height }
            shouldUpdate = true
          }
        }
        return shouldUpdate ? next : prev
      })
    })

    return () => {
      resizeObserverRef.current?.disconnect()
      resizeObserverRef.current = null
    }
  }, [])

  const registerNodeRef = useCallback(
    (id: string) => (node: HTMLDivElement | null) => {
      const current = nodeRefs.current[id]
      if (current === node) {
        return
      }
      if (current) {
        resizeObserverRef.current?.unobserve(current)
      }
      nodeRefs.current[id] = node
      if (node) {
        node.setAttribute("data-node-id", id)
        resizeObserverRef.current?.observe(node)
        setSizes((prev) => {
          const width = node.offsetWidth
          const height = node.offsetHeight
          const existing = prev[id]
          if (existing && existing.width === width && existing.height === height) {
            return prev
          }
          return { ...prev, [id]: { width, height } }
        })
      }
    },
    [],
  )

  const screenToWorld = useCallback((point: { x: number; y: number }) => {
    const current = transformRef.current
    return {
      x: (point.x - current.x) / current.scale,
      y: (point.y - current.y) / current.scale,
    }
  }, [])

  const getCanvasPoint = useCallback((event: PointerEvent | WheelEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    return {
      x: ("clientX" in event ? event.clientX : 0) - (rect?.left ?? 0),
      y: ("clientY" in event ? event.clientY : 0) - (rect?.top ?? 0),
    }
  }, [])

  const panStateRef = useRef<{
    pointerId: number | null
    button: number | null
    startPoint: { x: number; y: number }
    startTransform: TransformState
  }>({
    pointerId: null,
    button: null,
    startPoint: { x: 0, y: 0 },
    startTransform: transform,
  })

  const nodeDragStateRef = useRef<{
    pointerId: number | null
    nodeId: string | null
    offset: { x: number; y: number }
    startPointer: { x: number; y: number }
    moved: boolean
  }>({
    pointerId: null,
    nodeId: null,
    offset: { x: 0, y: 0 },
    startPointer: { x: 0, y: 0 },
    moved: false,
  })

  const isPanningRef = useRef(false)

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault()
      event.stopPropagation()
      const canvasPoint = getCanvasPoint(event)
      const worldPoint = screenToWorld(canvasPoint)
      const zoomFactor = Math.exp(-event.deltaY * 0.0012)
      setTransform((prev) => {
        const nextScale = clamp(prev.scale * zoomFactor, MIN_SCALE, MAX_SCALE)
        const next = {
          scale: nextScale,
          x: canvasPoint.x - worldPoint.x * nextScale,
          y: canvasPoint.y - worldPoint.y * nextScale,
        }
        return next
      })
    },
    [getCanvasPoint, screenToWorld],
  )

  const handleBackgroundPointerDown = useCallback((event: PointerEvent) => {
    if (event.button !== 0 && event.button !== 1) return
    const targetElement = event.target as HTMLElement
    if (targetElement?.closest("[data-node-card='true']")) {
      return
    }
    event.preventDefault()
    event.stopPropagation()
    if (event.button === 0) {
      setSelectedId(null)
    }
    setIsUserInteracting(true)
    const canvasPoint = getCanvasPoint(event)
    panStateRef.current = {
      pointerId: event.pointerId,
      button: event.button,
      startPoint: canvasPoint,
      startTransform: transformRef.current,
    }
    isPanningRef.current = true
    // Capture pointer to ensure we receive move events even if cursor leaves the element
    try {
      (event.target as Element).setPointerCapture(event.pointerId)
    } catch (e) {
      // Ignore errors if capture fails
    }
  }, [getCanvasPoint, setSelectedId])

  const handleBackgroundPointerMove = useCallback((event: PointerEvent) => {
    if (!isPanningRef.current || panStateRef.current.pointerId !== event.pointerId) {
      return
    }
    event.preventDefault()
    const canvasPoint = getCanvasPoint(event)
    const dx = canvasPoint.x - panStateRef.current.startPoint.x
    const dy = canvasPoint.y - panStateRef.current.startPoint.y
    const base = panStateRef.current.startTransform
    setTransform({ x: base.x + dx, y: base.y + dy, scale: base.scale })
  }, [getCanvasPoint])

  const handleBackgroundPointerUp = useCallback((event: PointerEvent) => {
    if (panStateRef.current.pointerId === event.pointerId) {
      try {
        (event.target as Element).releasePointerCapture(event.pointerId)
      } catch (e) {
        // Ignore
      }
      panStateRef.current.pointerId = null
      panStateRef.current.button = null
      isPanningRef.current = false
      setIsUserInteracting(false)
    }
  }, [])

  const toggleExpanded = useCallback((id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const handleNodePointerDown = useCallback((event: PointerEvent, nodeId: string) => {
    if (event.button !== 0) return
    event.stopPropagation()
    event.preventDefault()
    setIsUserInteracting(true)
    setSelectedId(nodeId)
    setIsDragging(true)
    const canvasPoint = getCanvasPoint(event)
    const worldPoint = screenToWorld(canvasPoint)
    const nodePosition = positionsRef.current[nodeId]
    nodeDragStateRef.current = {
      pointerId: event.pointerId,
      nodeId,
      offset: {
        x: worldPoint.x - nodePosition.x,
        y: worldPoint.y - nodePosition.y,
      },
      startPointer: canvasPoint,
      moved: false,
    }
  }, [getCanvasPoint, screenToWorld, setSelectedId])

  const handleNodePointerMove = useCallback((event: PointerEvent) => {
    const state = nodeDragStateRef.current
    if (state.pointerId !== event.pointerId || !state.nodeId) {
      return
    }
    event.preventDefault()
    const canvasPoint = getCanvasPoint(event)
    const worldPoint = screenToWorld(canvasPoint)
    const nextPosition = {
      x: worldPoint.x - state.offset.x,
      y: worldPoint.y - state.offset.y,
    }
    setPositions((prev) => {
      const existing = prev[state.nodeId as string]
      if (!existing || (existing.x === nextPosition.x && existing.y === nextPosition.y)) {
        return prev
      }
      return { ...prev, [state.nodeId as string]: nextPosition }
    })
    if (!state.moved) {
      const dx = canvasPoint.x - state.startPointer.x
      const dy = canvasPoint.y - state.startPointer.y
      if (Math.hypot(dx, dy) > 4) {
        state.moved = true
      }
    }
  }, [getCanvasPoint, screenToWorld])

  const resetNodeDragState = useCallback(() => {
    nodeDragStateRef.current = {
      pointerId: null,
      nodeId: null,
      offset: { x: 0, y: 0 },
      startPointer: { x: 0, y: 0 },
      moved: false,
    }
  }, [])

  const handleNodePointerUp = useCallback((event: PointerEvent, explicitNodeId?: string) => {
    const state = nodeDragStateRef.current
    if (state.pointerId === event.pointerId && state.nodeId && (explicitNodeId ? state.nodeId === explicitNodeId : true)) {
      setIsDragging(false)
      setIsUserInteracting(false)
      resetNodeDragState()
    }
  }, [resetNodeDragState])

  useEffect(() => {
    const handleWindowPointerMove = (event: PointerEvent) => {
      handleNodePointerMove(event)
      handleBackgroundPointerMove(event)
    }
    const handleWindowPointerUp = (event: PointerEvent) => {
      handleNodePointerUp(event)
      handleBackgroundPointerUp(event)
    }
    window.addEventListener("pointermove", handleWindowPointerMove, { passive: false })
    window.addEventListener("pointerup", handleWindowPointerUp, { passive: false })
    window.addEventListener("pointercancel", handleWindowPointerUp, { passive: false })
    return () => {
      window.removeEventListener("pointermove", handleWindowPointerMove)
      window.removeEventListener("pointerup", handleWindowPointerUp)
      window.removeEventListener("pointercancel", handleWindowPointerUp)
    }
  }, [handleBackgroundPointerMove, handleBackgroundPointerUp, handleNodePointerMove, handleNodePointerUp])

  const fitToContent = useCallback(
    (padding = 140, offsetCorrection = 0) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const nodes = Object.keys(positionsRef.current)
      if (!nodes.length) return
      let minX = Number.POSITIVE_INFINITY
      let minY = Number.POSITIVE_INFINITY
      let maxX = Number.NEGATIVE_INFINITY
      let maxY = Number.NEGATIVE_INFINITY
      for (const id of nodes) {
        const position = positionsRef.current[id]
        const size = sizes[id] ?? defaultSizes[id]
        minX = Math.min(minX, position.x)
        minY = Math.min(minY, position.y)
        maxX = Math.max(maxX, position.x + size.width)
        maxY = Math.max(maxY, position.y + size.height)
      }
      const contentWidth = maxX - minX
      const contentHeight = maxY - minY
      if (contentWidth === 0 || contentHeight === 0) {
        return
      }
      const scaleX = (rect.width - padding * 2) / contentWidth
      const scaleY = (rect.height - padding * 2) / contentHeight
      const fittedScale = Math.min(scaleX, scaleY)
      const nextScale = clamp(fittedScale * 0.98, MIN_SCALE, MAX_SCALE)
      const offsetX = (rect.width - contentWidth * nextScale) / 2 - minX * nextScale + offsetCorrection
      const offsetY = (rect.height - contentHeight * nextScale) / 2 - minY * nextScale
      setTransform({ x: offsetX, y: offsetY, scale: nextScale })
    },
    [sizes],
  )

  useEffect(() => {
    if (!isActive || isUserInteracting) {
      return
    }
    if (hasInitialFit) {
      return
    }
    const measuredCount = Object.keys(sizes).length
    const expectedCount = nodeDefinitions.length
    // Wait until all nodes are measured to avoid mis-fitting bounds
    if (measuredCount === 0 || measuredCount < expectedCount) {
      return
    }
    // Use double requestAnimationFrame to ensure container is visible and has dimensions
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fitToContent(140, -100)
        setHasInitialFit(true)
      })
    })
  }, [isActive, fitToContent, sizes, isUserInteracting, hasInitialFit])

  useEffect(() => {
    if (!isActive) {
      setHasInitialFit(false)
      setIsUserInteracting(false)
    }
  }, [isActive])

  // Play entrance animation only when该场景处于激活状态，避免隐藏阶段就把动画耗完
  useEffect(() => {
    if (!isActive) {
      return
    }
    if (hasPlayedEntrance) {
      return
    }
    const timer = window.setTimeout(() => {
      setHasPlayedEntrance(true)
    }, 400)
    return () => clearTimeout(timer)
  }, [hasPlayedEntrance, isActive])

  const edges = useMemo(() => edgeDefinitions, [])
  const mainEdgeColors = useMemo(
    () => [
      "rgba(108, 248, 224, 0.9)",
      "rgba(104, 196, 255, 0.9)",
      "rgba(168, 231, 144, 0.9)",
      "rgba(255, 223, 124, 0.9)",
      "rgba(214, 168, 255, 0.9)",
    ],
    [],
  )

  const getNodeCenter = useCallback(
    (id: string) => {
      const position = positions[id]
      const size = sizes[id] ?? defaultSizes[id]
      return { x: position.x + size.width / 2, y: position.y + size.height / 2 }
    },
    [positions, sizes],
  )

  const renderEdge = useCallback(
    (edge: EdgeDefinition) => {
      const from = getNodeCenter(edge.from)
      const to = getNodeCenter(edge.to)
      const dx = to.x - from.x
      const dy = to.y - from.y
      const distance = Math.max(1, Math.hypot(dx, dy))
      const isMainEdge = edge.from.startsWith("step") && edge.to.startsWith("step")
      const mainEdgeIndex = isMainEdge ? getStepIndexFromId(edge.from) : -1

      const perpendicular = distance === 0 ? { x: 0, y: 0 } : { x: -dy / distance, y: dx / distance }
      const direction =
        isMainEdge && mainEdgeIndex >= 0 ? (mainEdgeIndex % 2 === 0 ? 1 : -1) : Math.sign(dy || dx || 1)
      const baseStrength = clamp(distance * (isMainEdge ? 0.18 : 0.12), isMainEdge ? 36 : 20, isMainEdge ? 120 : 72)
      const offset1 = {
        x: perpendicular.x * baseStrength * direction,
        y: perpendicular.y * baseStrength * direction,
      }
      const offset2 = {
        x: perpendicular.x * -baseStrength * direction * 0.6,
        y: perpendicular.y * -baseStrength * direction * 0.6,
      }

      const controlPoint1 = {
        x: from.x + dx * 0.35 + offset1.x,
        y: from.y + dy * 0.35 + offset1.y,
      }
      const controlPoint2 = {
        x: from.x + dx * 0.65 + offset2.x,
        y: from.y + dy * 0.65 + offset2.y,
      }

      const path = `M ${from.x} ${from.y} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${to.x} ${to.y}`
      const strokeColor = isMainEdge
        ? mainEdgeColors[mainEdgeIndex] ?? "rgba(104, 255, 226, 0.9)"
        : "rgba(149, 138, 255, 0.75)"

      return (
        <g key={edge.id}>
          {/* Glow layer for main edges */}
          {isMainEdge && (
            <path
              d={path}
              stroke={strokeColor}
              strokeWidth={12}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.2}
              filter="blur(8px)"
            />
          )}
          {/* Main path */}
          <path
            d={path}
            stroke={strokeColor}
            strokeWidth={isMainEdge ? 4.5 : 2.4}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: isMainEdge ? "drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))" : "none",
            }}
          />
          {/* Flowing light effect on main edges */}
          {isMainEdge && (
            <path
              d={path}
              stroke="rgba(255, 255, 255, 0.95)"
              strokeWidth={5}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="30 100"
              style={{
                animation: `flowingLight 2.5s linear infinite`,
                animationDelay: `${mainEdgeIndex * 0.4}s`,
                filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))",
              }}
            />
          )}
        </g>
      )
    },
    [getNodeCenter, mainEdgeColors],
  )

  const handleResetView = useCallback(() => fitToContent(125), [fitToContent])
  const handleToggleAll = useCallback(() => {
    setExpanded((prev) => {
      const shouldExpand = Object.values(prev).some((value) => !value)
      const next: Record<string, boolean> = {}
      for (const key of Object.keys(prev)) {
        next[key] = shouldExpand
      }
      return next
    })
  }, [])

  return (
    <section className="relative flex h-screen w-screen items-center justify-center">
      <div
        ref={canvasRef}
        className="relative h-full w-full overflow-hidden"
        style={{
          backgroundColor: "#090b11",
          backgroundImage:
            [
              "linear-gradient(rgba(120,130,150,0.12) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(120,130,150,0.12) 1px, transparent 1px)",
              "linear-gradient(rgba(120,130,150,0.04) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(120,130,150,0.04) 1px, transparent 1px)",
            ].join(", "),
          backgroundSize: "80px 80px, 80px 80px, 16px 16px, 16px 16px",
          backgroundPosition: "center",
          touchAction: "none",
        }}
        onPointerDown={(event) => handleBackgroundPointerDown(event.nativeEvent)}
        onPointerUp={(event) => handleBackgroundPointerUp(event.nativeEvent)}
        onPointerLeave={(event) => handleBackgroundPointerUp(event.nativeEvent)}
        onWheelCapture={(event) => {
          if (isPanningRef.current && panStateRef.current.button === 1) {
            event.preventDefault()
            return
          }
          handleWheel(event.nativeEvent)
        }}
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ overflow: "visible" }}>
          <g transform={`translate(${transform.x} ${transform.y}) scale(${transform.scale})`}>
            {edges.map(renderEdge)}
          </g>
        </svg>

        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            transformOrigin: "0 0",
          }}
        >
          {nodeDefinitions.map((node, index) => {
            const position = positions[node.id]
            const isBeingDragged = isDragging && nodeDragStateRef.current.nodeId === node.id
            // Calculate entrance delay based on node type and index
            const isStep = node.type === "step"
            const stepIndex = isStep ? getStepIndexFromId(node.id) : -1
            const entranceDelay = isStep ? stepIndex * 0.25 : (stepIndex + 1) * 0.25 + (index % 5) * 0.08

            return (
              <NodeCard
                key={node.id}
                ref={registerNodeRef(node.id)}
                node={node}
                position={position}
                selected={selectedId === node.id}
                expanded={!!expanded[node.id]}
                isDragging={isBeingDragged}
                showEntrance={hasPlayedEntrance}
                entranceDelay={entranceDelay}
                onPointerDown={handleNodePointerDown}
                onPointerUp={handleNodePointerUp}
                onToggleExpanded={toggleExpanded}
              />
            )
          })}
        </div>

        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="px-4 py-2 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
            鼠标左键/中键拖动画布 · 滚轮缩放
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-6 right-6 flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggleAll}
            className="pointer-events-auto rounded-lg border bg-black/55 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            style={{ borderColor: "rgba(216, 222, 238, 0.78)" }}
          >
            {allExpanded ? "全部收起" : "全部展开"}
          </button>
          <button
            type="button"
            onClick={handleResetView}
            className="pointer-events-auto rounded-lg border bg-black/55 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            style={{ borderColor: "rgba(216, 222, 238, 0.78)" }}
          >
            自适应视图
          </button>
          {onRequestBack && (
            <button
              type="button"
              onClick={onRequestBack}
              className="pointer-events-auto rounded-lg border bg-black/55 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
              style={{ borderColor: "rgba(216, 222, 238, 0.78)" }}
            >
              返回标题
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

interface NodeCardProps {
  node: BaseNode
  position: { x: number; y: number }
  selected: boolean
  expanded: boolean
  isDragging: boolean
  showEntrance: boolean
  entranceDelay: number
  onPointerDown: (event: PointerEvent, id: string) => void
  onPointerUp: (event: PointerEvent, id?: string) => void
  onToggleExpanded: (id: string) => void
}

const NodeCard = memo(
  forwardRef<HTMLDivElement, NodeCardProps>(function NodeCard(
    { node, position, selected, expanded, isDragging, showEntrance, entranceDelay, onPointerDown, onPointerUp, onToggleExpanded },
    ref,
  ) {
    const isStep = node.type === "step"
    const paletteIndex = getStepIndexFromId(node.id)
    const baseColor = stepColorPalette[paletteIndex] ?? stepColorPalette[0]
    const neutralHex = "#d0d6e5"
    const detailBase = mixHexColors(baseColor, neutralHex, 0.62)
    const detailAccent = mixHexColors(baseColor, "#f2f4f8", 0.74)

    // Enhanced color system with gradients
    const glowColor = isStep ? rgbaFromHex(baseColor, 0.35) : "rgba(220, 224, 234, 0.12)"
    const glowColorHover = isStep ? rgbaFromHex(baseColor, 0.55) : "rgba(220, 224, 234, 0.18)"

    // Glassmorphism background
    const background = isStep
      ? `linear-gradient(135deg, rgba(12, 16, 24, 0.75) 0%, rgba(18, 24, 34, 0.85) 100%)`
      : `linear-gradient(160deg, rgba(12, 16, 24, 0.65) 0%, rgba(18, 24, 34, 0.75) 100%)`

    // Gradient border
    const borderGradient = isStep
      ? `linear-gradient(135deg, ${rgbaFromHex(baseColor, 0.6)}, ${rgbaFromHex(baseColor, 0.3)})`
      : `linear-gradient(135deg, rgba(94, 108, 132, 0.5), rgba(94, 108, 132, 0.3))`

    // Header with gradient
    const headerBg = isStep
      ? `linear-gradient(135deg, ${rgbaFromHex(baseColor, 0.35)} 0%, ${rgbaFromHex(baseColor, 0.20)} 100%)`
      : `linear-gradient(135deg, ${rgbaFromRgb(detailBase, 0.28)} 0%, ${rgbaFromRgb(detailBase, 0.18)} 100%)`

    const headerBorder = isStep ? rgbaFromHex(baseColor, 0.45) : rgbaFromRgb(detailBase, 0.35)
    const headerText = isStep ? rgbaFromHex(baseColor, 1) : rgbaFromRgb(detailAccent, 0.9)
    const detailText = "rgba(220, 230, 244, 0.88)"
    const haloColor = isStep ? rgbaFromHex(baseColor, 0.7) : rgbaFromRgb(detailAccent, 0.5)
    const toggleBorder = isStep ? rgbaFromHex(baseColor, 0.6) : rgbaFromRgb(detailAccent, 0.4)
    const toggleGlow = isStep ? rgbaFromHex(baseColor, 0.5) : rgbaFromRgb(detailAccent, 0.35)
    const toggleFill = expanded ? (isStep ? rgbaFromHex(baseColor, 0.65) : rgbaFromRgb(detailAccent, 0.5)) : "transparent"

    // Multi-layer shadow system
    const boxShadow = isStep
      ? `0 0 30px ${glowColor}, 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
      : `0 0 20px ${glowColor}, 0 4px 16px rgba(0, 0, 0, 0.3)`

    const boxShadowHover = isStep
      ? `0 0 45px ${glowColorHover}, 0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)`
      : `0 0 25px ${glowColorHover}, 0 6px 20px rgba(0, 0, 0, 0.35)`

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        data-node-card="true"
        className={`group absolute select-none overflow-hidden rounded-2xl text-slate-200 ${isDragging ? "" : "transition-all duration-300 ease-out hover:scale-[1.02]"
          } ${showEntrance ? "card-entrance" : "opacity-0"} ${isStep ? "card-pulse" : ""}`}
        style={{
          left: position.x,
          top: position.y,
          width: isStep ? 480 : 300,
          maxWidth: isStep ? 480 : 340,
          background,
          backdropFilter: isStep ? "blur(20px)" : "blur(12px)",
          WebkitBackdropFilter: isStep ? "blur(20px)" : "blur(12px)",
          boxShadow: selected ? boxShadowHover : boxShadow,
          border: `1px solid transparent`,
          backgroundImage: `${borderGradient}, ${background}`,
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          outline: selected ? `2px solid ${haloColor}` : "none",
          outlineOffset: selected ? 12 : undefined,
          animationDelay: showEntrance ? `${entranceDelay}s` : "0s",
          willChange: showEntrance ? "transform, opacity" : undefined,
          transform: "translateZ(0)",
          // @ts-ignore - CSS custom property
          "--glow-color": glowColor,
        }}
        onPointerDown={(event) => onPointerDown(event.nativeEvent, node.id)}
        onPointerUp={(event) => onPointerUp(event.nativeEvent, node.id)}
        onPointerCancel={(event) => onPointerUp(event.nativeEvent, node.id)}
      >
        {/* Top highlight for glass effect */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
          }}
        />

        <div
          className={`relative flex items-center gap-4 border-b px-8 py-6 text-left leading-snug ${isStep ? "text-3xl font-bold" : "text-base font-semibold"
            }`}
          style={{
            borderColor: headerBorder,
            background: headerBg,
            color: headerText,
            textShadow: isStep ? `0 2px 8px ${rgbaFromHex(baseColor, 0.4)}` : "0 1px 4px rgba(0, 0, 0, 0.3)",
            letterSpacing: isStep ? "0.01em" : "normal",
          }}
        >
          <span className="flex-1">{node.title}</span>
          <button
            type="button"
            aria-label={expanded ? "收起节点" : "展开节点"}
            onPointerDown={(event) => {
              event.stopPropagation()
              event.preventDefault()
            }}
            onClick={(event) => {
              event.stopPropagation()
              event.preventDefault()
              onToggleExpanded(node.id)
            }}
            className="flex h-5 w-5 items-center justify-center rounded-full transition-all duration-300 hover:scale-125 hover:rotate-180 focus:outline-none"
            style={{
              border: `2px solid ${toggleBorder}`,
              boxShadow: expanded ? `0 0 12px ${toggleGlow}` : "none",
              background: toggleFill,
            }}
          >
            <div
              className="h-1.5 w-1.5 rounded-full transition-opacity"
              style={{
                background: expanded ? "rgba(255, 255, 255, 0.9)" : "transparent",
              }}
            />
          </button>
        </div>

        {expanded ? (
          <div
            className={`animate-fadeIn px-8 py-6 leading-[1.6] ${isStep ? "text-xl" : "text-base"}`}
            style={{
              color: detailText,
              animation: "fadeIn 0.3s ease-out",
            }}
          >
            {node.description}
          </div>
        ) : null}

        {/* Hover glow effect */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${rgbaFromHex(baseColor, 0.15)}, transparent 70%)`,
          }}
        />
      </div>
    )
  }),
)

NodeCard.displayName = "NodeCard"
