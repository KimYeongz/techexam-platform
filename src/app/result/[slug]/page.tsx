'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    ArrowLeft,
    ChevronDown,
    ChevronUp,
    Check,
    X,
    Home,
    RefreshCw,
    BookOpen
} from 'lucide-react'
import { cn, getDifficultyLabel } from '@/lib/utils'

interface PageProps {
    params: { slug: string }
}

interface Choice {
    label: string
    text: string
}

interface Question {
    id: number
    questionText: string
    difficulty: 'easy' | 'medium' | 'hard'
    tags: string[]
    choices: Choice[]
    correctAnswer: string
    explanation: string
    wrongReasons: Record<string, string>
}

interface QuizData {
    topicId: string
    topicName: string
    totalQuestions: number
    questions: Question[]
}

// Mock answers for demo - in real app, this would come from session/state
const mockAnswers: Record<number, string> = {}

export default function ResultPage({ params }: PageProps) {
    const [quizData, setQuizData] = useState<QuizData | null>(null)
    const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set())
    const [filter, setFilter] = useState<'all' | 'correct' | 'wrong'>('all')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadQuiz() {
            try {
                const response = await fetch(`/api/quiz/${params.slug}`)
                if (response.ok) {
                    const data = await response.json()
                    setQuizData(data)
                    // Generate random answers for demo
                    data.questions.forEach((q: Question) => {
                        mockAnswers[q.id] = ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]
                    })
                }
            } catch (error) {
                console.error('Failed to load quiz:', error)
            } finally {
                setLoading(false)
            }
        }
        loadQuiz()
    }, [params.slug])

    if (loading || !quizData) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
            </div>
        )
    }

    const toggleExpand = (id: number) => {
        setExpandedQuestions(prev => {
            const next = new Set(prev)
            if (next.has(id)) {
                next.delete(id)
            } else {
                next.add(id)
            }
            return next
        })
    }

    const expandAll = () => {
        setExpandedQuestions(new Set(quizData.questions.map(q => q.id)))
    }

    const collapseAll = () => {
        setExpandedQuestions(new Set())
    }

    // Calculate stats
    const results = quizData.questions.map(q => ({
        ...q,
        userAnswer: mockAnswers[q.id] || '',
        isCorrect: mockAnswers[q.id] === q.correctAnswer
    }))

    const correctCount = results.filter(r => r.isCorrect).length
    const wrongCount = results.length - correctCount

    const filteredResults = results.filter(r => {
        if (filter === 'correct') return r.isCorrect
        if (filter === 'wrong') return !r.isCorrect
        return true
    })

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="sticky top-0 z-50 glass border-b border-slate-200/50">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/topics"
                            className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="flex-1">
                            <h1 className="text-lg font-bold text-slate-900">เฉลยข้อสอบ</h1>
                            <p className="text-sm text-slate-500">{quizData.topicName}</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Score Summary */}
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white py-6">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-3xl font-bold">{correctCount}/{quizData.totalQuestions}</div>
                            <div className="text-primary-100">คะแนนที่ได้</div>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-center">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-1">
                                    <Check className="w-6 h-6" />
                                </div>
                                <div className="text-sm">{correctCount} ถูก</div>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-1">
                                    <X className="w-6 h-6" />
                                </div>
                                <div className="text-sm">{wrongCount} ผิด</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Actions */}
            <div className="bg-white border-b border-slate-100 sticky top-[72px] z-40">
                <div className="max-w-4xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={cn(
                                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                                    filter === 'all' ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                )}
                            >
                                ทั้งหมด ({results.length})
                            </button>
                            <button
                                onClick={() => setFilter('correct')}
                                className={cn(
                                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                                    filter === 'correct' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                )}
                            >
                                ✓ ถูก ({correctCount})
                            </button>
                            <button
                                onClick={() => setFilter('wrong')}
                                className={cn(
                                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                                    filter === 'wrong' ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                )}
                            >
                                ✗ ผิด ({wrongCount})
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={expandAll} className="text-sm text-primary-600 hover:underline">
                                ขยายทั้งหมด
                            </button>
                            <button onClick={collapseAll} className="text-sm text-slate-500 hover:underline">
                                ย่อทั้งหมด
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Questions List */}
            <main className="max-w-4xl mx-auto px-4 py-6">
                <div className="space-y-4">
                    {filteredResults.map((question, index) => {
                        const isExpanded = expandedQuestions.has(question.id)
                        const difficulty = getDifficultyLabel(question.difficulty)

                        return (
                            <div key={question.id} className="card overflow-hidden">
                                {/* Question Header */}
                                <button
                                    onClick={() => toggleExpand(question.id)}
                                    className="w-full p-4 flex items-start gap-4 text-left hover:bg-slate-50 transition-colors"
                                >
                                    {/* Status Icon */}
                                    <div className={cn(
                                        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                                        question.isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                                    )}>
                                        {question.isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                                    </div>

                                    {/* Question Text */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-medium text-slate-500">ข้อ {index + 1}</span>
                                            <span className={difficulty.bgClass}>{difficulty.label}</span>
                                        </div>
                                        <p className="text-slate-900 line-clamp-2">{question.questionText}</p>
                                    </div>

                                    {/* Expand Icon */}
                                    {isExpanded ? (
                                        <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                    )}
                                </button>

                                {/* Expanded Content */}
                                {isExpanded && (
                                    <div className="px-4 pb-4 border-t border-slate-100 pt-4">
                                        {/* Choices */}
                                        <div className="space-y-2 mb-4">
                                            {question.choices.map((choice) => {
                                                const isCorrectChoice = choice.label === question.correctAnswer
                                                const isUserChoice = choice.label === question.userAnswer

                                                return (
                                                    <div
                                                        key={choice.label}
                                                        className={cn(
                                                            'p-3 rounded-lg border-2 flex items-start gap-3',
                                                            isCorrectChoice && 'bg-emerald-50 border-emerald-300',
                                                            isUserChoice && !isCorrectChoice && 'bg-red-50 border-red-300',
                                                            !isCorrectChoice && !isUserChoice && 'border-slate-100'
                                                        )}
                                                    >
                                                        <span className={cn(
                                                            'flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center font-medium text-sm',
                                                            isCorrectChoice && 'bg-emerald-500 text-white',
                                                            isUserChoice && !isCorrectChoice && 'bg-red-500 text-white',
                                                            !isCorrectChoice && !isUserChoice && 'bg-slate-100 text-slate-600'
                                                        )}>
                                                            {choice.label}
                                                        </span>
                                                        <span className="flex-1">{choice.text}</span>
                                                        {isCorrectChoice && (
                                                            <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                                                        )}
                                                        {isUserChoice && !isCorrectChoice && (
                                                            <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        {/* Explanation */}
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <h4 className="font-medium text-blue-900 mb-2">💡 คำอธิบาย</h4>
                                            <p className="text-blue-800 text-sm leading-relaxed">
                                                {question.explanation}
                                            </p>
                                        </div>

                                        {/* Wrong Reason (if user got it wrong) */}
                                        {!question.isCorrect && question.wrongReasons[question.userAnswer] && (
                                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-3">
                                                <h4 className="font-medium text-orange-900 mb-2">⚠️ ทำไมตัวเลือก {question.userAnswer} ถึงผิด</h4>
                                                <p className="text-orange-800 text-sm leading-relaxed">
                                                    {question.wrongReasons[question.userAnswer]}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Action Buttons */}
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    <Link href={`/quiz/${params.slug}`} className="btn-primary justify-center">
                        <RefreshCw className="w-5 h-5" />
                        ทำใหม่
                    </Link>
                    <Link href={`/topics/${params.slug}`} className="btn-secondary justify-center">
                        <BookOpen className="w-5 h-5" />
                        อ่านสรุป
                    </Link>
                    <Link href="/topics" className="btn-secondary justify-center">
                        <Home className="w-5 h-5" />
                        หัวข้ออื่น
                    </Link>
                </div>
            </main>
        </div>
    )
}
