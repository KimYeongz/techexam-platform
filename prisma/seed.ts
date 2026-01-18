import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding...')

    const topics = [
        {
            slug: 'bigdata',
            nameTh: 'Big Data',
            nameEn: 'Big Data',
            sortOrder: 1,
            summaryContent: 'Big Data concepts and Hadoop',
        },
        {
            slug: 'iot',
            nameTh: 'Internet of Things',
            nameEn: 'Internet of Things',
            sortOrder: 2,
            summaryContent: 'IoT devices and networking',
        },
        {
            slug: 'blockchain',
            nameTh: 'Blockchain',
            nameEn: 'Blockchain',
            sortOrder: 3,
            summaryContent: 'Blockchain, Cryptocurrency and DeFi',
        },
        {
            slug: 'quantum',
            nameTh: 'Quantum Computing',
            nameEn: 'Quantum Computing',
            sortOrder: 4,
            summaryContent: 'Quantum mechanics and Qubits',
        },
        {
            slug: 'wireless',
            nameTh: 'Wireless',
            nameEn: 'Wireless Technology',
            sortOrder: 5,
            summaryContent: 'Wireless communication standards',
        },
        {
            slug: '5g',
            nameTh: '5G',
            nameEn: '5G Technology',
            sortOrder: 6,
            summaryContent: '5G networks and future connectivity',
        },
        {
            slug: 'ai',
            nameTh: 'AI',
            nameEn: 'Artificial Intelligence',
            sortOrder: 7,
            summaryContent: 'AI, Machine Learning and Deep Learning',
        },
    ]

    for (const t of topics) {
        const topic = await prisma.topic.upsert({
            where: { slug: t.slug },
            update: {},
            create: {
                slug: t.slug,
                nameTh: t.nameTh,
                nameEn: t.nameEn,
                sortOrder: t.sortOrder,
                summaryContent: t.summaryContent,
                readingTimeMin: 5,
            },
        })
        console.log(`Upserted topic with id: ${topic.id}`)
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
