import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Tiudo - เว็บไซต์ติวข้อสอบ',
    description: 'Tiudo แพลตฟอร์มการเรียนรู้ครบวงจร รวมเนื้อหาติวสอบหลากหลายวิชา',
    keywords: ['ติวสอบ', 'Tiudo', 'เรียนออนไลน์', 'ข้อสอบ'],
    authors: [{ name: 'Tiudo' }],
    openGraph: {
        title: 'Tiudo - เว็บไซต์ติวข้อสอบ',
        description: 'Tiudo แพลตฟอร์มการเรียนรู้ครบวงจร รวมเนื้อหาติวสอบหลากหลายวิชา',
        type: 'website',
        locale: 'th_TH',
    },
}


import { Providers } from '@/components/Providers'
import { Navbar } from '@/components/Navbar'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="th">
            <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
                <Providers>
                    <Navbar />
                    <main className="flex-1">
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    )
}

