'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ChevronRight, Loader2 } from 'lucide-react';

interface Section {
    title: string;
    content: string;
    keyPoints: string[];
}

interface SummaryData {
    topicId: string;
    title: string;
    sections: Section[];
}

export default function SummaryPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [summary, setSummary] = useState<SummaryData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

    useEffect(() => {
        async function fetchSummary() {
            try {
                const res = await fetch(`/api/summaries/${slug}`);
                if (!res.ok) throw new Error('Summary not found');
                const data = await res.json();
                setSummary(data);
                // Expand all sections by default
                setExpandedSections(new Set(data.sections.map((_: Section, i: number) => i)));
            } catch (err) {
                setError('ไม่พบเนื้อหาสรุป');
            } finally {
                setLoading(false);
            }
        }
        fetchSummary();
    }, [slug]);

    const toggleSection = (index: number) => {
        setExpandedSections(prev => {
            const next = new Set(prev);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }
            return next;
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
                    <p className="text-slate-600">กำลังโหลดเนื้อหา...</p>
                </div>
            </div>
        );
    }

    if (error || !summary) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error || 'เกิดข้อผิดพลาด'}</p>
                    <button
                        onClick={() => router.back()}
                        className="text-blue-500 hover:underline"
                    >
                        กลับหน้าก่อนหน้า
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>กลับ</span>
                    </button>
                    <Link
                        href={`/quiz/${slug}`}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                    >
                        <BookOpen className="w-4 h-4" />
                        <span>ทำข้อสอบ</span>
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        📖 {summary.title}
                    </h1>
                    <p className="text-slate-500">
                        สรุปเนื้อหาจากเอกสารการสอน
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-4">
                    {summary.sections.map((section, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
                        >
                            {/* Section Header */}
                            <button
                                onClick={() => toggleSection(index)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-semibold text-sm">
                                        {index + 1}
                                    </span>
                                    <h2 className="text-lg font-semibold text-slate-900">
                                        {section.title}
                                    </h2>
                                </div>
                                <ChevronRight
                                    className={`w-5 h-5 text-slate-400 transition-transform ${expandedSections.has(index) ? 'rotate-90' : ''
                                        }`}
                                />
                            </button>

                            {/* Section Content */}
                            {expandedSections.has(index) && (
                                <div className="px-6 pb-6 border-t border-slate-100">
                                    <p className="text-slate-600 mt-4 mb-4">
                                        {section.content}
                                    </p>
                                    <ul className="space-y-2">
                                        {section.keyPoints.map((point, pointIndex) => (
                                            <li
                                                key={pointIndex}
                                                className="flex items-start gap-3 text-slate-700"
                                            >
                                                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer CTA */}
                <div className="mt-8 text-center">
                    <Link
                        href={`/quiz/${slug}`}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
                    >
                        <BookOpen className="w-5 h-5" />
                        <span>เริ่มทำข้อสอบ</span>
                    </Link>
                </div>
            </main>
        </div>
    );
}
