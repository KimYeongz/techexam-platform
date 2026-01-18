import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// GET single topic with summary
export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const summaryPath = path.join(process.cwd(), 'content', 'summaries', `${params.slug}.json`)

        if (!fs.existsSync(summaryPath)) {
            return NextResponse.json({ error: 'Topic not found' }, { status: 404 })
        }

        const summaryData = JSON.parse(fs.readFileSync(summaryPath, 'utf-8'))

        // Get question count
        const questionsPath = path.join(process.cwd(), 'content', 'questions', `${params.slug}.json`)
        let questionCount = 0
        if (fs.existsSync(questionsPath)) {
            const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'))
            questionCount = questionsData.totalQuestions || 0
        }

        return NextResponse.json({
            ...summaryData,
            questionCount
        })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load topic' }, { status: 500 })
    }
}
