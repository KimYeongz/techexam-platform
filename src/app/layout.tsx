import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'TechExam - ติวข้อสอบเทคโนโลยี',
    description: 'เว็บไซต์ติวข้อสอบเทคโนโลยีครบ 7 หัวข้อ พร้อมสรุปเนื้อหา ข้อสอบ 140 ข้อ และระบบติดตามผล',
    keywords: ['ติวสอบ', 'เทคโนโลยี', 'Big Data', 'IoT', 'AI', 'Blockchain', '5G', 'ข้อสอบ'],
    authors: [{ name: 'TechExam' }],
    openGraph: {
        title: 'TechExam - ติวข้อสอบเทคโนโลยี',
        description: 'เว็บไซต์ติวข้อสอบเทคโนโลยีครบ 7 หัวข้อ พร้อมสรุปเนื้อหา ข้อสอบ 140 ข้อ และระบบติดตามผล',
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

