'use client'

import { Languages } from 'lucide-react'
import { useTranslation } from '@/lib/useTranslation'
import { cn } from '@/lib/utils'

export function TranslateButton() {
    const { isEnabled, toggle } = useTranslation()

    return (
        <button
            onClick={toggle}
            className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 text-sm font-medium',
                isEnabled
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
            title={isEnabled ? 'ปิดการแปลภาษา' : 'เปิดการแปลภาษา'}
        >
            <Languages className="w-4 h-4" />
            <span className="hidden sm:inline">{isEnabled ? 'EN' : 'TH'}</span>
        </button>
    )
}
