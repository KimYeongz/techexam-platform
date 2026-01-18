
"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2, Trophy, Clock, Calendar, BarChart3, BookOpen, Target } from "lucide-react"

type Attempt = {
    id: number
    score: number
    totalQuestions: number
    timeSeconds: number | null
    startedAt: string
    topic: {
        nameTh: string
        nameEn: string
    }
}

export default function ProfilePage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [attempts, setAttempts] = useState<Attempt[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }

        if (status === "authenticated") {
            fetch("/api/score")
                .then((res) => res.json())
                .then((data) => {
                    if (data.attempts) {
                        setAttempts(data.attempts)
                    }
                })
                .finally(() => setIsLoading(false))
        }
    }, [status, router])

    if (status === "loading" || isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
        )
    }

    if (!session) return null

    // Calculate Stats
    const totalAttempts = attempts.length
    const totalScore = attempts.reduce((acc, curr) => acc + curr.score, 0)
    const totalQuestions = attempts.reduce((acc, curr) => acc + curr.totalQuestions, 0)
    const averageScore = totalAttempts > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header */}
                <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            สวัสดี, <span className="text-primary-600">{session.user?.name}</span>
                        </h1>
                        <p className="text-slate-500 mt-1">ยินดีต้อนรับกลับสู่แดชบอร์ดการเรียนรู้ของคุณ</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center space-x-4">
                        <div className="p-4 bg-primary-50 rounded-xl text-primary-600">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">บทเรียนที่เรียนแล้ว</p>
                            <p className="text-2xl font-bold text-slate-900">{totalAttempts}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center space-x-4">
                        <div className="p-4 bg-emerald-50 rounded-xl text-emerald-600">
                            <Target className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">คะแนนเฉลี่ยรวม</p>
                            <p className="text-2xl font-bold text-slate-900">{averageScore}%</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center space-x-4">
                        <div className="p-4 bg-amber-50 rounded-xl text-amber-600">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">คะแนนทำได้สูงสุด</p>
                            <p className="text-2xl font-bold text-slate-900">
                                {Math.max(...attempts.map(a => a.score), 0)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-slate-400" />
                            ประวัติการทำข้อสอบล่าสุด
                        </h2>
                    </div>

                    {attempts.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 border-dashed">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BarChart3 className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900 mb-2">ยังไม่มีประวัติการทำข้อสอบ</h3>
                            <p className="text-slate-500 mb-6">เริ่มทำแบบทดสอบแรกของคุณเพื่อดูพัฒนาการ</p>
                            <button onClick={() => router.push('/topics')} className="btn-primary">
                                เริ่มทำข้อสอบ
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {attempts.map((attempt) => (
                                <div
                                    key={attempt.id}
                                    className="group bg-white rounded-xl border border-slate-200 p-4 hover:border-primary-200 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
                                            {attempt.topic.nameEn.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                                                {attempt.topic.nameTh}
                                            </h3>
                                            <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(attempt.startedAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0">
                                        <div className="flex flex-col items-end min-w-[80px]">
                                            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">เวลาที่ใช้</span>
                                            <span className="font-medium text-slate-700">
                                                {attempt.timeSeconds ? `${Math.floor(attempt.timeSeconds / 60)}m ${attempt.timeSeconds % 60}s` : '-'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end min-w-[80px]">
                                            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">คะแนน</span>
                                            <span className={`font-bold text-lg ${(attempt.score / attempt.totalQuestions) >= 0.8 ? 'text-emerald-600' :
                                                    (attempt.score / attempt.totalQuestions) >= 0.5 ? 'text-amber-600' :
                                                        'text-red-600'
                                                }`}>
                                                {attempt.score}/{attempt.totalQuestions}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
