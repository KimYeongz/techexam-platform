import { cn } from '@/lib/utils'

interface BadgeProps {
    children: React.ReactNode
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
    size?: 'sm' | 'md'
    className?: string
}

export function Badge({
    children,
    variant = 'default',
    size = 'sm',
    className
}: BadgeProps) {
    const variants = {
        default: 'bg-slate-100 text-slate-700',
        success: 'bg-emerald-100 text-emerald-700',
        warning: 'bg-amber-100 text-amber-700',
        danger: 'bg-red-100 text-red-700',
        info: 'bg-blue-100 text-blue-700'
    }

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm'
    }

    return (
        <span className={cn(
            'inline-flex items-center rounded-full font-medium',
            variants[variant],
            sizes[size],
            className
        )}>
            {children}
        </span>
    )
}

interface DifficultyBadgeProps {
    difficulty: 'easy' | 'medium' | 'hard'
    className?: string
}

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
    const config = {
        easy: { label: 'ง่าย', variant: 'success' as const },
        medium: { label: 'กลาง', variant: 'warning' as const },
        hard: { label: 'ยาก', variant: 'danger' as const }
    }

    const { label, variant } = config[difficulty]

    return (
        <Badge variant={variant} className={className}>
            {label}
        </Badge>
    )
}

interface TagBadgeProps {
    tag: string
    className?: string
}

export function TagBadge({ tag, className }: TagBadgeProps) {
    return (
        <Badge variant="info" className={className}>
            {tag}
        </Badge>
    )
}
