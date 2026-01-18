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

export default function ResultPage({ params }: PageProps) {
    const [quizData, setQuizData] = useState<QuizData | null>(null)
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})
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

                    // Load answers from localStorage
                    const savedAnswers = localStorage.getItem(`quiz_answers_${params.slug}`)
                    if (savedAnswers) {
                        setUserAnswers(JSON.parse(savedAnswers))
                    }
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
            <div className="min-h-screen bg-black flex items-center justify-center">
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
        userAnswer: userAnswers[q.id] || '',
        isCorrect: userAnswers[q.id] === q.correctAnswer
    }))

    const correctCount = results.filter(r => r.isCorrect).length
    const wrongCount = results.length - correctCount

    const filteredResults = results.filter(r => {
        if (filter === 'correct') return r.isCorrect
        if (filter === 'wrong') return !r.isCorrect
        return true
    })

    return (
        <div className="min-h-screen bg-black text-slate-200 font-sans">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/topics"
                            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors p-2 -ml-2 hover:bg-white/5 rounded-full"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="flex-1">
                            <h1 className="text-lg font-bold text-white">เฉลยข้อสอบ</h1>
                            <p className="text-sm text-slate-400">{quizData.topicName}</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Score Summary */}
            <div className="bg-gradient-to-b from-primary-900/40 to-black/50 text-white py-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <div className="flex items-baseline gap-2 justify-center md:justify-start">
                                <span className="text-5xl font-bold tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{correctCount}</span>
                                <span className="text-2xl text-slate-400 font-light">/ {quizData.totalQuestions}</span>
                            </div>
                            <div className="text-primary-300 font-medium tracking-wide uppercase text-sm mt-1">คะแนนที่ได้</div>
                        </div>

                        <div className="flex gap-6">
                            <div className="glass-panel border-white/5 p-4 rounded-2xl flex flex-col items-center min-w-[100px] bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-2 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                                    <Check className="w-5 h-5" />
                                </div>
                                <div className="text-lg font-bold text-emerald-400">{correctCount}</div>
                                <div className="text-xs text-emerald-500/70 font-medium uppercase">ถูก</div>
                            </div>
                            <div className="glass-panel border-white/5 p-4 rounded-2xl flex flex-col items-center min-w-[100px] bg-red-500/5 hover:bg-red-500/10 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mb-2 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                                    <X className="w-5 h-5" />
                                </div>
                                <div className="text-lg font-bold text-red-400">{wrongCount}</div>
                                <div className="text-xs text-red-500/70 font-medium uppercase">ผิด</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Actions */}
            <div className="bg-black/90 backdrop-blur-xl border-b border-white/10 sticky top-[73px] z-40">
                <div className="max-w-4xl mx-auto px-4 py-3">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                            <button
                                onClick={() => setFilter('all')}
                                className={cn(
                                    'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap',
                                    filter === 'all'
                                        ? 'bg-primary-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'
                                )}
                            >
                                ทั้งหมด ({results.length})
                            </button>
                            <button
                                onClick={() => setFilter('correct')}
                                className={cn(
                                    'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap',
                                    filter === 'correct'
                                        ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'
                                )}
                            >
                                ✓ ถูก ({correctCount})
                            </button>
                            <button
                                onClick={() => setFilter('wrong')}
                                className={cn(
                                    'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap',
                                    filter === 'wrong'
                                        ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'
                                )}
                            >
                                ✗ ผิด ({wrongCount})
                            </button>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={expandAll} className="text-xs text-primary-400 hover:text-primary-300 transition-colors uppercase font-medium tracking-wide">
                                ขยายทั้งหมด
                            </button>
                            <button onClick={collapseAll} className="text-xs text-slate-500 hover:text-slate-400 transition-colors uppercase font-medium tracking-wide">
                                ย่อทั้งหมด
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Questions List */}
            <main className="max-w-4xl mx-auto px-4 py-8">
                <div className="space-y-4">
                    {filteredResults.map((question, index) => {
                        const isExpanded = expandedQuestions.has(question.id)
                        const difficulty = getDifficultyLabel(question.difficulty)

                        return (
                            <div key={question.id} className="glass-panel border-white/5 hover:border-white/10 transition-colors overflow-hidden rounded-2xl">
                                {/* Question Header */}
                                <button
                                    onClick={() => toggleExpand(question.id)}
                                    className="w-full p-5 flex items-start gap-4 text-left hover:bg-white/5 transition-colors group"
                                >
                                    {/* Status Icon */}
                                    <div className={cn(
                                        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg',
                                        question.isCorrect
                                            ? 'bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20'
                                            : 'bg-red-500/10 text-red-500 ring-1 ring-red-500/20'
                                    )}>
                                        {question.isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                    </div>

                                    {/* Question Text */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">ข้อ {index + 1}</span>
                                            <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border", difficulty.bgClass)}>
                                                {difficulty.label}
                                            </span>
                                        </div>
                                        <p className="text-slate-200 group-hover:text-white transition-colors line-clamp-2 md:line-clamp-none font-medium leading-relaxed">
                                            {question.questionText}
                                        </p>
                                    </div>

                                    {/* Expand Icon */}
                                    <div className="p-1 rounded-full bg-white/5 text-slate-500 Group-hover:text-white/80 transition-colors border border-white/5">
                                        {isExpanded ? (
                                            <ChevronUp className="w-4 h-4" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4" />
                                        )}
                                    </div>
                                </button>

                                {/* Expanded Content */}
                                {isExpanded && (
                                    <div className="px-5 pb-5 border-t border-white/5 pt-5 bg-black/20">
                                        {/* Choices */}
                                        <div className="space-y-3 mb-6">
                                            {question.choices.map((choice) => {
                                                const isCorrectChoice = choice.label === question.correctAnswer
                                                const isUserChoice = choice.label === question.userAnswer

                                                return (
                                                    <div
                                                        key={choice.label}
                                                        className={cn(
                                                            'p-4 rounded-xl border flex items-start gap-3 transition-all',
                                                            isCorrectChoice && 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]',
                                                            isUserChoice && !isCorrectChoice && 'bg-red-500/10 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.1)]',
                                                            !isCorrectChoice && !isUserChoice && 'bg-white/5 border-white/5 opacity-60'
                                                        )}
                                                    >
                                                        <span className={cn(
                                                            'flex-shrink-0 w-6 h-6 rounded flex items-center justify-center font-bold text-xs',
                                                            isCorrectChoice && 'bg-emerald-500 text-white',
                                                            isUserChoice && !isCorrectChoice && 'bg-red-500 text-white',
                                                            !isCorrectChoice && !isUserChoice && 'bg-white/10 text-slate-400'
                                                        )}>
                                                            {choice.label}
                                                        </span>
                                                        <span className={cn("flex-1 text-sm leading-relaxed",
                                                            isCorrectChoice ? "text-emerald-300" :
                                                                isUserChoice && !isCorrectChoice ? "text-red-300" : "text-slate-400"
                                                        )}>{choice.text}</span>
                                                        {isCorrectChoice && (
                                                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                                                        )}
                                                        {isUserChoice && !isCorrectChoice && (
                                                            <X className="w-5 h-5 text-red-500 flex-shrink-0 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        {/* Explanation */}
                                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5 relative overflow-hidden group/exp">
                                            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover/exp:opacity-100 transition-opacity" />
                                            <div className="flex items-center gap-2 mb-2 text-blue-400">
                                                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                    <span className="text-xs font-bold">i</span>
                                                </div>
                                                <h4 className="font-bold text-sm uppercase tracking-wide">คำอธิบาย</h4>
                                            </div>
                                            <p className="text-blue-200/90 text-sm leading-relaxed pl-8">
                                                {question.explanation}
                                            </p>
                                        </div>

                                        {/* Wrong Reason (if user got it wrong) */}
                                        {!question.isCorrect && question.wrongReasons && question.wrongReasons[question.userAnswer] && (
                                            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-5 mt-4 relative overflow-hidden group/wr">
                                                <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover/wr:opacity-100 transition-opacity" />
                                                <div className="flex items-center gap-2 mb-2 text-orange-400">
                                                    <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                                                        <span className="text-xs font-bold">!</span>
                                                    </div>
                                                    <h4 className="font-bold text-sm uppercase tracking-wide">ทำไมตัวเลือก {question.userAnswer} ถึงผิด</h4>
                                                </div>
                                                <p className="text-orange-200/90 text-sm leading-relaxed pl-8">
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
                <div className="mt-12 grid gap-4 sm:grid-cols-3">
                    <Link href={`/quiz/${params.slug}`} className="btn-primary justify-center h-12 shadow-lg shadow-primary-500/20">
                        <RefreshCw className="w-5 h-5" />
                        ทำใหม่
                    </Link>
                    <Link href={`/topics/${params.slug}`} className="btn-secondary justify-center h-12 border-white/5 hover:bg-white/5 text-slate-300">
                        <BookOpen className="w-5 h-5" />
                        อ่านสรุป
                    </Link>
                    <Link href="/topics" className="btn-secondary justify-center h-12 border-white/5 hover:bg-white/5 text-slate-300">
                        <Home className="w-5 h-5" />
                        หัวข้ออื่น
                    </Link>
                </div>
            </main>
        </div>
    )
}
