"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { LogOut, User, Menu, X, BookOpen } from "lucide-react"
import { useState } from "react"

export function Navbar() {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 group">
                    <span className="font-bold text-2xl tracking-tight text-white group-hover:text-primary-400 transition-colors font-english">
                        TiuDo
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    <Link href="/topics" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        บทเรียนทั้งหมด
                    </Link>

                    {session ? (
                        <div className="flex items-center pl-6 border-l border-white/10 space-x-4">
                            <Link
                                href="/profile"
                                className="flex items-center space-x-2 text-sm font-medium text-slate-200 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
                            >
                                <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400">
                                    <User className="w-4 h-4" />
                                </div>
                                <span>{session.user?.name || "Profile"}</span>
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="p-2 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2">
                                เข้าสู่ระบบ
                            </Link>
                            <Link
                                href="/register"
                                className="text-sm font-medium bg-primary-600 text-white px-5 py-2.5 rounded-full hover:bg-primary-500 shadow-lg shadow-primary-900/20 hover:shadow-primary-900/40 transition-all active:scale-95"
                            >
                                สมัครสมาชิก
                            </Link>
                        </div>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl">
                    <div className="container mx-auto px-4 py-4 space-y-4">
                        <Link
                            href="/topics"
                            className="block text-sm font-medium text-slate-300 hover:text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            บทเรียนทั้งหมด
                        </Link>
                        <hr className="border-white/10" />

                        {session ? (
                            <>
                                <Link
                                    href="/profile"
                                    className="flex items-center space-x-2 text-sm font-medium text-slate-200"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <User className="w-4 h-4" />
                                    <span>{session.user?.name}</span>
                                </Link>
                                <button
                                    onClick={() => {
                                        signOut({ callbackUrl: "/" })
                                        setIsOpen(false)
                                    }}
                                    className="flex items-center space-x-2 text-sm font-medium text-red-400"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>ออกจากระบบ</span>
                                </button>
                            </>
                        ) : (
                            <div className="space-y-3 pt-2">
                                <Link
                                    href="/login"
                                    className="block w-full text-center text-sm font-medium text-slate-300 border border-white/10 rounded-lg py-2.5 hover:bg-white/5"
                                    onClick={() => setIsOpen(false)}
                                >
                                    เข้าสู่ระบบ
                                </Link>
                                <Link
                                    href="/register"
                                    className="block w-full text-center text-sm font-medium bg-primary-600 text-white rounded-lg py-2.5 shadow-lg shadow-primary-900/20"
                                    onClick={() => setIsOpen(false)}
                                >
                                    สมัครสมาชิก
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}
