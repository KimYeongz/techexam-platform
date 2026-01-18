
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
            <div className="relative hidden h-full flex-col bg-slate-900 p-10 text-white lg:flex lg:order-2 dark:border-l">
                <div className="absolute inset-0 bg-gradient-to-bl from-primary-600 to-accent-600" />
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
                            &ldquo;เริ่มต้นเรียนรู้วันนี้ เพื่อโอกาสที่ดีกว่าในวันหน้า มาร่วมเป็นส่วนหนึ่งของชุมชนแห่งการเรียนรู้&rdquo;
                        </p>
                    </blockquote>
                </div>
            </div>

            {/* Left Side: Form */}
            <div className="lg:p-8 w-full max-w-md mx-auto lg:order-1">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            สร้างบัญชีใหม่
                        </h1>
                        <p className="text-sm text-slate-500">
                            กรอกข้อมูลด้านล่างเพื่อสมัครสมาชิก
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <label htmlFor="name" className="text-sm font-medium leading-none">ชื่อ-นามสกุล</label>
                                    <input
                                        id="name"
                                        placeholder="สมชาย ใจดี"
                                        type="text"
                                        className="input"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="email" className="text-sm font-medium leading-none">อีเมล</label>
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
                                    <label htmlFor="password" className="text-sm font-medium leading-none">รหัสผ่าน</label>
                                    <input
                                        id="password"
                                        type="password"
                                        className="input"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                        disabled={isLoading}
                                        minLength={6}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="confirmPassword" className="text-sm font-medium leading-none">ยืนยันรหัสผ่าน</label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        className="input"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        required
                                        disabled={isLoading}
                                        minLength={6}
                                    />
                                </div>

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
                                        "สมัครสมาชิก"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    <p className="px-8 text-center text-sm text-slate-500">
                        มีบัญชีอยู่แล้ว?{" "}
                        <Link href="/login" className="hover:text-primary-600 underline underline-offset-4 font-medium transition-colors">
                            เข้าสู่ระบบ
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
