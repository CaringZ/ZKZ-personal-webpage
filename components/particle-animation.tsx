"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import type { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from "react"
import * as THREE from "three"

interface ParticleAnimationProps {
  onEnter?: () => void
  returnFeedback?: boolean
}

type MaterialShader = Parameters<THREE.PointsMaterial["onBeforeCompile"]>[0]

export default function ParticleAnimation({ onEnter, returnFeedback }: ParticleAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hasTriggeredScrollRef = useRef(false)
  const transitionTimeoutRef = useRef<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [feedbackActive, setFeedbackActive] = useState(false)
  const sceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    points: THREE.Points
    geometry: THREE.BufferGeometry
    originalPositions: Float32Array
    velocities: Float32Array
    phases: Float32Array
    backgroundPoints: THREE.Points
    backgroundGeometry: THREE.BufferGeometry
    backgroundStartX: Float32Array
    backgroundStartY: Float32Array
    backgroundStartZ: Float32Array
    backgroundTargetX: Float32Array
    backgroundTargetY: Float32Array
    backgroundTargetZ: Float32Array
    backgroundProgress: Float32Array
    backgroundSpeed: Float32Array
    backgroundOffsets: Float32Array
    backgroundAmplitudes: Float32Array
    backgroundSizes: Float32Array
    backgroundSizeAttribute: THREE.BufferAttribute
    intersectionPoint: THREE.Vector3 | null
    rotationX: number
    rotationY: number
    isDragging: boolean
    previousMouseX: number
    previousMouseY: number
    particleCount: number
    backgroundParticleCount: number
  } | null>(null)

  const personalInfo = [
    { label: "作者", value: "朱康智" },
    { label: "微信", value: "z1900009979" },
    { label: "邮箱", value: "1035067533@qq.com" },
  ]

  useEffect(() => {
    if (!returnFeedback) {
      return
    }
    setFeedbackActive(true)
    const timeout = window.setTimeout(() => setFeedbackActive(false), 800)
    return () => window.clearTimeout(timeout)
  }, [returnFeedback])

  // Helper function to generate particle positions from text
  const createTextPositions = (
    text: string,
    fontSize: number,
    width: number,
    height: number,
    particleCount: number,
    fontStack: string,
  ): [Float32Array, number] => {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    if (!context) {
      return [new Float32Array(0), 0]
    }

    canvas.width = width
    canvas.height = height

    context.fillStyle = "white"
    context.font = `600 ${fontSize}px ${fontStack}`
    context.textAlign = "center"
    context.textBaseline = "middle"
    context.fillText(text, width / 2, height / 2 - fontSize * 0.1)

    const imageData = context.getImageData(0, 0, width, height)
    const data = imageData.data
    const cellSize = 3
    const cells = new Map<
      string,
      {
        sumX: number
        sumY: number
        count: number
      }
    >()

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4
        if (data[index + 3] > 128) {
          const cellX = Math.round(x / cellSize)
          const cellY = Math.round(y / cellSize)
          const key = `${cellX},${cellY}`
          if (!cells.has(key)) {
            cells.set(key, { sumX: x, sumY: y, count: 1 })
          } else {
            const cell = cells.get(key)!
            cell.sumX += x
            cell.sumY += y
            cell.count += 1
          }
        }
      }
    }

    if (cells.size === 0) {
      return [new Float32Array(0), 0]
    }

    const points = []
    const verticalOffset = 0.60
    const targetCount = Math.min(particleCount, cells.size)
    const stride = Math.max(1, Math.floor(cells.size / targetCount))
    const averagedPositions: Array<{ x: number; y: number }> = []
    const cellValues = Array.from(cells.values())

    for (let i = 0; i < cellValues.length && averagedPositions.length < targetCount; i += stride) {
      const cell = cellValues[i]
      averagedPositions.push({ x: cell.sumX / cell.count, y: cell.sumY / cell.count })
    }

    for (let i = 0; averagedPositions.length < targetCount && i < cellValues.length; i++) {
      const cell = cellValues[i]
      averagedPositions.push({ x: cell.sumX / cell.count, y: cell.sumY / cell.count })
    }

    for (let i = 0; i < averagedPositions.length; i++) {
      const pos = averagedPositions[i]
      const normalizedX = (pos.x / width) * 5.5 - 2.75
      const normalizedY = -(pos.y / height) * 3 + 1.5 + verticalOffset
      const z = (Math.random() - 0.5) * 0.06
      points.push(normalizedX, normalizedY, z)
    }

    return [new Float32Array(points), points.length / 3]
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const parentElement = canvas.parentElement
    if (!parentElement) return

    const fontFamily = "Noto Serif SC"
    const fontStack = `"${fontFamily}", "Source Han Serif SC", "Songti SC", "STSong", serif`
    const fontUrl = "https://fonts.gstatic.com/s/notoserifsc/v34/H4cyBXePl9DZ0Xe7gG9cyOj7uK2-n-D2rd4FY7RcrCWv.ttf"
    const tempCanvasWidth = 1200
    const tempCanvasHeight = 600
    const yourText = "欢迎来到我的像素空间"
    const fontSize = 120
    const numParticles = 12000

    let disposed = false
    let animationId = 0
    let geometry: THREE.BufferGeometry | null = null
    let material: THREE.PointsMaterial | null = null
    let renderer: THREE.WebGLRenderer | null = null
    let backgroundMaterial: THREE.PointsMaterial | null = null
    let circleTexture: THREE.CanvasTexture | null = null

    const cleanupCallbacks: Array<() => void> = []

    const loadFont = async () => {
      if (typeof document === "undefined") return
      try {
        if (typeof FontFace !== "undefined") {
          const alreadyLoaded =
            "fonts" in document &&
            Array.from(document.fonts.values()).some((font) => font.family === fontFamily)
          if (!alreadyLoaded) {
            const fontFace = new FontFace(fontFamily, `url(${fontUrl}) format("truetype")`)
            await fontFace.load()
            document.fonts.add(fontFace)
          }
        }

        if ("fonts" in document) {
          await document.fonts.load(`600 ${fontSize}px "${fontFamily}"`)
        }
      } catch (error) {
        console.warn("字体加载失败，使用系统字体作为后备。", error)
      }
    }

    const createCircleTexture = () => {
      const size = 128
      const circleCanvas = document.createElement("canvas")
      circleCanvas.width = size
      circleCanvas.height = size
      const context = circleCanvas.getContext("2d")
      if (!context) return null

      const gradient = context.createRadialGradient(size / 2, size / 2, size * 0.1, size / 2, size / 2, size / 2)
      gradient.addColorStop(0, "rgba(255,255,255,1)")
      gradient.addColorStop(1, "rgba(255,255,255,0)")

      context.fillStyle = gradient
      context.fillRect(0, 0, size, size)

      const texture = new THREE.CanvasTexture(circleCanvas)
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.generateMipmaps = false
      return texture
    }

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 3)

    const initialize = async () => {
      await loadFont()
      if (disposed) return

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(47, parentElement.clientWidth / parentElement.clientHeight, 0.1, 1000)
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true })

      renderer.setSize(parentElement.clientWidth, parentElement.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000)

      const raycaster = new THREE.Raycaster()
      const mouse = new THREE.Vector2()
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)

      const [textPositions, finalParticleCount] = createTextPositions(
        yourText,
        fontSize,
        tempCanvasWidth,
        tempCanvasHeight,
        numParticles,
        fontStack,
      )

      const positions = textPositions
      const colors = new Float32Array(finalParticleCount * 3).fill(1)
      const originalPositions = positions.slice()
      const phases = new Float32Array(finalParticleCount)
      const velocities = new Float32Array(finalParticleCount * 3)

      for (let j = 0; j < finalParticleCount; j++) {
        phases[j] = Math.random() * Math.PI * 2
      }

      geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

      circleTexture = createCircleTexture()
      material = new THREE.PointsMaterial({
        size: 0.045,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        alphaTest: 0.3,
        depthWrite: false,
      })
      if (circleTexture) {
        material.map = circleTexture
      }

      const backgroundParticleCount = 2200
      const backgroundGeometry = new THREE.BufferGeometry()
      const backgroundPositions = new Float32Array(backgroundParticleCount * 3)
      const backgroundStartX = new Float32Array(backgroundParticleCount)
      const backgroundStartY = new Float32Array(backgroundParticleCount)
      const backgroundStartZ = new Float32Array(backgroundParticleCount)
      const backgroundTargetX = new Float32Array(backgroundParticleCount)
      const backgroundTargetY = new Float32Array(backgroundParticleCount)
      const backgroundTargetZ = new Float32Array(backgroundParticleCount)
      const backgroundProgress = new Float32Array(backgroundParticleCount)
      const backgroundSpeed = new Float32Array(backgroundParticleCount)
      const backgroundOffsets = new Float32Array(backgroundParticleCount)
      const backgroundAmplitudes = new Float32Array(backgroundParticleCount)
      const backgroundSizes = new Float32Array(backgroundParticleCount)

      const assignBackgroundParticle = (index: number, randomizeProgress: boolean, currentTime: number) => {
        const side = Math.floor(Math.random() * 4)
        const radius = 6.5
        const verticalSpread = 3.6
        const depthSpread = 2.4

        let startX = 0
        let startY = 0
        let startZ = -2.2 - Math.random() * depthSpread
        const verticalOffset = (Math.random() - 0.5) * verticalSpread
        const horizontalOffset = (Math.random() - 0.5) * verticalSpread

        switch (side) {
          case 0:
            startX = -radius
            startY = verticalOffset
            break
          case 1:
            startX = radius
            startY = verticalOffset
            break
          case 2:
            startY = radius
            startX = horizontalOffset
            break
          default:
            startY = -radius
            startX = horizontalOffset
            break
        }

        const textIndex = Math.floor(Math.random() * Math.max(1, finalParticleCount))
        const textBase = textIndex * 3
        const baseTargetX = originalPositions[textBase] ?? 0
        const baseTargetY = originalPositions[textBase + 1] ?? 0
        const baseTargetZ = originalPositions[textBase + 2] ?? 0
        const targetX = baseTargetX + (Math.random() - 0.5) * 0.18
        const targetY = baseTargetY + (Math.random() - 0.5) * 0.18
        const targetZ = baseTargetZ - 0.35 + (Math.random() - 0.5) * 0.25

        backgroundStartX[index] = startX
        backgroundStartY[index] = startY
        backgroundStartZ[index] = startZ
        backgroundTargetX[index] = targetX
        backgroundTargetY[index] = targetY
        backgroundTargetZ[index] = targetZ
        backgroundSpeed[index] = 0.12 + Math.random() * 0.15
        backgroundOffsets[index] = Math.random() * Math.PI * 2
        backgroundAmplitudes[index] = 0.35 + Math.random() * 0.55
        backgroundSizes[index] = 0.9 + Math.random() * 1.6
        backgroundProgress[index] = randomizeProgress ? Math.random() * 0.45 : 0

        const idx = index * 3
        const eased = easeOutCubic(backgroundProgress[index])
        const swirlStrength = (1 - eased) * 0.65
        const angle = backgroundOffsets[index] + currentTime * 0.35
        const swirlX = Math.cos(angle) * backgroundAmplitudes[index] * swirlStrength
        const swirlY = Math.sin(angle + Math.PI / 2) * backgroundAmplitudes[index] * 0.45 * swirlStrength
        const swirlZ = Math.sin(angle) * backgroundAmplitudes[index] * 0.25 * swirlStrength

        backgroundPositions[idx] = THREE.MathUtils.lerp(startX, targetX, eased) + swirlX
        backgroundPositions[idx + 1] = THREE.MathUtils.lerp(startY, targetY, eased) + swirlY
        backgroundPositions[idx + 2] = THREE.MathUtils.lerp(startZ, targetZ, eased) + swirlZ
      }

      for (let k = 0; k < backgroundParticleCount; k++) {
        assignBackgroundParticle(k, true, 0)
      }

      backgroundGeometry.setAttribute("position", new THREE.BufferAttribute(backgroundPositions, 3))
      const backgroundSizeAttribute = new THREE.BufferAttribute(backgroundSizes, 1)
      backgroundGeometry.setAttribute("aSize", backgroundSizeAttribute)
      for (let k = 0; k < backgroundParticleCount; k++) {
        backgroundSizeAttribute.setX(k, backgroundSizes[k])
      }
      backgroundSizeAttribute.needsUpdate = true

      backgroundMaterial = new THREE.PointsMaterial({
        size: 0.012,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.45,
        color: new THREE.Color(0.75, 0.76, 0.78),
        depthWrite: false,
      })
      backgroundMaterial.onBeforeCompile = (shader: MaterialShader) => {
        shader.vertexShader = shader.vertexShader
          .replace("#include <common>", '#include <common>\nattribute float aSize;')
          .replace("gl_PointSize = size;", "gl_PointSize = size * aSize;")
      }

      const backgroundPoints = new THREE.Points(backgroundGeometry, backgroundMaterial)
      scene.add(backgroundPoints)

      const points = new THREE.Points(geometry, material)
      scene.add(points)
      const initialCameraZ = 5.2
      camera.position.set(0, 0, initialCameraZ)

      sceneRef.current = {
        scene,
        camera,
        renderer,
        points,
        geometry,
        originalPositions,
        velocities,
        phases,
        backgroundPoints,
        backgroundGeometry,
        backgroundStartX,
        backgroundStartY,
        backgroundStartZ,
        backgroundTargetX,
        backgroundTargetY,
        backgroundTargetZ,
        backgroundProgress,
        backgroundSpeed,
        backgroundOffsets,
        backgroundAmplitudes,
        backgroundSizes,
        backgroundSizeAttribute,
        intersectionPoint: null,
        rotationX: 0,
        rotationY: 0,
        isDragging: false,
        previousMouseX: 0,
        previousMouseY: 0,
        particleCount: finalParticleCount,
        backgroundParticleCount,
      }

      const handleResize = () => {
        if (!sceneRef.current || !canvas.parentElement) return
        const { camera: activeCamera, renderer: activeRenderer } = sceneRef.current
        const newWidth = canvas.parentElement.clientWidth
        const newHeight = canvas.parentElement.clientHeight

        activeCamera.aspect = newWidth / newHeight
        activeCamera.updateProjectionMatrix()
        activeRenderer.setSize(newWidth, newHeight)
        activeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      }

      window.addEventListener("resize", handleResize)
      cleanupCallbacks.push(() => window.removeEventListener("resize", handleResize))

      const handleMouseMoveInteraction = (event: MouseEvent) => {
        if (!sceneRef.current || !parentElement) return
        const rect = parentElement.getBoundingClientRect()
        const offsetX = event.clientX - rect.left
        const offsetY = event.clientY - rect.top

        mouse.x = (offsetX / parentElement.clientWidth) * 2 - 1
        mouse.y = -(offsetY / parentElement.clientHeight) * 2 + 1

        raycaster.setFromCamera(mouse, camera)
        const intersect = new THREE.Vector3()
        if (raycaster.ray.intersectPlane(plane, intersect)) {
          sceneRef.current.intersectionPoint = intersect
        }
      }

      const handleMouseLeave = () => {
        if (sceneRef.current) {
          sceneRef.current.intersectionPoint = null
        }
      }

      canvas.addEventListener("mousemove", handleMouseMoveInteraction)
      canvas.addEventListener("mouseleave", handleMouseLeave)
      cleanupCallbacks.push(() => {
        canvas.removeEventListener("mousemove", handleMouseMoveInteraction)
        canvas.removeEventListener("mouseleave", handleMouseLeave)
      })

      let previousTime = 0

      const animate = (timestamp: number) => {
        if (!sceneRef.current) return
        const activeRenderer = sceneRef.current.renderer
        const activeScene = sceneRef.current.scene
        const elapsedTime = timestamp * 0.001
        const deltaTime = previousTime ? Math.min(Math.max(elapsedTime - previousTime, 0), 0.05) : 0
        previousTime = elapsedTime

        const {
          geometry: activeGeometry,
          points,
          originalPositions,
          velocities,
          phases,
          backgroundGeometry,
          backgroundStartX,
          backgroundStartY,
          backgroundStartZ,
          backgroundTargetX,
          backgroundTargetY,
          backgroundTargetZ,
          backgroundProgress,
          backgroundSpeed,
          backgroundOffsets,
          backgroundAmplitudes,
          backgroundSizes,
          backgroundSizeAttribute,
          intersectionPoint,
          rotationX,
          rotationY,
          particleCount,
          backgroundParticleCount,
        } = sceneRef.current

        const backgroundPositionAttribute = backgroundGeometry.getAttribute("position") as THREE.BufferAttribute
        const positionAttribute = activeGeometry.getAttribute("position") as THREE.BufferAttribute

        const radiusSwirl = 0.009
        const angularSpeed = 1
        const effectRadius = 0.5
        const repelStrength = 0.035
        const attractStrength = 0.05
        const damping = 0.95

        points.rotation.y += (rotationY - points.rotation.y) * 0.1
        points.rotation.x += (rotationX - points.rotation.x) * 0.1

        const euler = new THREE.Euler(points.rotation.x, points.rotation.y, points.rotation.z, "XYZ")
        const inverseQuaternion = new THREE.Quaternion().setFromEuler(euler).invert()

        let localIntersection: THREE.Vector3 | null = null
        if (intersectionPoint) {
          localIntersection = intersectionPoint.clone().applyQuaternion(inverseQuaternion)
        }

        let sizeNeedsUpdate = false

        for (let j = 0; j < backgroundParticleCount; j++) {
          let progress = backgroundProgress[j] + backgroundSpeed[j] * deltaTime

          if (progress >= 1) {
            assignBackgroundParticle(j, false, elapsedTime)
            backgroundSizeAttribute.setX(j, backgroundSizes[j])
            sizeNeedsUpdate = true
            continue
          }

          backgroundProgress[j] = progress

          const eased = easeOutCubic(progress)
          const startX = backgroundStartX[j]
          const startY = backgroundStartY[j]
          const startZ = backgroundStartZ[j]
          const targetX = backgroundTargetX[j]
          const targetY = backgroundTargetY[j]
          const targetZ = backgroundTargetZ[j]

          const swirlStrength = (1 - eased) * 0.6
          const angle = backgroundOffsets[j] + elapsedTime * 0.45
          const swirlX = Math.cos(angle) * backgroundAmplitudes[j] * swirlStrength
          const swirlY = Math.sin(angle + Math.PI / 2) * backgroundAmplitudes[j] * 0.42 * swirlStrength
          const swirlZ = Math.sin(angle) * backgroundAmplitudes[j] * 0.18 * swirlStrength

          backgroundPositionAttribute.setXYZ(
            j,
            THREE.MathUtils.lerp(startX, targetX, eased) + swirlX,
            THREE.MathUtils.lerp(startY, targetY, eased) + swirlY,
            THREE.MathUtils.lerp(startZ, targetZ, eased) + swirlZ,
          )
        }

        backgroundPositionAttribute.needsUpdate = true
        if (sizeNeedsUpdate) {
          backgroundSizeAttribute.needsUpdate = true
        }

        for (let j = 0; j < particleCount; j++) {
          const idx = j * 3
          const ox = originalPositions[idx]
          const oy = originalPositions[idx + 1]
          const oz = originalPositions[idx + 2]

          const theta = angularSpeed * elapsedTime + phases[j]
          const swirlDx = radiusSwirl * Math.cos(theta)
          const swirlDy = radiusSwirl * Math.sin(theta)

          const targetX = ox + swirlDx
          const targetY = oy + swirlDy
          const targetZ = oz

          let px = positionAttribute.getX(j)
          let py = positionAttribute.getY(j)
          let pz = positionAttribute.getZ(j)

          let vx = velocities[idx]
          let vy = velocities[idx + 1]
          let vz = velocities[idx + 2]

          if (localIntersection) {
            const dx = px - localIntersection.x
            const dy = py - localIntersection.y
            const dz = pz - localIntersection.z
            const distSq = dx * dx + dy * dy + dz * dz
            const dist = Math.sqrt(distSq)

            if (distSq < effectRadius * effectRadius && distSq > 0.0001) {
              const force = (1 - dist / effectRadius) * repelStrength
              vx += (dx / dist) * force
              vy += (dy / dist) * force
              vz += (dz / dist) * force
            }
          }

          const attractDx = targetX - px
          const attractDy = targetY - py
          const attractDz = targetZ - pz
          vx += attractDx * attractStrength
          vy += attractDy * attractStrength
          vz += attractDz * attractStrength

          vx *= damping
          vy *= damping
          vz *= damping

          px += vx
          py += vy
          pz += vz

          positionAttribute.setXYZ(j, px, py, pz)

          velocities[idx] = vx
          velocities[idx + 1] = vy
          velocities[idx + 2] = vz
        }

        positionAttribute.needsUpdate = true

        activeRenderer.render(activeScene, sceneRef.current.camera)
        animationId = requestAnimationFrame(animate)
      }

      animationId = requestAnimationFrame(animate)
    }

    initialize()

    return () => {
      disposed = true
      cleanupCallbacks.forEach((fn) => fn())
      cancelAnimationFrame(animationId)
      geometry?.dispose()
      material?.dispose()
      backgroundMaterial?.dispose()
      circleTexture?.dispose()
      if (sceneRef.current) {
        sceneRef.current.scene.remove(sceneRef.current.backgroundPoints)
        sceneRef.current.backgroundGeometry.dispose()
      }
      renderer?.dispose()
      sceneRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!onEnter) return

    hasTriggeredScrollRef.current = false

    const handleWheel = (event: WheelEvent) => {
      if (hasTriggeredScrollRef.current) return

      const scrollThreshold = 40
      if (event.deltaY > scrollThreshold) {
        hasTriggeredScrollRef.current = true
        setIsTransitioning(true)
        transitionTimeoutRef.current = window.setTimeout(() => {
          transitionTimeoutRef.current = null
          onEnter?.()
        }, 550)
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => {
      window.removeEventListener("wheel", handleWheel)
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current)
        transitionTimeoutRef.current = null
      }
    }
  }, [onEnter])

  const resetOrientation = () => {
    if (!sceneRef.current) return
    sceneRef.current.rotationX = 0
    sceneRef.current.rotationY = 0
    sceneRef.current.isDragging = false
    sceneRef.current.points.rotation.set(0, 0, 0)
  }

  const handleMouseDown = (event: ReactMouseEvent) => {
    if (!sceneRef.current) return
    if (event.button === 1) {
      event.preventDefault()
      resetOrientation()
      return
    }
    if (event.button !== 0) return
    sceneRef.current.isDragging = true
    sceneRef.current.previousMouseX = event.clientX
    sceneRef.current.previousMouseY = event.clientY
  }

  const handleMouseMove = (event: ReactMouseEvent) => {
    if (!sceneRef.current || !sceneRef.current.isDragging) return

    const deltaX = event.clientX - sceneRef.current.previousMouseX
    const deltaY = event.clientY - sceneRef.current.previousMouseY

    sceneRef.current.rotationY -= deltaX * 0.005
    sceneRef.current.rotationX -= deltaY * 0.005

    sceneRef.current.previousMouseX = event.clientX
    sceneRef.current.previousMouseY = event.clientY
  }

  const handleMouseUp = () => {
    if (sceneRef.current) {
      sceneRef.current.isDragging = false
    }
  }

  const handleTouchStart = (event: ReactTouchEvent) => {
    if (!sceneRef.current) return
    sceneRef.current.isDragging = true
    sceneRef.current.previousMouseX = event.touches[0].clientX
    sceneRef.current.previousMouseY = event.touches[0].clientY
  }

  const handleTouchMove = (event: ReactTouchEvent) => {
    if (!sceneRef.current || !sceneRef.current.isDragging) return

    const deltaX = event.touches[0].clientX - sceneRef.current.previousMouseX
    const deltaY = event.touches[0].clientY - sceneRef.current.previousMouseY

    sceneRef.current.rotationY -= deltaX * 0.005
    sceneRef.current.rotationX -= deltaY * 0.005

    sceneRef.current.previousMouseX = event.touches[0].clientX
    sceneRef.current.previousMouseY = event.touches[0].clientY
  }

  const handleTouchEnd = () => {
    if (sceneRef.current) {
      sceneRef.current.isDragging = false
    }
  }

  return (
    <div
      className="relative w-full h-screen bg-black text-white"
      style={{
        fontFamily: '"Noto Serif SC", "Source Han Serif SC", "Songti SC", "STSong", serif',
        opacity: isTransitioning ? 0 : 1,
        transform: isTransitioning ? "translateY(-4vh)" : "translateY(0)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="mt-[50rem] flex max-w-5xl flex-col items-center gap-45 px-6 pb-60 text-white pointer-events-auto">
          <button
            aria-label="Scroll down to enter"
            className={`inline-flex min-w-[150px] items-center justify-center gap-2 rounded-[14px] border border-white/20 bg-white/75 px-7 py-4 text-lg font-semibold tracking-[0.02em] text-black transition-colors duration-200 hover:bg-white/65 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 backdrop-blur-sm ${
              feedbackActive ? "welcome-return-feedback" : ""
            }`}
          >
            <span
              className="inline-block font-serif leading-none tracking-[0.15em]"
              style={{ fontFamily: '"Noto Serif SC", "Source Han Serif SC", "Songti SC", serif' }}
            >
              滑动滚轮进入
            </span>
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 text-black"
            >
              <path
                d="M8 2.75v10.5m0 0 4-4m-4 4-4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="w-full text-base tracking-wide text-white/60">
            <div className="flex flex-nowrap items-center justify-center gap-14 text-lg sm:text-xl whitespace-nowrap">
              {personalInfo.map((item, index) => (
                <Fragment key={item.label}>
                  <div className="flex items-center gap-3 whitespace-nowrap">
                    <span className="font-medium text-white/70">{item.label}：</span>
                    <span className="text-white">{item.value}</span>
                  </div>
                  {index < personalInfo.length - 1 ? <span className="mx-2 text-white/40">|</span> : null}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes welcome-return-shake {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          20% {
            transform: translate3d(0, -6px, 0);
          }
          40% {
            transform: translate3d(0, 6px, 0);
          }
          60% {
            transform: translate3d(0, -4px, 0);
          }
          80% {
            transform: translate3d(0, 3px, 0);
          }
        }
        .welcome-return-feedback {
          animation: welcome-return-shake 0.7s ease both;
        }
      `}</style>
    </div>
  )
}
