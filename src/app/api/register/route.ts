import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { prisma as db } from "@/lib/db"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, password, name } = body

        // Manual validation
        if (!email || !email.includes("@")) {
            return NextResponse.json({ message: "Invalid email address" }, { status: 400 })
        }
        if (!password || password.length < 6) {
            return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 })
        }
        if (!name || name.length < 2) {
            return NextResponse.json({ message: "Name must be at least 2 characters" }, { status: 400 })
        }

        // Check if email already exists
        const existingUser = await db.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { user: null, message: "User with this email already exists" },
                { status: 409 }
            )
        }

        // Hash password
        const hashedPassword = await hash(password, 10)

        // Create new user
        const newUser = await db.user.create({
            data: {
                email,
                passwordHash: hashedPassword,
                displayName: name,
            },
        })

        // Remove password from response
        const { passwordHash, ...rest } = newUser

        return NextResponse.json(
            { user: rest, message: "User created successfully" },
            { status: 201 }
        )
    } catch (error) {
        console.error("Registration error:", error)
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        )
    }
}
