import type { Project } from '@/lib/types'
import { matureProjects } from './mature'
import { pluginProjects } from './plugin'
import { hobbyProjects } from './hobby'

export const projects: Project[] = [
    ...matureProjects,
    ...pluginProjects,
    ...hobbyProjects,
]

export { matureProjects, pluginProjects, hobbyProjects }
