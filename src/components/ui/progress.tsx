import { cn } from '@/lib/utils'

interface ProgressBarProps {
    value: number
    max?: number
    className?: string
    showLabel?: boolean
}

export function ProgressBar({
    value,
    max = 100,
    className,
    showLabel = false
}: ProgressBarProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
        <div className={cn('flex items-center gap-3', className)}>
            <div className="flex-1 progress-bar">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            {showLabel && (
                <span className="text-sm font-medium text-slate-600 min-w-[3rem] text-right">
                    {Math.round(percentage)}%
                </span>
            )}
        </div>
    )
}

interface ScoreCircleProps {
    score: number
    total: number
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

export function ScoreCircle({
    score,
    total,
    size = 'md',
    className
}: ScoreCircleProps) {
    const percentage = Math.round((score / total) * 100)
    const circumference = 2 * Math.PI * 45
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    const sizeClasses = {
        sm: 'w-16 h-16',
        md: 'w-24 h-24',
        lg: 'w-32 h-32'
    }

    const textSizes = {
        sm: 'text-lg',
        md: 'text-2xl',
        lg: 'text-4xl'
    }

    return (
        <div className={cn('relative', sizeClasses[size], className)}>
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-slate-200"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-500"
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn('font-bold text-slate-900', textSizes[size])}>
                    {percentage}%
                </span>
                {size !== 'sm' && (
                    <span className="text-xs text-slate-500">
                        {score}/{total}
                    </span>
                )}
            </div>
        </div>
    )
}
