'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TranslationState {
    isEnabled: boolean
    translations: Record<string, string>
    isLoading: Record<string, boolean>
    toggle: () => void
    translate: (text: string) => Promise<string>
    clearCache: () => void
}

// Simple hash function for cache keys
const hashText = (text: string): string => {
    let hash = 0
    for (let i = 0; i < Math.min(text.length, 50); i++) {
        hash = ((hash << 5) - hash) + text.charCodeAt(i)
        hash |= 0
    }
    return `t_${hash}`
}

// Translate using free Google Translate API
async function translateToEnglish(text: string): Promise<string> {
    try {
        const encodedText = encodeURIComponent(text)
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=th&tl=en&dt=t&q=${encodedText}`

        const response = await fetch(url)
        const data = await response.json()

        // Extract translated text from response
        if (data && data[0]) {
            let translatedText = ''
            for (const part of data[0]) {
                if (part[0]) {
                    translatedText += part[0]
                }
            }
            return translatedText
        }
        return text
    } catch (error) {
        console.error('Translation error:', error)
        return text
    }
}

export const useTranslation = create<TranslationState>()(
    persist(
        (set, get) => ({
            isEnabled: false,
            translations: {},
            isLoading: {},

            toggle: () => set(state => ({ isEnabled: !state.isEnabled })),

            translate: async (text: string) => {
                const key = hashText(text)
                const state = get()

                // Return cached translation if available
                if (state.translations[key]) {
                    return state.translations[key]
                }

                // If already loading, wait a bit and return original
                if (state.isLoading[key]) {
                    return text
                }

                // Set loading state
                set(state => ({
                    isLoading: { ...state.isLoading, [key]: true }
                }))

                // Translate
                const translated = await translateToEnglish(text)

                // Cache the result
                set(state => ({
                    translations: { ...state.translations, [key]: translated },
                    isLoading: { ...state.isLoading, [key]: false }
                }))

                return translated
            },

            clearCache: () => set({ translations: {}, isLoading: {} })
        }),
        {
            name: 'techexam-translation',
            partialize: (state) => ({
                isEnabled: state.isEnabled,
                translations: state.translations
            })
        }
    )
)
