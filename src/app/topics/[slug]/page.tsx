import Link from 'next/link'
import {
    ArrowLeft,
    BookOpen,
    Clock,
    ChevronRight,
    Home,
    List,
    PlayCircle
} from 'lucide-react'
import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'

// Dynamic route for topic detail
interface PageProps {
    params: { slug: string }
}

interface Section {
    title: string
    content: string
    keyPoints: string[]
}

interface TopicData {
    topicId: string
    title: string
    sections: Section[]
}

// Load topic data from JSON files
async function getTopicData(slug: string): Promise<TopicData | null> {
    try {
        const summaryPath = path.join(process.cwd(), 'content', 'summaries', `${slug}.json`)
        const summaryData = JSON.parse(fs.readFileSync(summaryPath, 'utf-8'))
        return summaryData
    } catch (error) {
        console.error(`Error loading topic ${slug}:`, error)
        return null
    }
}

export default async function TopicDetailPage({ params }: PageProps) {
    const topic = await getTopicData(params.slug)

    if (!topic) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-black font-sans text-slate-200">
            {/* Header */}
            <div className="bg-black/80 backdrop-blur-xl border-b border-white/10 sticky top-16 z-40 transition-all duration-200">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/topics"
                            className="p-2 -ml-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="font-bold text-white line-clamp-1 text-lg">{topic.title}</h1>
                    </div>
                </div>
            </div>

            {/* Breadcrumb & Meta */}
            <div className="bg-black/50 border-b border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-900/10 blur-3xl pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 relative z-10">
                    <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6 overflow-x-auto whitespace-nowrap pb-1">
                        <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
                            <Home className="w-3.5 h-3.5" />
                            หน้าแรก
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-slate-600" />
                        <Link href="/topics" className="hover:text-white transition-colors">หัวข้อการเรียนรู้</Link>
                        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-slate-600" />
                        <span className="text-white font-medium">{topic.title}</span>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-500 font-medium uppercase">เวลาอ่าน</span>
                                    <span className="text-white font-semibold">~5 นาที</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                    <BookOpen className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-500 font-medium uppercase">เนื้อหา</span>
                                    <span className="text-white font-semibold">{topic.sections.length} หัวข้อ</span>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={`/quiz/${params.slug}`}
                            className="btn-primary flex items-center justify-center gap-2 px-6 py-2.5 shadow-lg shadow-primary-500/20 group"
                        >
                            <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span>เริ่มทำแบบทดสอบ</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
                {/* Table of Contents - Desktop Sticky */}
                <div className="hidden lg:block lg:col-span-1">
                    <div className="sticky top-40 space-y-6">
                        <div className="glass-panel rounded-2xl p-6">
                            <div className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider text-xs mb-4">
                                <List className="w-4 h-4 text-primary-400" />
                                สารบัญเนื้อหา
                            </div>
                            <nav className="space-y-1">
                                {topic.sections.map((section, index) => (
                                    <a
                                        key={index}
                                        href={`#section-${index}`}
                                        className="block text-sm text-slate-400 hover:text-white hover:bg-white/5 px-3 py-2.5 rounded-lg transition-all border-l-2 border-transparent hover:border-primary-500"
                                    >
                                        <span className="mr-2 text-xs text-slate-600 hover:text-slate-400 transition-colors">{index + 1}.</span>
                                        {section.title}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <main className="lg:col-span-3 space-y-12">
                    {topic.sections.map((section, index) => (
                        <section key={index} id={`section-${index}`} className="scroll-mt-40 group">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600/20 to-primary-900/20 border border-primary-500/30 text-primary-400 flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(99,102,241,0.15)] group-hover:scale-110 transition-transform duration-500">
                                    {index + 1}
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                                    {section.title}
                                </h2>
                            </div>

                            <div className="glass-panel rounded-3xl p-6 md:p-10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />

                                <p className="text-lg text-slate-300 leading-relaxed mb-8 font-light relative z-10">
                                    {section.content}
                                </p>

                                <div className="bg-black/30 rounded-2xl p-6 border border-white/5 relative z-10 backdrop-blur-sm">
                                    <h3 className="text-sm font-bold text-primary-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-400 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                                        ประเด็นสำคัญ
                                    </h3>
                                    <ul className="grid gap-3">
                                        {section.keyPoints.map((point, pointIndex) => (
                                            <li
                                                key={pointIndex}
                                                className="flex items-start gap-4 text-slate-400 group/item hover:text-slate-200 transition-colors"
                                            >
                                                <span className="w-1.5 h-1.5 bg-slate-600 rounded-full mt-2.5 flex-shrink-0 group-hover/item:bg-primary-400 transition-colors"></span>
                                                <span className="leading-relaxed">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>
                    ))}

                    {/* CTA: Start Quiz */}
                    <div className="glass-panel p-1 rounded-3xl mt-16">
                        <div className="bg-gradient-to-br from-slate-900 to-black rounded-[20px] p-8 md:p-16 text-center text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 opacity-10 animate-pulse">
                                <PlayCircle className="w-96 h-96 -mr-32 -mt-32 text-primary-500" />
                            </div>
                            <div className="absolute bottom-0 left-0 opacity-10">
                                <div className="w-64 h-64 bg-primary-500 blur-[100px] rounded-full -ml-32 -mb-32"></div>
                            </div>

                            <div className="relative z-10 max-w-2xl mx-auto">
                                <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">พร้อมทดสอบความรู้แล้วหรือยัง?</h2>
                                <p className="text-slate-400 mb-10 text-lg font-light leading-relaxed">
                                    ทบทวนเนื้อหาครบแล้ว ลองทำแบบทดสอบเพื่อวัดระดับความเข้าใจของคุณกันเถอะ<br className="hidden md:block" /> มีทั้งหมด 20 ข้อ รอให้คุณมาพิชิต
                                </p>
                                <Link
                                    href={`/quiz/${params.slug}`}
                                    className="inline-flex items-center justify-center gap-3 bg-white text-black font-bold py-4 px-10 rounded-2xl transition-all hover:scale-105 hover:bg-slate-200 shadow-[0_0_30px_rgba(255,255,255,0.15)] group"
                                >
                                    <PlayCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                                    <span className="text-lg">เริ่มทำแบบทดสอบ</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export async function generateStaticParams() {
    return [
        { slug: 'bigdata' },
        { slug: 'iot' },
        { slug: 'blockchain' },
        { slug: 'quantum' },
        { slug: 'wireless' },
        { slug: '5g' },
        { slug: 'ai' },
    ]
}

