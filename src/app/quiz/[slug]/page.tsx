'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    ArrowLeft,
    Clock,
    ChevronLeft,
    ChevronRight,
    X,
    Check,
    AlertCircle,
    HelpCircle
} from 'lucide-react'
import { cn, formatTime, getDifficultyLabel } from '@/lib/utils'
import { TranslateButton } from '@/components/TranslateButton'
import { TranslatedText } from '@/components/TranslatedText'
import { useSession } from 'next-auth/react'

// Quiz page component
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


export default function QuizPage({ params }: PageProps) {
    const { data: session } = useSession()
    const [quizData, setQuizData] = useState<QuizData | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [timeElapsed, setTimeElapsed] = useState(0)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [showExitConfirm, setShowExitConfirm] = useState(false)
    const [checkedQuestions, setCheckedQuestions] = useState<Set<number>>(new Set())
    const [loading, setLoading] = useState(true)

    // Load quiz data
    useEffect(() => {
        async function loadQuiz() {
            try {
                const response = await fetch(`/api/quiz/${params.slug}`)
                if (response.ok) {
                    const data = await response.json()
                    setQuizData(data)
                }
            } catch (error) {
                console.error('Failed to load quiz:', error)
            } finally {
                setLoading(false)
            }
        }
        loadQuiz()
    }, [params.slug])

    // Timer
    useEffect(() => {
        if (!isSubmitted && !isSaving && quizData) {
            const timer = setInterval(() => {
                setTimeElapsed(t => t + 1)
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [isSubmitted, isSaving, quizData])

    // ... (loading and error checks remain same) ...

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
                    <p className="text-slate-400 font-medium">กำลังโหลดข้อสอบ...</p>
                </div>
            </div>
        )
    }

    if (!quizData) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">ไม่พบข้อสอบ</h2>
                    <p className="text-slate-400 mb-6">ไม่พบข้อมูลข้อสอบสำหรับหัวข้อนี้</p>
                    <Link href="/topics" className="btn-primary w-full justify-center">
                        กลับหน้าหัวข้อ
                    </Link>
                </div>
            </div>
        )
    }

    const currentQuestion = quizData.questions[currentIndex]
    const totalQuestions = quizData.questions.length
    const progress = ((currentIndex + 1) / totalQuestions) * 100
    const selectedAnswer = answers[currentQuestion.id]
    const difficulty = getDifficultyLabel(currentQuestion.difficulty)
    const hasAnswered = !!answers[currentQuestion.id]



    const handleSelectAnswer = (label: string) => {
        if (!isSubmitted && !checkedQuestions.has(currentQuestion.id)) {
            setAnswers(prev => ({ ...prev, [currentQuestion.id]: label }))
        }
    }

    const handleCheckAnswer = () => {
        setCheckedQuestions(prev => new Set(prev).add(currentQuestion.id))
    }

    const handleNext = () => {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex(currentIndex + 1)
        }
    }

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }

    const calculateScore = () => {
        let correct = 0
        quizData.questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) {
                correct++
            }
        })
        return { correct, total: totalQuestions, percentage: Math.round((correct / totalQuestions) * 100) }
    }

    const handleSubmit = async () => {
        setIsSaving(true)

        // Calculate score immediately
        const score = calculateScore()

        // Save answers to localStorage for result page
        localStorage.setItem(`quiz_answers_${params.slug}`, JSON.stringify(answers))

        if (session) {
            try {
                // Save to API
                await fetch('/api/score', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        topicSlug: params.slug,
                        score: score.correct,
                        totalQuestions: score.total,
                        timeSeconds: timeElapsed
                    })
                })
            } catch (error) {
                console.error('Failed to save score:', error)
            }
        }

        setIsSubmitted(true)
        setIsSaving(false)
    }

    const handleGoToQuestion = (index: number) => {
        setCurrentIndex(index)
    }


    const isChecked = checkedQuestions.has(currentQuestion.id)
    const isCorrect = answers[currentQuestion.id] === currentQuestion.correctAnswer

    if (isSaving) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
                    <p className="text-slate-400 font-medium">กำลังบันทึกคะแนน...</p>
                </div>
            </div>
        )
    }

    if (isSubmitted) {
        const score = calculateScore()
        return (
            <div className="min-h-screen bg-black flex items-center justify-center py-12 text-slate-200">
                <div className="w-full max-w-2xl px-4">
                    <div className="glass-panel border-white/10 rounded-3xl shadow-2xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 to-transparent pointer-events-none" />

                        {/* Result Header */}
                        <div className="bg-black/50 text-white p-8 text-center relative overflow-hidden backdrop-blur-md">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-accent-600/20 opacity-90 blur-xl" />
                            <div className="relative z-10">
                                <h1 className="text-3xl font-bold mb-2">🎉 ยินดีด้วย!</h1>
                                <p className="text-slate-300">คุณทำข้อสอบ {quizData.topicName} เสร็จเรียบร้อยแล้ว</p>
                            </div>
                        </div>

                        {/* Score Card Content */}
                        <div className="p-8 relative z-10">
                            <div className="flex flex-col items-center mb-8">
                                <div className="relative w-40 h-40 mb-6">
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle
                                            className="text-white/5"
                                            strokeWidth="8"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="42"
                                            cx="50"
                                            cy="50"
                                        />
                                        <circle
                                            className="text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                                            strokeWidth="8"
                                            strokeDasharray={`${score.percentage * 2.64}, 264`}
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="42"
                                            cx="50"
                                            cy="50"
                                            transform="rotate(-90 50 50)"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                        <span className="text-4xl font-bold">{score.percentage}%</span>
                                        <span className="text-xs text-slate-400 font-medium uppercase">คะแนน</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 w-full justify-center">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-white">{score.correct}/{score.total}</div>
                                        <div className="text-sm text-slate-400">ข้อที่ถูก</div>
                                    </div>
                                    <div className="w-px h-10 bg-white/10" />
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-white">{formatTime(timeElapsed)}</div>
                                        <div className="text-sm text-slate-400">เวลาที่ใช้</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-sm shadow-emerald-500/10">
                                        <Check className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-emerald-500">{score.correct}</div>
                                        <div className="text-xs text-emerald-400/80 font-medium">ถูกต้อง</div>
                                    </div>
                                </div>
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 shadow-sm shadow-red-500/10">
                                        <X className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-red-500">{score.total - score.correct}</div>
                                        <div className="text-xs text-red-400/80 font-medium">ไม่ถูกต้อง</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Link href={`/result/${params.slug}`} className="btn-primary w-full justify-center h-12 text-lg shadow-lg shadow-primary-500/20">
                                    ดูเฉลยละเอียด
                                </Link>
                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={() => window.location.reload()} className="btn-secondary w-full justify-center border-white/5 hover:bg-white/5 text-slate-300">
                                        ทำใหม่
                                    </button>
                                    <Link href="/topics" className="btn-secondary w-full justify-center border-white/5 hover:bg-white/5 text-slate-300">
                                        กลับหน้าหลัก
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black flex flex-col font-sans text-slate-200">
            {/* Header - Dark Focus Mode */}
            <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 text-white transition-all duration-300">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowExitConfirm(true)}
                            className="p-2 -ml-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="font-semibold text-white hidden sm:block tracking-wide">{quizData.topicName}</h1>
                            <div className="text-xs text-slate-400 font-medium tracking-wider uppercase sm:hidden">Quiz</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 text-slate-300 bg-white/10 px-3 py-1.5 rounded-full text-sm font-medium border border-white/5 shadow-inner">
                            <Clock className="w-4 h-4" />
                            <span className="font-mono">{formatTime(timeElapsed)}</span>
                        </div>
                        <TranslateButton />
                    </div>
                </div>
                {/* Progress bar */}
                <div className="h-1 bg-white/5 w-full overflow-hidden">
                    <div
                        className="h-full bg-primary-500 transition-all duration-500 ease-out rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.5)] relative overflow-hidden"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute inset-0 bg-white/20 w-full animate-shimmer" />
                    </div>
                </div>
            </header>

            {/* Question Area */}
            <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 pb-32">
                {/* Status Bar */}
                <div className="flex items-center justify-between mb-8">
                    <span className="text-sm font-medium text-slate-400 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full shadow-sm">
                        ข้อที่ <span className="text-white font-bold">{currentIndex + 1}</span> <span className="text-slate-500 mx-1">/</span> {totalQuestions}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border shadow-sm", difficulty.bgClass)}>
                            {difficulty.label}
                        </span>
                    </div>
                </div>

                {/* Question Text */}
                <div className="mb-8">
                    <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed mb-6 drop-shadow-sm">
                        <TranslatedText text={currentQuestion.questionText} />
                    </h2>
                    {currentQuestion.tags && currentQuestion.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {currentQuestion.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="text-xs text-slate-400 bg-white/5 border border-white/10 px-2 py-1 rounded-md hover:bg-white/10 transition-colors cursor-default">#{tag}</span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Choices */}
                <div className="flex flex-col gap-3 mb-8">
                    {currentQuestion.choices.map((choice) => {
                        const isSelected = selectedAnswer === choice.label;
                        const isCorrectAnswer = choice.label === currentQuestion.correctAnswer;
                        const isCheckedAndWrong = isChecked && isSelected && !isCorrectAnswer;
                        const isCheckedAndCorrect = isChecked && isCorrectAnswer;

                        let cardClass = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20";
                        let indicatorClass = "bg-white/10 text-slate-400";
                        let textClass = "text-slate-300";

                        if (isChecked) {
                            if (isCorrectAnswer) {
                                cardClass = "bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]";
                                indicatorClass = "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20";
                                textClass = "text-white";
                            } else if (isCheckedAndWrong) {
                                cardClass = "bg-red-500/10 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]";
                                indicatorClass = "bg-red-500 text-white shadow-lg shadow-red-500/20";
                                textClass = "text-white";
                            } else {
                                cardClass = "bg-black/40 border-white/5 opacity-50 grayscale";
                            }
                        } else if (isSelected) {
                            cardClass = "bg-primary-500/10 border-primary-500 ring-1 ring-primary-500 shadow-[0_0_15px_rgba(99,102,241,0.2)] scale-[1.01]";
                            indicatorClass = "bg-primary-500 text-white shadow-lg shadow-primary-500/30";
                            textClass = "text-white";
                        }

                        return (
                            <button
                                key={choice.label}
                                onClick={() => handleSelectAnswer(choice.label)}
                                disabled={isChecked}
                                className={cn(
                                    "relative w-full text-left p-4 rounded-xl border transition-all duration-200 group flex items-start gap-4",
                                    cardClass
                                )}
                            >
                                <div className={cn(
                                    "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-200",
                                    indicatorClass
                                )}>
                                    {choice.label}
                                </div>
                                <div className={cn("flex-1 pt-1 font-medium transition-colors", textClass)}>
                                    <TranslatedText text={choice.text} showOriginal={false} />
                                </div>

                                {isCheckedAndCorrect && <Check className="w-6 h-6 text-emerald-500 absolute right-4 top-4 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
                                {isCheckedAndWrong && <X className="w-6 h-6 text-red-500 absolute right-4 top-4 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />}
                            </button>
                        );
                    })}
                </div>

                {/* Explanation (Feedback) */}
                {isChecked && (
                    <div className={cn(
                        "rounded-2xl p-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 border relative overflow-hidden",
                        isCorrect ? "bg-emerald-500/10 border-emerald-500/30" : "bg-red-500/10 border-red-500/30"
                    )}>
                        <div className={cn("absolute inset-0 opacity-20 pointer-events-none", isCorrect ? "bg-emerald-500/5" : "bg-red-500/5")} />

                        <div className="flex items-center gap-3 mb-3 relative z-10">
                            <div className={cn("p-2 rounded-full shadow-inner", isCorrect ? "bg-emerald-500/20 text-emerald-500" : "bg-red-500/20 text-red-500")}>
                                {isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                            </div>
                            <h3 className={cn("font-bold text-lg", isCorrect ? "text-emerald-400" : "text-red-400")}>
                                {isCorrect ? "ยอดเยี่ยม! ถูกต้อง" : "ยังไม่ถูก ลองดูคำอธิบายนะ"}
                            </h3>
                        </div>
                        <div className="text-slate-300 leading-relaxed pl-[3.25rem] relative z-10">
                            <TranslatedText text={currentQuestion.explanation} />
                        </div>
                    </div>
                )}
            </main>

            {/* Bottom Navigation */}
            <footer className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 z-40 safe-area-bottom">
                <div className="max-w-3xl mx-auto flex items-center gap-4">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-white/5"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="flex-1">
                        {!isChecked ? (
                            <button
                                onClick={handleCheckAnswer}
                                disabled={!selectedAnswer}
                                className="btn-primary w-full h-12 text-lg font-medium shadow-lg shadow-primary-500/20 disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                ตรวจคำตอบ
                            </button>
                        ) : (
                            currentIndex === totalQuestions - 1 ? (
                                <button
                                    onClick={handleSubmit}
                                    className="w-full h-12 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors shadow-lg flex items-center justify-center gap-2 border border-white/10 ring-1 ring-white/5"
                                >
                                    <span>ส่งคำตอบ</span>
                                    <Check className="w-5 h-5" />
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    className="btn-primary w-full h-12 text-lg font-medium shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2"
                                >
                                    <span>ข้อถัดไป</span>
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            )
                        )}
                    </div>

                    {/* Pagination quick view */}
                    <Link href="#" onClick={(e) => { e.preventDefault(); handleGoToQuestion(currentIndex); }} className="w-12 h-12 hidden sm:flex items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white font-medium transition-colors border border-white/5">
                        <span className="text-sm">{currentIndex + 1}/{totalQuestions}</span>
                    </Link>
                </div>
            </footer>

            {/* Exit confirmation modal */}
            {showExitConfirm && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="glass-panel rounded-2xl p-6 max-w-sm w-full shadow-2xl relative border border-white/10">
                        <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-4 text-amber-500 mx-auto border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                            <HelpCircle className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2 text-center">ออกจากข้อสอบ?</h2>
                        <p className="text-slate-400 mb-6 text-center">หากออกตอนนี้ ความคืบหน้าของคุณจะไม่ถูกบันทึก</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowExitConfirm(false)}
                                className="flex-1 h-11 rounded-xl bg-white/5 text-slate-300 font-medium hover:bg-white/10 hover:text-white transition-colors border border-white/5"
                            >
                                ทำต่อ
                            </button>
                            <Link
                                href="/topics"
                                className="flex-1 h-11 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors flex items-center justify-center shadow-lg shadow-red-600/30"
                            >
                                ยืนยัน
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
