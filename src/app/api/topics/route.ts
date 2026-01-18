import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// GET all topics
export async function GET() {
    try {
        const summariesDir = path.join(process.cwd(), 'content', 'summaries')
        const files = fs.readdirSync(summariesDir)

        const topics = files
            .filter(file => file.endsWith('.json'))
            .map(file => {
                const data = JSON.parse(fs.readFileSync(path.join(summariesDir, file), 'utf-8'))
                const slug = file.replace('.json', '')

                // Get question count
                const questionsPath = path.join(process.cwd(), 'content', 'questions', file)
                let questionCount = 0
                if (fs.existsSync(questionsPath)) {
                    const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'))
                    questionCount = questionsData.totalQuestions || 0
                }

                return {
                    slug,
                    nameEn: data.nameEn,
                    nameTh: data.nameTh,
                    readingTimeMin: data.readingTimeMin,
                    questionCount,
                    tags: data.tags
                }
            })

        return NextResponse.json({ topics })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load topics' }, { status: 500 })
    }
}
