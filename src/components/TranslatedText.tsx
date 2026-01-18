'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '@/lib/useTranslation'
import { Loader2 } from 'lucide-react'

interface TranslatedTextProps {
    text: string
    className?: string
    showOriginal?: boolean
}

export function TranslatedText({ text, className = '', showOriginal = true }: TranslatedTextProps) {
    const { isEnabled, translate } = useTranslation()
    const [translatedText, setTranslatedText] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (isEnabled && text) {
            setIsLoading(true)
            translate(text).then(result => {
                setTranslatedText(result)
                setIsLoading(false)
            })
        }
    }, [isEnabled, text, translate])

    if (!isEnabled) {
        return <span className={className}>{text}</span>
    }

    return (
        <span className={className}>
            {showOriginal && (
                <span className="block text-slate-500 text-sm mb-1">{text}</span>
            )}
            {isLoading ? (
                <span className="inline-flex items-center gap-1 text-primary-600">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span className="text-sm">กำลังแปล...</span>
                </span>
            ) : (
                <span className="block text-primary-700 font-medium">
                    🌐 {translatedText || text}
                </span>
            )}
        </span>
    )
}
