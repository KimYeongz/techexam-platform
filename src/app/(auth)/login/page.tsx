
"use client"

import { useState, useEffect } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
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
        <div className="container relative flex h-screen w-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            {/* Left Side: Brand/Illustration */}
            <div className="relative hidden h-full flex-col bg-slate-900 p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-accent-600" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur mr-2 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5"
                        >
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                    </div>
                    TechExam
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;การเรียนรู้คือการลงทุนที่ให้ผลตอบแทนดีที่สุด เตรียมพร้อมสำหรับอนาคตของคุณได้ตั้งแต่วันนี้&rdquo;
                        </p>
                    </blockquote>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="lg:p-8 w-full max-w-md mx-auto">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            ยินดีต้อนรับกลับมา
                        </h1>
                        <p className="text-sm text-slate-500">
                            เข้าสู่ระบบเพื่อติดตามความก้าวหน้าของคุณ
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">อีเมล</label>
                                    <input
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        className="input"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">รหัสผ่าน</label>
                                    <input
                                        id="password"
                                        type="password"
                                        className="input"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                {success && (
                                    <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600 text-sm font-medium flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                        {success}
                                    </div>
                                )}
                                {error && (
                                    <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="btn-primary w-full h-11"
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
                    </div>

                    <p className="px-8 text-center text-sm text-slate-500">
                        ยังไม่มีบัญชี?{" "}
                        <Link href="/register" className="hover:text-primary-600 underline underline-offset-4 font-medium transition-colors">
                            สมัครสมาชิก
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
