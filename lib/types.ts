export type ProjectType = "mature" | "plugin" | "hobby"

export interface Project {
    id: string
    title: string
    description: string
    type: ProjectType
    technologies: string[]
    year: string
    status: "active" | "completed" | "archived"
    link?: string
    github?: string

    // Mature Theme Specifics
    mature?: {
        tagline: string
        motivation: string // New field for "Why I made this"
        heroStats: { label: string; value: string; icon: string }[]
        architecture: {
            diagramNote: string
            techStack: { category: string; value: string }[]
        }
        features: {
            title: string
            subtitle: string
            desc: string
            stats: string[]
            icon: "Zap" | "Shield" | "Globe" | "Cpu" | "Activity" | "Layers"
        }[]
        impact: { label: string; value: string; desc: string }[]
    }

    // Plugin Theme Specifics
    plugin?: {
        colorTheme?: "orange" | "blue" | "purple" | "emerald" // New field for color theme
        painPoint: {
            title: string
            desc: string
            stats: string[]
        }
        pipeline: {
            input: string
            process: string
            output: string
        }
        installation: {
            npm?: string
            cmd?: string
        }
        // Layout Flags
        hasGlobalComparison?: boolean // Defaults to true if not specified
        gallery?: string[] // If present, renders a gallery section
        items?: {
            title: string
            desc: string
            tag: string
            command?: string
            image?: string // Placeholder for screenshot/demo (or "Before" image)
            comparisonImage?: string // If present, renders a Before/After slider for this item
            codeSnippet?: string // New field for code snippets
            problem?: string // Specific problem this item solves
            solution?: string // How it solves it
            features?: string[] // Key features/steps
            trainingImage?: string
            trainingThoughts?: string
        }[]
    }

    // Hobby Theme Specifics
    hobby?: {
        tagline?: string
        motivation?: string
        colorTheme?: "orange" | "blue" | "purple" | "emerald" // New field for color theme
        features?: {
            title: string
            desc: string
            icon: string // Lucide icon name
        }[]
        useCases?: {
            title: string
            pain: string
            solution: string
        }[]
        devLog: { status: "done" | "active" | "todo"; text: string }[]
    }

    // Development Insights & Pain Points (Available for all project types)
    insights?: {
        title: string
        content: string
    }[]
}
