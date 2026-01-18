
"use client"

import { useState, useEffect, Suspense } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
    return (
        <div className="container relative flex h-screen w-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            {/* Left Side: Brand/Illustration */}
            <div className="relative hidden h-full flex-col bg-black p-10 text-white lg:flex dark:border-r overflow-hidden">
                {/* Spotlight Effect */}
                <div className="absolute inset-0 z-0 opacity-60">
                    <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-full blur-3xl" />
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
                            "สิ่งที่งดงามเกี่ยวกับการเรียนรู้ คือไม่มีใครสามารถพรากมันไปจากคุณได้"
                        </p>
                        <footer className="text-sm pt-4 text-slate-400 uppercase tracking-widest">
                            บี.บี. คิง
                        </footer>
                    </blockquote>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="lg:p-8 w-full max-w-md mx-auto">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            ยินดีต้อนรับกลับมา
                        </h1>
                        <p className="text-sm text-slate-400">
                            เข้าสู่ระบบเพื่อติดตามความก้าวหน้าของคุณ
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <Suspense fallback={<div className="flex justify-center"><Loader2 className="animate-spin text-primary-500" /></div>}>
                            <div className="grid gap-4">
                                <LoginForm />
                            </div>
                        </Suspense>
                    </div>

                    <p className="px-8 text-center text-sm text-slate-400">
                        ยังไม่มีบัญชี?{" "}
                        <Link href="/register" className="hover:text-primary-400 underline underline-offset-4 font-medium transition-colors text-white">
                            สมัครสมาชิก
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
        if (searchParams.get("registered") === "true") {
            setSuccess("สร้างบัญชีเรียบร้อยแล้ว กรุณาเข้าสู่ระบบ")
        }
    }, [searchParams])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            const res = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            })

            if (res?.error) {
                setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง")
            } else {
                router.push("/profile")
                router.refresh()
            }
        } catch (_) {
            setError("เกิดข้อผิดพลาด กรุณาลองใหม่")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
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
                    />
                </div>

                {success && (
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        {success}
                    </div>
                )}
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
                        "เข้าสู่ระบบ"
                    )}
                </button>
            </div>
        </form>
    )
}
