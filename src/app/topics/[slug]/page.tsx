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
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/topics"
                            className="p-2 -ml-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="font-bold text-slate-900 line-clamp-1">{topic.title}</h1>
                    </div>
                    <Link
                        href={`/quiz/${params.slug}`}
                        className="btn-primary flex items-center gap-2 text-sm px-4 h-9"
                    >
                        <PlayCircle className="w-4 h-4" />
                        <span className="hidden sm:inline">ทำข้อสอบ</span>
                    </Link>
                </div>
            </div>

            {/* Breadcrumb & Meta */}
            <div className="bg-white border-b border-slate-100">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4 overflow-x-auto whitespace-nowrap pb-1">
                        <Link href="/" className="hover:text-primary-600 flex items-center gap-1 transition-colors">
                            <Home className="w-3.5 h-3.5" />
                            หน้าแรก
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                        <Link href="/topics" className="hover:text-primary-600 transition-colors">หัวข้อการเรียนรู้</Link>
                        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="text-slate-900 font-medium">{topic.title}</span>
                    </nav>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Clock className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-400 font-medium uppercase">เวลาอ่านโดยประมาณ</span>
                                <span className="text-slate-900 font-semibold">~5 นาที</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <BookOpen className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-400 font-medium uppercase">เนื้อหา</span>
                                <span className="text-slate-900 font-semibold">{topic.sections.length} หัวข้อ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Table of Contents - Desktop Sticky */}
                <div className="hidden lg:block lg:col-span-1">
                    <div className="sticky top-24 space-y-4">
                        <div className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider text-xs">
                            <List className="w-4 h-4" />
                            สารบัญเนื้อหา
                        </div>
                        <nav className="space-y-1">
                            {topic.sections.map((section, index) => (
                                <a
                                    key={index}
                                    href={`#section-${index}`}
                                    className="block text-sm text-slate-600 hover:text-primary-600 hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors border-l-2 border-transparent hover:border-primary-300"
                                >
                                    {section.title}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <main className="lg:col-span-3 space-y-12">
                    {topic.sections.map((section, index) => (
                        <section key={index} id={`section-${index}`} className="scroll-mt-24">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white flex items-center justify-center font-bold text-lg shadow-md">
                                    {index + 1}
                                </span>
                                <h2 className="text-2xl font-bold text-slate-900">
                                    {section.title}
                                </h2>
                            </div>

                            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm">
                                <p className="text-lg text-slate-700 leading-relaxed mb-6 font-medium">
                                    {section.content}
                                </p>

                                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                                        ประเด็นสำคัญ
                                    </h3>
                                    <ul className="space-y-3">
                                        {section.keyPoints.map((point, pointIndex) => (
                                            <li
                                                key={pointIndex}
                                                className="flex items-start gap-3 text-slate-600"
                                            >
                                                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-2 flex-shrink-0"></span>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>
                    ))}

                    {/* CTA: Start Quiz */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-10">
                            <PlayCircle className="w-64 h-64 -mr-24 -mt-24" />
                        </div>
                        <div className="relative z-10 max-w-lg mx-auto">
                            <h2 className="text-3xl font-bold mb-4">พร้อมทดสอบความรู้แล้วหรือยัง?</h2>
                            <p className="text-slate-300 mb-8 text-lg">
                                ทบทวนเนื้อหาครบแล้ว ลองทำแบบทดสอบเพื่อวัดระดับความเข้าใจของคุณกันเถอะ มีทั้งหมด 20 ข้อ
                            </p>
                            <Link
                                href={`/quiz/${params.slug}`}
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-400 hover:to-accent-400 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-lg shadow-primary-500/30 w-full sm:w-auto"
                            >
                                <PlayCircle className="w-5 h-5" />
                                เริ่มทำแบบทดสอบ
                            </Link>
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

