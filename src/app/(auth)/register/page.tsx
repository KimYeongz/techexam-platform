
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Loader2 } from "lucide-react"

export default function RegisterPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (formData.password !== formData.confirmPassword) {
            setError("รหัสผ่านไม่ตรงกัน")
            return
        }

        setIsLoading(true)

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }),
            })

            if (res.ok) {
                router.push("/login?registered=true")
            } else {
                const data = await res.json()
                setError(data.message || "เกิดข้อผิดพลาด")
            }
        } catch (_) {
            setError("เกิดข้อผิดพลาด กรุณาลองใหม่")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container relative flex h-screen w-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            {/* Right Side: Brand/Illustration (Swapped for Register) */}
            <div className="relative hidden h-full flex-col bg-black p-10 text-white lg:flex lg:order-2 dark:border-l overflow-hidden">
                {/* Spotlight Effect */}
                <div className="absolute inset-0 z-0 opacity-60">
                    <div className="absolute top-[-20%] right-[-20%] w-[600px] h-[600px] bg-gradient-to-bl from-white/20 via-white/5 to-transparent rounded-full blur-3xl" />
                </div>
                <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                <div className="relative z-20 flex items-center text-lg font-medium">
                    <span className="font-script text-3xl mr-2">Tiudo</span>
                    <span className="bg-white/10 px-2 py-0.5 rounded text-xs tracking-widest uppercase font-bold">Platform</span>
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <div className="font-script text-5xl opacity-20 absolute -top-10 -left-4">“</div>
                        <p className="text-xl font-light tracking-wide leading-relaxed">
                            "จงเริ่มจากจุดที่คุณอยู่ ใช้สิ่งที่คุณมี และทำในสิ่งที่คุณทำได้"
                        </p>
                        <footer className="text-sm pt-4 text-slate-400 uppercase tracking-widest">
                            อาเธอร์ แอช
                        </footer>
                    </blockquote>
                </div>
            </div>

            {/* Left Side: Form */}
            <div className="lg:p-8 w-full max-w-md mx-auto lg:order-1">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            สร้างบัญชีใหม่
                        </h1>
                        <p className="text-sm text-slate-400">
                            กรอกข้อมูลด้านล่างเพื่อสมัครสมาชิก
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <label htmlFor="name" className="text-sm font-medium leading-none text-slate-200">ชื่อ-นามสกุล</label>
                                    <input
                                        id="name"
                                        placeholder="สมชาย ใจดี"
                                        type="text"
                                        className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white ring-offset-black file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:bg-white/10"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="email" className="text-sm font-medium leading-none text-slate-200">อีเมล</label>
                                    <input
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white ring-offset-black file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:bg-white/10"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="password" className="text-sm font-medium leading-none text-slate-200">รหัสผ่าน</label>
                                    <input
                                        id="password"
                                        type="password"
                                        className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white ring-offset-black file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:bg-white/10"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                        disabled={isLoading}
                                        minLength={6}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="confirmPassword" className="text-sm font-medium leading-none text-slate-200">ยืนยันรหัสผ่าน</label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white ring-offset-black file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:bg-white/10"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        required
                                        disabled={isLoading}
                                        minLength={6}
                                    />
                                </div>

                                {error && (
                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="btn-primary w-full h-11 shadow-lg shadow-primary-500/20"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        "สมัครสมาชิก"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    <p className="px-8 text-center text-sm text-slate-400">
                        มีบัญชีอยู่แล้ว?{" "}
                        <Link href="/login" className="hover:text-primary-400 underline underline-offset-4 font-medium transition-colors text-white">
                            เข้าสู่ระบบ
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
