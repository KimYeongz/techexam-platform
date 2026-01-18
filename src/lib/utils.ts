import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function formatDate(date: Date | string): string {
    const d = new Date(date)
    return d.toLocaleDateString('th-TH', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })
}

export function formatDateTime(date: Date | string): string {
    const d = new Date(date)
    return d.toLocaleDateString('th-TH', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export function calculateScore(correct: number, total: number): number {
    return Math.round((correct / total) * 100)
}

export function getScoreGrade(score: number): {
    grade: string
    label: string
    color: string
    emoji: string
} {
    if (score >= 90) {
        return { grade: 'A', label: 'ยอดเยี่ยม', color: 'text-emerald-600', emoji: '🏆' }
    } else if (score >= 75) {
        return { grade: 'B', label: 'ดีมาก', color: 'text-blue-600', emoji: '⭐' }
    } else if (score >= 60) {
        return { grade: 'C', label: 'พอใช้', color: 'text-amber-600', emoji: '✅' }
    } else if (score >= 40) {
        return { grade: 'D', label: 'ต้องปรับปรุง', color: 'text-orange-600', emoji: '⚠️' }
    } else {
        return { grade: 'F', label: 'ไม่ผ่าน', color: 'text-red-600', emoji: '❌' }
    }
}

export function getDifficultyLabel(difficulty: 'easy' | 'medium' | 'hard'): {
    label: string
    color: string
    bgClass: string
} {
    switch (difficulty) {
        case 'easy':
            return { label: 'ง่าย', color: 'text-emerald-700', bgClass: 'badge-easy' }
        case 'medium':
            return { label: 'กลาง', color: 'text-amber-700', bgClass: 'badge-medium' }
        case 'hard':
            return { label: 'ยาก', color: 'text-red-700', bgClass: 'badge-hard' }
    }
}

export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

export function getWeaknessLevel(wrongPercent: number): {
    level: string
    color: string
    emoji: string
} {
    if (wrongPercent > 40) {
        return { level: 'สูง', color: 'text-red-600', emoji: '🔴' }
    } else if (wrongPercent > 25) {
        return { level: 'ปานกลาง', color: 'text-orange-600', emoji: '🟠' }
    } else if (wrongPercent > 10) {
        return { level: 'ต่ำ', color: 'text-amber-600', emoji: '🟡' }
    } else {
        return { level: 'ดีมาก', color: 'text-emerald-600', emoji: '🟢' }
    }
}
