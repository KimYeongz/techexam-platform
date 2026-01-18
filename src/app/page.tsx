import Link from 'next/link'
import {
    BookOpen,
    CheckCircle2,
    ChevronRight,
    GraduationCap,
    Clock,
    Sparkles,
    Calculator,
    Beaker,
    Globe2,
    Palette,
    ArrowRight
} from 'lucide-react'

// Mock Subjects Data for the new homepage structure
const subjects = [
    {
        id: 'emerging-tech',
        name: 'Emerging Technology',
        nameTh: 'เทคโนโลยีอนาคต',
        description: 'รวมบทเรียน AI, Big Data, Blockchain, IoT และ 5G',
        icon: Sparkles,
        gradient: 'from-indigo-500 to-blue-500',
        href: '/topics',
        lessons: 7,
        status: 'available'
    },
    {
        id: 'math',
        name: 'Mathematics',
        nameTh: 'คณิตศาสตร์',
        description: 'แคลคูลัส, สถิติ, และตรรกศาสตร์',
        icon: Calculator,
        gradient: 'from-emerald-500 to-teal-500',
        href: '#',
        lessons: 0,
        status: 'coming_soon'
    },
    {
        id: 'science',
        name: 'General Science',
        nameTh: 'วิทยาศาสตร์ทั่วไป',
        description: 'ฟิสิกส์, เคมี, ชีววิทยาเบื้องต้น',
        icon: Beaker,
        gradient: 'from-rose-500 to-pink-500',
        href: '#',
        lessons: 0,
        status: 'coming_soon'
    },
    {
        id: 'english',
        name: 'English Language',
        nameTh: 'ภาษาอังกฤษ',
        description: 'Grammar, Vocabulary และการสื่อสาร',
        icon: Globe2,
        gradient: 'from-amber-500 to-orange-500',
        href: '#',
        lessons: 0,
        status: 'coming_soon'
    },
    {
        id: 'art',
        name: 'Arts & Design',
        nameTh: 'ศิลปะและการออกแบบ',
        description: 'ทัศนศิลป์, ประวัติศาสตร์ศิลป์',
        icon: Palette,
        gradient: 'from-purple-500 to-violet-500',
        href: '#',
        lessons: 0,
        status: 'coming_soon'
    }
]

export default function HomePage() {
    return (
        <div className="min-h-screen bg-black text-slate-200">
            {/* Hero Section - Framer Awards Style */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-16">
                {/* Spotlight Effect */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-primary-500/20 via-primary-900/5 to-transparent rounded-full blur-3xl" />
                    <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse-slow" />
                </div>

                {/* Particles/Dust Effect */}
                <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

                <div className="container relative z-10 px-4 text-center">
                    <div className="mb-6 animate-fade-in relative inline-block group">
                        <span className="font-script text-5xl md:text-7xl text-white block opacity-90 transform -rotate-6 translate-y-8 -translate-x-8 z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            The
                        </span>
                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 uppercase leading-[0.85] group-hover:scale-105 transition-transform duration-500">
                            TIUDO
                        </h1>
                        <div className="h-2 w-full bg-gradient-to-r from-transparent via-primary-500 to-transparent mt-4 opacity-50 blur-sm"></div>
                    </div>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 font-light tracking-wide leading-relaxed">
                        <span className="text-primary-400 font-medium">Empowering Your Future.</span> แพลตฟอร์มการเรียนรู้ที่ออกแบบมาเพื่อเทคโนโลยีแห่งอนาคต
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
                        <Link
                            href="/topics"
                            className="btn-primary min-w-[160px] group"
                        >
                            <span>เริ่มเรียนรู้เลย</span>
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="#subjects"
                            className="btn-secondary min-w-[160px]"
                        >
                            ดูรายวิชา
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                    <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-1">
                        <div className="w-1 h-2 bg-slate-400 rounded-full" />
                    </div>
                </div>
            </section>

            {/* Subjects Grid Section */}
            <section id="subjects" className="relative py-24 z-10">
                <div className="container mx-auto px-4">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
                                หมวดหมู่วิชา
                            </h2>
                            <p className="text-slate-400 mt-2">เลือกวิชาที่คุณต้องการเรียนรู้</p>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {subjects.map((subject, index) => (
                            <Link
                                key={index}
                                href={subject.status === 'available' ? subject.href : '#'}
                                className={`glass-card group p-8 rounded-3xl ${subject.status !== 'available' ? 'opacity-60 cursor-not-allowed hover:translate-y-0' : ''}`}
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${subject.gradient} flex items-center justify-center text-white mb-6 shadow-lg shadow-primary-900/20 group-hover:scale-110 transition-transform duration-500`}>
                                    <subject.icon className="w-7 h-7" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                                    {subject.name}
                                </h3>
                                <p className="text-sm font-light text-slate-400 font-thai mb-6">
                                    {subject.nameTh}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                                        {subject.lessons} บทเรียน
                                    </span>
                                    {subject.status === 'available' ? (
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-300 group-hover:bg-primary-500 group-hover:text-white transition-all">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    ) : (
                                        <span className="text-xs bg-white/5 px-2 py-1 rounded text-slate-500">
                                            เร็วๆ นี้
                                        </span>
                                    )}
                                </div>

                                {/* Ambient Glow */}
                                <div className={`absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br ${subject.gradient} blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`} />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 bg-black pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                                T
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Tiudo</span>
                        </div>
                        <div className="flex gap-6 text-sm text-slate-400">
                            <Link href="#" className="hover:text-white transition-colors">เกี่ยวกับเรา</Link>
                            <Link href="#" className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</Link>
                            <Link href="#" className="hover:text-white transition-colors">เงื่อนไขการใช้งาน</Link>
                            <Link href="#" className="hover:text-white transition-colors">ติดต่อเรา</Link>
                        </div>
                    </div>
                    <div className="text-center text-xs text-slate-600 font-light">
                        &copy; 2024 Tiudo Platform. สงวนลิขสิทธิ์
                    </div>
                </div>
            </footer>
        </div>
    )
}
