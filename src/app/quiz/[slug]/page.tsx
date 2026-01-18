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
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">กำลังโหลดข้อสอบ...</p>
                </div>
            </div>
        )
    }

    if (!quizData) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">ไม่พบข้อสอบ</h2>
                    <p className="text-slate-500 mb-6">ไม่พบข้อมูลข้อสอบสำหรับหัวข้อนี้</p>
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
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">กำลังบันทึกคะแนน...</p>
                </div>
            </div>
        )
    }

    if (isSubmitted) {
        const score = calculateScore()
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12">
                <div className="w-full max-w-2xl px-4">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                        {/* Result Header */}
                        <div className="bg-slate-900 text-white p-8 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-accent-600 opacity-90" />
                            <div className="relative z-10">
                                <h1 className="text-3xl font-bold mb-2">🎉 ยินดีด้วย!</h1>
                                <p className="text-white/80">คุณทำข้อสอบ {quizData.topicName} เสร็จเรียบร้อยแล้ว</p>
                            </div>
                        </div>

                        {/* Score Card Content */}
                        <div className="p-8">
                            <div className="flex flex-col items-center mb-8">
                                <div className="relative w-40 h-40 mb-6">
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle
                                            className="text-slate-100"
                                            strokeWidth="8"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="42"
                                            cx="50"
                                            cy="50"
                                        />
                                        <circle
                                            className="text-emerald-500"
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
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-900">
                                        <span className="text-4xl font-bold">{score.percentage}%</span>
                                        <span className="text-xs text-slate-500 font-medium uppercase">คะแนน</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 w-full justify-center">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-slate-900">{score.correct}/{score.total}</div>
                                        <div className="text-sm text-slate-500">ข้อที่ถูก</div>
                                    </div>
                                    <div className="w-px h-10 bg-slate-200" />
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-slate-900">{formatTime(timeElapsed)}</div>
                                        <div className="text-sm text-slate-500">เวลาที่ใช้</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 bg-emerald-50 rounded-xl flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                        <Check className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-emerald-700">{score.correct}</div>
                                        <div className="text-xs text-emerald-600 font-medium">ถูกต้อง</div>
                                    </div>
                                </div>
                                <div className="p-4 bg-red-50 rounded-xl flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                        <X className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-red-700">{score.total - score.correct}</div>
                                        <div className="text-xs text-red-600 font-medium">ไม่ถูกต้อง</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Link href={`/result/${params.slug}`} className="btn-primary w-full justify-center h-12 text-lg">
                                    ดูเฉลยละเอียด
                                </Link>
                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={() => window.location.reload()} className="btn-secondary w-full justify-center">
                                        ทำใหม่
                                    </button>
                                    <Link href="/topics" className="btn-secondary w-full justify-center">
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
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowExitConfirm(true)}
                            className="p-2 -ml-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="font-semibold text-slate-900 hidden sm:block">{quizData.topicName}</h1>
                            <div className="text-xs text-slate-500 font-medium tracking-wider uppercase sm:hidden">Quiz</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full text-sm font-medium">
                            <Clock className="w-4 h-4" />
                            <span className="font-mono">{formatTime(timeElapsed)}</span>
                        </div>
                        <TranslateButton />
                    </div>
                </div>
                {/* Progress bar */}
                <div className="h-1 bg-slate-100 w-full overflow-hidden">
                    <div
                        className="h-full bg-primary-600 transition-all duration-500 ease-out rounded-r-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </header>

            {/* Question Area */}
            <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 pb-32">
                {/* Status Bar */}
                <div className="flex items-center justify-between mb-8">
                    <span className="text-sm font-medium text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm">
                        ข้อที่ <span className="text-slate-900 font-bold">{currentIndex + 1}</span> จาก {totalQuestions}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", difficulty.bgClass)}>
                            {difficulty.label}
                        </span>
                    </div>
                </div>

                {/* Question Text */}
                <div className="mb-8">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-relaxed mb-6">
                        <TranslatedText text={currentQuestion.questionText} />
                    </h2>
                    {currentQuestion.tags && currentQuestion.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {currentQuestion.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">#{tag}</span>
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

                        let cardClass = "bg-white border-slate-200 hover:border-primary-300 hover:shadow-md";
                        let indicatorClass = "bg-slate-100 text-slate-500 group-hover:bg-primary-50 group-hover:text-primary-600";

                        if (isChecked) {
                            if (isCorrectAnswer) {
                                cardClass = "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500";
                                indicatorClass = "bg-emerald-500 text-white";
                            } else if (isCheckedAndWrong) {
                                cardClass = "bg-red-50 border-red-500 ring-1 ring-red-500";
                                indicatorClass = "bg-red-500 text-white";
                            } else {
                                cardClass = "bg-slate-50 border-slate-200 opacity-60";
                            }
                        } else if (isSelected) {
                            cardClass = "bg-primary-50 border-primary-600 ring-1 ring-primary-600 shadow-md";
                            indicatorClass = "bg-primary-600 text-white";
                        }

                        return (
                            <button
                                key={choice.label}
                                onClick={() => handleSelectAnswer(choice.label)}
                                disabled={isChecked}
                                className={cn(
                                    "relative w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group flex items-start gap-4",
                                    cardClass
                                )}
                            >
                                <div className={cn(
                                    "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors",
                                    indicatorClass
                                )}>
                                    {choice.label}
                                </div>
                                <div className={cn("flex-1 pt-1 font-medium", isChecked ? "text-slate-700" : "text-slate-900")}>
                                    <TranslatedText text={choice.text} showOriginal={false} />
                                </div>

                                {isCheckedAndCorrect && <Check className="w-6 h-6 text-emerald-500 absolute right-4 top-4" />}
                                {isCheckedAndWrong && <X className="w-6 h-6 text-red-500 absolute right-4 top-4" />}
                            </button>
                        );
                    })}
                </div>

                {/* Explanation (Feedback) */}
                {isChecked && (
                    <div className={cn(
                        "rounded-2xl p-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 border",
                        isCorrect ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
                    )}>
                        <div className="flex items-center gap-3 mb-3">
                            <div className={cn("p-2 rounded-full", isCorrect ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600")}>
                                {isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                            </div>
                            <h3 className={cn("font-bold text-lg", isCorrect ? "text-emerald-800" : "text-red-800")}>
                                {isCorrect ? "ยอดเยี่ยม! ถูกต้อง" : "ยังไม่ถูก ลองดูคำอธิบายนะ"}
                            </h3>
                        </div>
                        <div className="text-slate-700 leading-relaxed pl-[3.25rem]">
                            <TranslatedText text={currentQuestion.explanation} />
                        </div>
                    </div>
                )}
            </main>

            {/* Bottom Navigation */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-40 safe-area-bottom">
                <div className="max-w-3xl mx-auto flex items-center gap-4">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="flex-1">
                        {!isChecked ? (
                            <button
                                onClick={handleCheckAnswer}
                                disabled={!selectedAnswer}
                                className="btn-primary w-full h-12 text-lg font-medium shadow-lg shadow-primary-500/20 disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ตรวจคำตอบ
                            </button>
                        ) : (
                            currentIndex === totalQuestions - 1 ? (
                                <button
                                    onClick={handleSubmit}
                                    className="w-full h-12 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-lg flex items-center justify-center gap-2"
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
                    <Link href="#" onClick={(e) => { e.preventDefault(); handleGoToQuestion(currentIndex); }} className="w-12 h-12 hidden sm:flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium transition-colors">
                        <span className="text-sm">{currentIndex + 1}/{totalQuestions}</span>
                    </Link>
                </div>
            </footer>

            {/* Exit confirmation modal */}
            {showExitConfirm && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 text-amber-600 mx-auto">
                            <HelpCircle className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2 text-center">ออกจากข้อสอบ?</h2>
                        <p className="text-slate-500 mb-6 text-center">หากออกตอนนี้ ความคืบหน้าของคุณจะไม่ถูกบันทึก</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowExitConfirm(false)}
                                className="flex-1 h-11 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
                            >
                                ทำต่อ
                            </button>
                            <Link
                                href="/topics"
                                className="flex-1 h-11 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
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
