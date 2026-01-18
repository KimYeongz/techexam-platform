"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { LogOut, User, Menu, X, BookOpen } from "lucide-react"
import { useState } from "react"

export function Navbar() {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white shadow-sm group-hover:bg-primary-700 transition-colors">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-primary-600 transition-colors">
                        TechExam
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    <Link href="/topics" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
                        บทเรียนทั้งหมด
                    </Link>

                    {session ? (
                        <div className="flex items-center pl-6 border-l border-slate-200 space-x-4">
                            <Link
                                href="/profile"
                                className="flex items-center space-x-2 text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors py-2 px-3 rounded-lg hover:bg-slate-50"
                            >
                                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                                    <User className="w-4 h-4" />
                                </div>
                                <span>{session.user?.name || "Profile"}</span>
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-primary-600 px-3 py-2">
                                เข้าสู่ระบบ
                            </Link>
                            <Link
                                href="/register"
                                className="text-sm font-medium bg-primary-600 text-white px-5 py-2.5 rounded-full hover:bg-primary-700 shadow-sm hover:shadow-md transition-all active:scale-95"
                            >
                                สมัครสมาชิก
                            </Link>
                        </div>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-600"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden border-t border-slate-100 bg-white">
                    <div className="container mx-auto px-4 py-4 space-y-4">
                        <Link
                            href="/topics"
                            className="block text-sm font-medium text-slate-600 hover:text-primary-600"
                            onClick={() => setIsOpen(false)}
                        >
                            บทเรียนทั้งหมด
                        </Link>
                        <hr className="border-slate-100" />

                        {session ? (
                            <>
                                <Link
                                    href="/profile"
                                    className="flex items-center space-x-2 text-sm font-medium text-slate-700"
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
                                    className="flex items-center space-x-2 text-sm font-medium text-red-600"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>ออกจากระบบ</span>
                                </button>
                            </>
                        ) : (
                            <div className="space-y-3 pt-2">
                                <Link
                                    href="/login"
                                    className="block w-full text-center text-sm font-medium text-slate-600 border border-slate-200 rounded-lg py-2.5"
                                    onClick={() => setIsOpen(false)}
                                >
                                    เข้าสู่ระบบ
                                </Link>
                                <Link
                                    href="/register"
                                    className="block w-full text-center text-sm font-medium bg-primary-600 text-white rounded-lg py-2.5 shadow-sm"
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
