
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma as db } from "@/lib/db"

export async function POST(req: Request) {
    const session = await getServerSession()

    if (!session || !session.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    try {
        const body = await req.json()
        const { topicSlug, score, totalQuestions, timeSeconds } = body

        // Find the user
        // We need to fetch user ID because session might not have it depending on config
        // But we configured session callback to include ID, let's verify.
        // If session.user.id exists usage is easier.
        // However, finding by email is safer if we want to be sure.
        const user = await db.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        // Find topic by slug
        const topic = await db.topic.findUnique({
            where: { slug: topicSlug }
        })

        if (!topic) {
            return NextResponse.json({ message: "Topic not found" }, { status: 404 })
        }

        // Save attempt
        const attempt = await db.attempt.create({
            data: {
                userId: user.id,
                topicId: topic.id,
                score,
                totalQuestions,
                timeSeconds,
                mode: 'normal' // default
            }
        })

        return NextResponse.json({ message: "Score saved", attemptId: attempt.id }, { status: 201 })
    } catch (error) {
        console.error("Score save error:", error)
        return NextResponse.json({ message: "Failed to save score" }, { status: 500 })
    }
}

export async function GET(req: Request) {
    const session = await getServerSession()
    if (!session || !session.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')

    try {
        const user = await db.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 })

        let attempts;
        if (slug) {
            // Get specific topic history
            attempts = await db.attempt.findMany({
                where: {
                    userId: user.id,
                    topic: { slug }
                },
                orderBy: { startedAt: 'desc' },
                take: 5
            })
        } else {
            // Get all history
            attempts = await db.attempt.findMany({
                where: { userId: user.id },
                include: { topic: true },
                orderBy: { startedAt: 'desc' },
                take: 20
            })
        }

        return NextResponse.json({ attempts })
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch scores" }, { status: 500 })
    }
}
