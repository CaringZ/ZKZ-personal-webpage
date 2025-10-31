import { projects, projectTypeConfig } from "@/lib/projects-data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Calendar, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  const config = projectTypeConfig[project.type]

  return (
    <main className="projects-theme min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background">
      {/* 背景装饰 */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* 返回按钮 */}
        <Link href="/projects">
          <Button variant="ghost" className="mb-8 group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            返回技能树
          </Button>
        </Link>

        {/* 项目头部 */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{config.icon}</span>
            <div>
              <Badge variant="secondary" className="mb-2">
                {config.label}
              </Badge>
              <h1 className="text-4xl font-bold text-balance">{project.title}</h1>
            </div>
          </div>

          <p className="text-xl text-muted-foreground leading-relaxed mt-6">{project.description}</p>
        </div>

        {/* 项目信息卡片 */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* 基本信息 */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              项目信息
            </h2>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">开发年份:</span>
                <span className="font-medium">{project.year}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">状态:</span>
                <Badge variant={project.status === "active" ? "default" : "secondary"}>
                  {project.status === "active" ? "活跃" : project.status === "completed" ? "已完成" : "已归档"}
                </Badge>
              </div>
            </div>

            {/* 链接 */}
            <div className="flex gap-3 pt-4">
              {project.link && (
                <Button asChild variant="default" className="flex-1">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    访问项目
                  </a>
                </Button>
              )}
              {project.github && (
                <Button asChild variant="outline" className="flex-1 bg-transparent">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    源代码
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* 技术栈 */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">技术栈</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* 项目详情 */}
        <div className="bg-card border border-border rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-6">项目详情</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h3>项目概述</h3>
            <p className="leading-relaxed">{project.description}</p>

            <h3>主要特性</h3>
            <ul className="space-y-2">
              <li>现代化的用户界面设计</li>
              <li>响应式布局，支持多种设备</li>
              <li>高性能优化，流畅的用户体验</li>
              <li>完善的错误处理和日志记录</li>
            </ul>

            <h3>技术亮点</h3>
            <p className="leading-relaxed">
              本项目采用了最新的技术栈和最佳实践，注重代码质量和可维护性。
              通过模块化设计和组件化开发，确保了项目的可扩展性和灵活性。
            </p>

            <h3>未来规划</h3>
            <p className="leading-relaxed">
              持续优化性能，添加更多实用功能，改进用户体验，并保持与最新技术的同步更新。
            </p>
          </div>
        </div>

        {/* 相关项目 */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">相关项目</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {projects
              .filter((p) => p.id !== project.id && p.type === project.type)
              .slice(0, 3)
              .map((relatedProject) => {
                const relatedConfig = projectTypeConfig[relatedProject.type]
                return (
                  <Link
                    key={relatedProject.id}
                    href={`/projects/${relatedProject.id}`}
                    className="group bg-card border border-border rounded-xl p-6 hover:border-primary transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="text-4xl mb-3">{relatedConfig.icon}</div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {relatedProject.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{relatedProject.description}</p>
                  </Link>
                )
              })}
          </div>
        </div>
      </div>
    </main>
  )
}
