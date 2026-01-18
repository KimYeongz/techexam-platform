import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const questionsPath = path.join(process.cwd(), 'content', 'questions', `${params.slug}.json`)

        if (!fs.existsSync(questionsPath)) {
            return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
        }

        const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'))
        return NextResponse.json(questionsData)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load quiz' }, { status: 500 })
    }
}
