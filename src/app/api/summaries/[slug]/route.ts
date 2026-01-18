import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const slug = params.slug;
        const summaryPath = path.join(process.cwd(), 'content', 'summaries', `${slug}.json`);

        if (!fs.existsSync(summaryPath)) {
            return NextResponse.json(
                { error: 'Summary not found' },
                { status: 404 }
            );
        }

        const summaryData = JSON.parse(fs.readFileSync(summaryPath, 'utf-8'));

        return NextResponse.json(summaryData);
    } catch (error) {
        console.error('Error loading summary:', error);
        return NextResponse.json(
            { error: 'Failed to load summary' },
            { status: 500 }
        );
    }
}
