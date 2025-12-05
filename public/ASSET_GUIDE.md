# Showcase 资产放置指南

## 路径总览
- 插件（Sundry）：`public/showcase/plugins/<project-id>/`
- 成熟项目（Mature）：`public/showcase/mature/<project-id>/`
- 爱好项目（Hobby）：`public/showcase/hobby/<project-id>/`

> 建议素材使用 webp/png/jpg；视频使用 mp4/webm，同名视频优先于图片。

## 推荐尺寸（按展示比例）
- 插件：封面/轮播 16:9（1920×1080 或 1280×720）；Items 网格 3:2 或 4:3（1200×800 或 1400×1050）；Painpoint/Impact 16:9（1920×1080）。
- 成熟：蓝图 16:10 或 16:9（1800×1125 / 1920×1080，SVG 优先）；Tech Demo 16:9（1920×1080 或 1600×900）。
- 爱好：screen-recording 视频/海报 16:9（1920×1080）。
- 一般建议：WEBP 优先；透明/矢量感用 PNG，照片用 JPG；控制单张 <2MB。

## 插件区（Sundry）
通用命名：
- 痛点示意：`painpoint.png`
- 列表封面：`cover.png`
- 轮播（可选）：`gallery-01.png`, `gallery-02.png`...
- 对比：`impact-before.png`, `impact-after.png`
- 子项：放在 `items/`，文件名使用小写加中划线。

### plugin-1 (Comfy Controller)
```
public/showcase/plugins/plugin-1/
  cover.png
  gallery-01.png
  gallery-02.png
  gallery-03.png
  gallery-04.png
  painpoint.png
  impact-before.png
  impact-after.png
  items/
    controller-img2img.png
    controller-title-gen.png
    controller-text-proc.png
    controller-batch-img.png
```

### plugin-2 (ComfyUI-ZKZNodes)
```
public/showcase/plugins/plugin-2/
  cover.png
  painpoint.png
  impact-before.png
  impact-after.png
  items/
    node-counter.png
    node-queue.png
    node-switcher.png
    node-random.png
    node-processor.png
    node-crop-trans.png
    node-crop-resize.png
    node-crop-bw.png
    node-expand.png
    node-split.png
    node-isolate.png
    node-stretch.png
    node-img-switch.png
    node-load-batch.png
    node-load-rgba.png
    node-save-img.png
    node-save-cond.png
    node-save-txt.png
    node-read-seq.png
```

### plugin-3 (Lora)
```
public/showcase/plugins/plugin-3/
  cover.png
  painpoint.png
  impact-before.png
  impact-after.png
  items/
    cyberpunk-before.jpg
    cyberpunk-after.jpg
    watercolor-before.jpg
    watercolor-after.jpg
    mecha-before.jpg
    mecha-after.jpg
```

### plugin-5 (blender插件)
```
public/showcase/plugins/plugin-5/
  cover.png
  painpoint.png
  impact-before.png
  impact-after.png
  items/
    render-before.png  (或 scene-01.png 等)
    render-after.png
```

## 成熟项目（Mature）
组件读取：
- 架构蓝图：`blueprint.svg|png`
- 技术突破示意：`tech-demo-01.png`, `tech-demo-02.png`, ...（按 features 顺序）
- 可加 hero 背景：`hero-bg.png|mp4`（可选）

已建目录：
```
public/showcase/mature/project-1/
  blueprint.svg
  tech-demo-01.png
  tech-demo-02.png
  ...
public/showcase/mature/project-2/
  blueprint.svg
  tech-demo-01.png
  ...
```

## 爱好项目（Hobby）
组件读取：
- 屏幕录制视频：`screen-recording.mp4`（无视频时可用 `screen-recording.png` 作为 poster）

已建目录：
```
public/showcase/hobby/hobby-1/
  screen-recording.mp4
public/showcase/hobby/hobby-2/
  screen-recording.mp4
public/showcase/hobby/hobby-3/
  screen-recording.mp4
public/showcase/hobby/hobby-4/
  screen-recording.mp4
public/showcase/hobby/hobby-5/
  screen-recording.mp4
public/showcase/hobby/hobby-6/
  screen-recording.mp4   (可选海报 screen-recording.png)
```

## 放置步骤
1. 将素材按上方路径与文件名放入 `public/showcase/...`。
2. 有视频时保持与图片同名，组件会优先使用视频。
3. 如需新增项目，沿用同样的目录结构与命名，确保 `project.id` 一致。
