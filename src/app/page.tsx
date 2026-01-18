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
    Palette
} from 'lucide-react'

// Mock Subjects Data for the new homepage structure
const subjects = [
    {
        id: 'emerging-tech',
        name: 'Emerging Technology',
        nameTh: 'เทคโนโลยีอนาคต',
        description: 'รวมบทเรียน AI, Big Data, Blockchain, IoT และ 5G',
        icon: Sparkles,
        color: 'bg-indigo-100 text-indigo-600',
        href: '/topics', // Links to the existing topics page
        lessons: 7,
        status: 'available'
    },
    {
        id: 'math',
        name: 'Mathematics',
        nameTh: 'คณิตศาสตร์',
        description: 'แคลคูลัส, สถิติ, และตรรกศาสตร์',
        icon: Calculator,
        color: 'bg-emerald-100 text-emerald-600',
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
        color: 'bg-rose-100 text-rose-600',
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
        color: 'bg-amber-100 text-amber-600',
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
        color: 'bg-purple-100 text-purple-600',
        href: '#',
        lessons: 0,
        status: 'coming_soon'
    }
]

const features = [
    {
        icon: BookOpen,
        title: 'สรุปเนื้อหาเข้มข้น',
        description: 'เนื้อหากระชับ เข้าใจง่าย อ่านจบได้ในไม่กี่นาที',
        color: 'bg-blue-50 text-blue-600'
    },
    {
        icon: CheckCircle2,
        title: 'แบบฝึกหัดท้าทาย',
        description: 'คลังข้อสอบพร้อมเฉลยละเอียดทุกข้อ',
        color: 'bg-emerald-50 text-emerald-600'
    },
    {
        icon: GraduationCap,
        title: 'ระบบติดตามผล',
        description: 'วิเคราะห์พัฒนาการและจุดที่ต้องปรับปรุง',
        color: 'bg-amber-50 text-amber-600'
    },
]

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-50 pt-20 pb-24 border-b border-slate-200">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center max-w-3xl mx-auto space-y-8">
                        {/* Wrapper for content */}

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-medium text-slate-600">
                            <span className="flex h-2 w-2 rounded-full bg-primary-500"></span>
                            แพลตฟอร์มการเรียนรู้รูปแบบใหม่
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
                            Tiudo
                        </h1>
                        <p className="text-2xl md:text-3xl font-medium text-slate-700">
                            แหล่งรวมวิชาเรียนเพื่ออนาคต
                        </p>

                        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                            เรามุ่งมั่นสร้างสรรค์พื้นที่แห่งการเรียนรู้ที่เข้าถึงง่าย เนื้อหาคุณภาพ
                            และครอบคลุมหลากหลายสาขาวิชา เพื่อพัฒนาศักยภาพของคุณให้ไร้ขีดจำกัด
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/topics" className="btn-primary h-12 px-8 text-lg">
                                ดูรายวิชาทั้งหมด
                                <ChevronRight className="w-5 h-5 ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Subjects Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="mb-12 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">รายวิชาที่เปิดสอน</h2>
                        <p className="text-slate-500 text-lg">เลือกวิชาที่คุณต้องการเรียนรู้</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subjects.map((subject) => (
                            <Link
                                key={subject.id}
                                href={subject.href}
                                className={`group bg-white rounded-2xl border border-slate-200 p-6 transition-all duration-300 ${subject.status === 'available'
                                        ? 'hover:border-primary-200 hover:shadow-lg cursor-pointer'
                                        : 'opacity-70 cursor-not-allowed hover:bg-slate-50'
                                    }`}
                                aria-disabled={subject.status !== 'available'}
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`w-14 h-14 rounded-xl ${subject.color} flex items-center justify-center`}>
                                        <subject.icon className="w-7 h-7" />
                                    </div>
                                    {subject.status === 'coming_soon' && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
                                            Coming Soon
                                        </span>
                                    )}
                                    {subject.status === 'available' && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                                            เปิดให้เรียนแล้ว
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary-600 transition-colors">
                                    {subject.name}
                                </h3>
                                <div className="text-sm font-medium text-slate-500 mb-3">{subject.nameTh}</div>

                                <p className="text-slate-500 mb-6 min-h-[3rem] text-sm">
                                    {subject.description}
                                </p>

                                <div className="flex items-center gap-4 text-sm text-slate-400 border-t border-slate-100 pt-4">
                                    <div className="flex items-center gap-1.5">
                                        <BookOpen className="w-4 h-4" />
                                        <span>{subject.lessons} บทเรียน</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">เรียนรู้กับ Tiudo ดียังไง?</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
                                <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mx-auto mb-6`}>
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
                            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                                <span className="font-bold text-lg">T</span>
                            </div>
                            <div>
                                <span className="text-xl font-bold text-slate-900 block">Tiudo</span>
                                <span className="text-xs text-slate-500">Learning Platform</span>
                            </div>
                        </div>
                        <p className="text-slate-500 text-sm">
                            © 2026 Tiudo. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
