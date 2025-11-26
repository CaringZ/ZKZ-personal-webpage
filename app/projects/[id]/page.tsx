import { projects } from "@/lib/projects-data"
import { ProjectDetailClient } from "@/components/projects/project-detail-client"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  return <ProjectDetailClient project={project} />
}