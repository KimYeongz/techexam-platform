
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
            <div className="flex h-screen items-center justify-center bg-black">
                <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
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
        <div className="min-h-screen bg-black py-12 text-slate-200 font-sans">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                {/* Header */}
                <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            สวัสดี, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">{session.user?.name}</span>
                        </h1>
                        <p className="text-slate-400 mt-1">ยินดีต้อนรับกลับสู่แดชบอร์ดการเรียนรู้ของคุณ</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="glass-panel border-white/5 p-6 rounded-2xl flex items-center space-x-4 hover:bg-white/5 transition-colors group">
                        <div className="p-4 bg-primary-500/10 rounded-xl text-primary-400 ring-1 ring-primary-500/20 group-hover:scale-110 transition-transform duration-300">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-400">บทเรียนที่เรียนแล้ว</p>
                            <p className="text-2xl font-bold text-white">{totalAttempts}</p>
                        </div>
                    </div>
                    <div className="glass-panel border-white/5 p-6 rounded-2xl flex items-center space-x-4 hover:bg-white/5 transition-colors group">
                        <div className="p-4 bg-emerald-500/10 rounded-xl text-emerald-400 ring-1 ring-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                            <Target className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-400">คะแนนเฉลี่ยรวม</p>
                            <p className="text-2xl font-bold text-white">{averageScore}%</p>
                        </div>
                    </div>
                    <div className="glass-panel border-white/5 p-6 rounded-2xl flex items-center space-x-4 hover:bg-white/5 transition-colors group">
                        <div className="p-4 bg-amber-500/10 rounded-xl text-amber-400 ring-1 ring-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-400">คะแนนทำได้สูงสุด</p>
                            <p className="text-2xl font-bold text-white">
                                {Math.max(...attempts.map(a => a.score), 0)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Clock className="w-5 h-5 text-slate-400" />
                            ประวัติการทำข้อสอบล่าสุด
                        </h2>
                    </div>

                    {attempts.length === 0 ? (
                        <div className="glass-panel border-white/5 rounded-2xl p-12 text-center border-dashed">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500 border border-white/5">
                                <BarChart3 className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2">ยังไม่มีประวัติการทำข้อสอบ</h3>
                            <p className="text-slate-400 mb-6">เริ่มทำแบบทดสอบแรกของคุณเพื่อดูพัฒนาการ</p>
                            <button onClick={() => router.push('/topics')} className="btn-primary shadow-lg shadow-primary-500/20">
                                เริ่มทำข้อสอบ
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {attempts.map((attempt) => (
                                <div
                                    key={attempt.id}
                                    className="group glass-panel border-white/5 rounded-xl p-5 hover:bg-white/5 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20 flex items-center justify-center font-bold text-lg shadow-[0_0_10px_rgba(99,102,241,0.1)]">
                                            {attempt.topic.nameEn.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                                                {attempt.topic.nameTh}
                                            </h3>
                                            <div className="flex items-center gap-3 text-sm text-slate-400 mt-1">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(attempt.startedAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 sm:justify-end border-t border-white/5 sm:border-t-0 pt-4 sm:pt-0">
                                        <div className="flex flex-col items-end min-w-[80px]">
                                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">เวลาที่ใช้</span>
                                            <span className="font-medium text-slate-300">
                                                {attempt.timeSeconds ? `${Math.floor(attempt.timeSeconds / 60)}m ${attempt.timeSeconds % 60}s` : '-'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end min-w-[80px]">
                                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">คะแนน</span>
                                            <span className={`font-bold text-lg shadow-[0_0_10px_rgba(0,0,0,0)] ${(attempt.score / attempt.totalQuestions) >= 0.8 ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]' :
                                                (attempt.score / attempt.totalQuestions) >= 0.5 ? 'text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]' :
                                                    'text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]'
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
