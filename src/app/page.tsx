import Link from 'next/link'
import {
    BookOpen,
    Brain,
    Trophy,
    ChevronRight,
    Sparkles,
    Database,
    Wifi,
    Cpu,
    Link as LinkIcon,
    Radio,
    Zap,
    GraduationCap,
    Clock,
    CheckCircle2
} from 'lucide-react'

const topics = [
    { slug: 'bigdata', name: 'Big Data', icon: Database, color: 'bg-blue-100 text-blue-600' },
    { slug: 'iot', name: 'IoT', icon: Wifi, color: 'bg-emerald-100 text-emerald-600' },
    { slug: 'blockchain', name: 'Blockchain', icon: LinkIcon, color: 'bg-violet-100 text-violet-600' },
    { slug: 'quantum', name: 'Quantum', icon: Cpu, color: 'bg-pink-100 text-pink-600' },
    { slug: 'wireless', name: 'Wireless', icon: Radio, color: 'bg-amber-100 text-amber-600' },
    { slug: '5g', name: '5G Tech', icon: Zap, color: 'bg-rose-100 text-rose-600' },
    { slug: 'ai', name: 'AI', icon: Brain, color: 'bg-indigo-100 text-indigo-600' },
]

const features = [
    {
        icon: BookOpen,
        title: 'สรุปเนื้อหาเข้มข้น',
        description: 'เนื้อหากระชับ เข้าใจง่าย อ่านจบได้ใน 5-8 นาที พร้อมสอบ',
        color: 'bg-blue-50 text-blue-600'
    },
    {
        icon: CheckCircle2,
        title: 'แบบฝึกหัด 140 ข้อ',
        description: 'คลังข้อสอบปรนัย พร้อมเฉลยละเอียดทุกข้อ',
        color: 'bg-emerald-50 text-emerald-600'
    },
    {
        icon: Trophy,
        title: 'ระบบวิเคราะห์ผล',
        description: 'ติดตามพัฒนาการและจุดที่ต้องปรับปรุงได้ทันที',
        color: 'bg-amber-50 text-amber-600'
    },
]

export default function HomePage() {
    return (
        <div className="min-h-screen bg-slate-50 overflow-hidden selection:bg-primary-100 selection:text-primary-900">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 z-10">
                <div className="container mx-auto px-4 max-w-6xl relative">
                    {/* Floating Icons Background */}
                    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
                        <Database className="absolute top-10 left-10 w-12 h-12 text-blue-200/50 animate-float" />
                        <Wifi className="absolute top-20 right-20 w-10 h-10 text-emerald-200/50 animate-float-delayed" />
                        <Brain className="absolute bottom-10 left-1/4 w-14 h-14 text-indigo-200/50 animate-float" />
                        <Cpu className="absolute bottom-20 right-1/4 w-8 h-8 text-rose-200/50 animate-float-delayed" />
                    </div>

                    <div className="text-center max-w-4xl mx-auto space-y-8 relative">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-lg shadow-slate-200/20 text-sm font-medium text-slate-600 hover:scale-105 transition-transform cursor-default animate-fade-in ring-1 ring-white/50">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            พร้อมเนื้อหาอัปเดตใหม่ 2026
                        </div>

                        {/* Heading */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 animate-slide-up leading-tight">
                            อัปสกิลความรู้
                            <br className="hidden md:block" />
                            <span className="text-gradient inline-block mt-2">
                                เทคโนโลยีแห่งอนาคต
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto animate-slide-up animate-delay-100">
                            แพลตฟอร์มติวสอบที่รวบรวมเนื้อหาสำคัญและแบบฝึกหัด
                            เตรียมความพร้อมสู่โลกยุคใหม่ ฟรี ไม่มีค่าใช้จ่าย
                        </p>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animate-delay-200 pt-4">
                            <Link href="/topics" className="btn-primary h-14 px-8 text-lg shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 hover:-translate-y-1 transition-all">
                                เริ่มเรียนทันที
                                <ChevronRight className="w-5 h-5 ml-1" />
                            </Link>
                        </div>

                        <div className="pt-12 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm font-medium text-slate-500 animate-fade-in animate-delay-300">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/50 backdrop-blur-sm border border-slate-100">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <span>เนื้อหาครบถ้วน</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/50 backdrop-blur-sm border border-slate-100">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <span>เข้าถึงได้ทุกที่</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/50 backdrop-blur-sm border border-slate-100">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <span>ไม่มีโฆษณา</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Topics Grid */}
            <section className="py-20 bg-white/50 backdrop-blur-3xl relative z-10">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">บทเรียนยอดนิยม</h2>
                            <p className="text-slate-500 text-lg">เลือกหัวข้อที่คุณสนใจแล้วเริ่มเรียนรู้ได้เลย</p>
                        </div>
                        <Link href="/topics" className="hidden md:flex items-center px-4 py-2 rounded-lg bg-slate-50 text-slate-600 font-medium hover:bg-slate-100 hover:text-primary-600 transition-colors">
                            ดูทั้งหมด <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {topics.map((topic, index) => (
                            <Link
                                key={topic.slug}
                                href={`/topics/${topic.slug}`}
                                className="group glass-card p-6 rounded-2xl hover:-translate-y-1 hover:border-primary-200/50"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${topic.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm`}>
                                    <topic.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                                    {topic.name}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-slate-500 mt-4 pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-1.5">
                                        <BookOpen className="w-4 h-4" />
                                        <span>1 บทเรียน</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4" />
                                        <span>~15 นาที</span>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {/* More Card */}
                        <Link
                            href="/topics"
                            className="group relative overflow-hidden bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-center hover:bg-white hover:border-primary-200 transition-all duration-300"
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary-50/50 to-transparent"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-md transition-all">
                                    <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-primary-500" />
                                </div>
                                <span className="font-semibold text-slate-600 group-hover:text-primary-600 transition-colors">ดูหัวข้ออื่นเพิ่มเติม</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-50/80 -z-10"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>

                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16 relative">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                            <Sparkles className="w-8 h-8 text-amber-400 animate-pulse-slow" />
                        </div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-6">เรียนรู้อย่างมีประสิทธิภาพ</h2>
                        <p className="text-slate-500 text-xl max-w-2xl mx-auto font-light">
                            เราออกแบบประสบการณ์การเรียนรู้ให้เหมาะสมกับการจดจำและการนำไปใช้จริง
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300 group">
                                <div className={`w-20 h-20 rounded-3xl ${feature.color} flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg`}>
                                    <feature.icon className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-lg">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-12 relative z-10">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3 group cursor-pointer hover:opacity-80 transition-opacity">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-shadow">
                                <GraduationCap className="w-7 h-7" />
                            </div>
                            <div>
                                <span className="text-xl font-bold text-slate-900 block tracking-tight">TechExam</span>
                                <span className="text-xs text-slate-500 font-medium tracking-wide">Learn Technology Easily</span>
                            </div>
                        </div>
                        <p className="text-slate-500 text-sm font-medium">
                            © 2026 TechExam. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

