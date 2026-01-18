import Link from 'next/link'
import {
    Home,
    BookOpen,
    Trophy,
    TrendingUp,
    Clock,
    Target,
    ChevronRight,
    BarChart3,
    Award
} from 'lucide-react'

// Mock user data - in real app, this would come from database
const userData = {
    name: 'ผู้ใช้งาน',
    totalAttempts: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    averageScore: 0,
    bestScore: 0,
    totalTimeSpent: 0,
    topicProgress: [
        { slug: 'bigdata', name: 'Big Data', progress: 0, score: 0 },
        { slug: 'iot', name: 'IoT', progress: 0, score: 0 },
        { slug: 'blockchain', name: 'Blockchain', progress: 0, score: 0 },
        { slug: 'quantum', name: 'Quantum', progress: 0, score: 0 },
        { slug: 'wireless', name: 'Wireless', progress: 0, score: 0 },
        { slug: '5g', name: '5G', progress: 0, score: 0 },
        { slug: 'ai', name: 'AI', progress: 0, score: 0 },
    ],
    recentAttempts: []
}

export default function DashboardPage() {
    const overallProgress = userData.totalQuestions > 0
        ? Math.round((userData.correctAnswers / userData.totalQuestions) * 100)
        : 0

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex items-center justify-between mb-6">
                        <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white">
                            <Home className="w-5 h-5" />
                            <span>หน้าแรก</span>
                        </Link>
                    </div>
                    <h1 className="text-2xl font-bold mb-2">📊 Dashboard</h1>
                    <p className="text-primary-100">สวัสดี, {userData.name}</p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-6 -mt-4">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="card p-4 text-center">
                        <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-3">
                            <Target className="w-6 h-6" />
                        </div>
                        <div className="text-2xl font-bold text-slate-900">{userData.totalAttempts}</div>
                        <div className="text-sm text-slate-500">ครั้งที่ทำ</div>
                    </div>

                    <div className="card p-4 text-center">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div className="text-2xl font-bold text-slate-900">{userData.averageScore}%</div>
                        <div className="text-sm text-slate-500">คะแนนเฉลี่ย</div>
                    </div>

                    <div className="card p-4 text-center">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <div className="text-2xl font-bold text-slate-900">{userData.bestScore}%</div>
                        <div className="text-sm text-slate-500">คะแนนสูงสุด</div>
                    </div>

                    <div className="card p-4 text-center">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-3">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div className="text-2xl font-bold text-slate-900">{userData.totalTimeSpent}</div>
                        <div className="text-sm text-slate-500">นาทีที่ใช้</div>
                    </div>
                </div>

                {/* Overall Progress */}
                <div className="card p-6 mb-8">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary-500" />
                        ความก้าวหน้าโดยรวม
                    </h2>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex-1">
                            <div className="progress-bar h-4 rounded-full">
                                <div
                                    className="progress-bar-fill h-4 rounded-full"
                                    style={{ width: `${overallProgress}%` }}
                                />
                            </div>
                        </div>
                        <span className="text-xl font-bold text-primary-600">{overallProgress}%</span>
                    </div>

                    <p className="text-sm text-slate-500">
                        ตอบถูก {userData.correctAnswers} จาก {userData.totalQuestions} ข้อ
                    </p>
                </div>

                {/* Topic Progress */}
                <div className="card p-6 mb-8">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary-500" />
                        ความก้าวหน้าแต่ละหัวข้อ
                    </h2>

                    <div className="space-y-4">
                        {userData.topicProgress.map((topic) => (
                            <Link
                                key={topic.slug}
                                href={`/topics/${topic.slug}`}
                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium text-slate-900">{topic.name}</span>
                                        <span className="text-sm text-slate-500">
                                            {topic.progress}% {topic.score > 0 && `(${topic.score}%)`}
                                        </span>
                                    </div>
                                    <div className="progress-bar">
                                        <div
                                            className="progress-bar-fill"
                                            style={{ width: `${topic.progress}%` }}
                                        />
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary-500 transition-colors" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Empty State for Recent Attempts */}
                {userData.recentAttempts.length === 0 && (
                    <div className="card p-8 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                            <Award className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-2">ยังไม่มีประวัติการทำข้อสอบ</h3>
                        <p className="text-slate-500 mb-6">เริ่มทำข้อสอบเพื่อติดตามความก้าวหน้าของคุณ</p>
                        <Link href="/topics" className="btn-primary inline-flex">
                            <BookOpen className="w-5 h-5" />
                            เริ่มทำข้อสอบ
                        </Link>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="grid gap-4 sm:grid-cols-2 mt-8">
                    <Link href="/topics" className="btn-primary w-full justify-center py-4">
                        📚 ดูหัวข้อทั้งหมด
                    </Link>
                    <button className="btn-secondary w-full justify-center py-4">
                        🎯 ทบทวนข้อที่ตอบผิด
                    </button>
                </div>
            </main>
        </div>
    )
}
