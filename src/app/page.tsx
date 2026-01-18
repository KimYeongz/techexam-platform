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
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-50 pt-16 pb-20 lg:pt-24 lg:pb-32">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center max-w-3xl mx-auto space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-medium text-slate-600 hover:border-primary-200 transition-colors cursor-default animate-fade-in">
                            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                            พร้อมเนื้อหาอัปเดตใหม่ 2026
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 animate-slide-up">
                            อัปสกิลความรู้
                            <span className="text-primary-600 inline-block ml-3">
                                เทคโนโลยี
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto animate-slide-up animate-delay-100">
                            แพลตฟอร์มติวสอบที่รวบรวมเนื้อหาสำคัญและแบบฝึกหัด
                            เพื่อเตรียมความพร้อมสู่โลกอนาคต ฟรี ไม่มีค่าใช้จ่าย
                        </p>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animate-delay-200">
                            <Link href="/topics" className="btn-primary h-14 px-8 text-base shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30">
                                เริ่มเรียนทันที
                                <ChevronRight className="w-5 h-5 ml-1" />
                            </Link>

                        </div>

                        <div className="pt-8 flex items-center justify-center gap-8 text-sm text-slate-500 animate-fade-in animate-delay-300">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                <span>เนื้อหาครบถ้วน</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                <span>เข้าถึงได้ทุกที่</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                <span>ไม่มีโฆษณา</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Topics Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-3">บทเรียนยอดนิยม</h2>
                            <p className="text-slate-500 text-lg">เลือกหัวข้อที่คุณสนใจแล้วเริ่มเรียนรู้ได้เลย</p>
                        </div>
                        <Link href="/topics" className="hidden md:flex items-center text-primary-600 font-medium hover:text-primary-700">
                            ดูทั้งหมด <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {topics.map((topic, index) => (
                            <Link
                                key={topic.slug}
                                href={`/topics/${topic.slug}`}
                                className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300"
                            >
                                <div className={`w-12 h-12 rounded-xl ${topic.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <topic.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                                    {topic.name}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <div className="flex items-center gap-1">
                                        <BookOpen className="w-4 h-4" />
                                        <span>1 บทเรียน</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>~15 นาที</span>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {/* More Card */}
                        <Link
                            href="/topics"
                            className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-6 flex flex-col items-center justify-center text-center hover:bg-slate-100 hover:border-slate-400 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <ChevronRight className="w-6 h-6 text-slate-400" />
                            </div>
                            <span className="font-medium text-slate-600">ดูหัวข้ออื่นเพิ่มเติม</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">เรียนรู้อย่างมีประสิทธิภาพ</h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            เราออกแบบประสบการณ์การเรียนรู้ให้เหมาะสมกับการจดจำและการนำไปใช้จริง
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm text-center hover:shadow-md transition-shadow duration-300">
                                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-6`}>
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-md shadow-primary-500/20">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-xl font-bold text-slate-900 block">TechExam</span>
                                <span className="text-xs text-slate-500">Learn Technology Easily</span>
                            </div>
                        </div>
                        <p className="text-slate-500 text-sm">
                            © 2026 TechExam. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

