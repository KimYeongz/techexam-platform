import Link from 'next/link'
import { Home, BookOpen, BarChart3, User } from 'lucide-react'

interface NavbarProps {
    currentPath?: string
}

export function Navbar({ currentPath = '/' }: NavbarProps) {
    const navItems = [
        { href: '/', icon: Home, label: 'หน้าแรก' },
        { href: '/topics', icon: BookOpen, label: 'หัวข้อ' },
        { href: '/dashboard', icon: BarChart3, label: 'Dashboard' },
        { href: '/login', icon: User, label: 'โปรไฟล์' },
    ]

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 md:hidden">
            <div className="flex items-center justify-around py-2">
                {navItems.map((item) => {
                    const isActive = currentPath === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${isActive
                                    ? 'text-primary-600'
                                    : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-xs">{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}

export function DesktopHeader() {
    return (
        <header className="hidden md:block bg-white border-b border-slate-200">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white flex items-center justify-center font-bold">
                        TE
                    </div>
                    <span className="text-xl font-bold text-slate-900">TechExam</span>
                </Link>

                <nav className="flex items-center gap-6">
                    <Link href="/topics" className="text-slate-600 hover:text-primary-600 transition-colors">
                        หัวข้อทั้งหมด
                    </Link>
                    <Link href="/dashboard" className="text-slate-600 hover:text-primary-600 transition-colors">
                        Dashboard
                    </Link>
                    <Link href="/login" className="btn-primary">
                        เข้าสู่ระบบ
                    </Link>
                </nav>
            </div>
        </header>
    )
}
