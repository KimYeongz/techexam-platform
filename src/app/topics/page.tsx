
import Link from 'next/link'
import {
    ArrowLeft,
    BookOpen,
    Clock,
    Database,
    Wifi,
    Link as LinkIcon,
    Cpu,
    Radio,
    Zap,
    Brain,
    ChevronRight,
    Circle
} from 'lucide-react'

// Topic data with icons
const topicsData = [
    {
        slug: 'bigdata',
        nameTh: 'Big Data (ข้อมูลขนาดใหญ่)',
        nameEn: 'Big Data',
        icon: Database,
        color: 'from-blue-500 to-cyan-500',
        readingTime: 6,
        questions: 20,
        description: '3Vs, 5Vs, Hadoop, Spark, HDFS, MapReduce'
    },
    {
        slug: 'iot',
        nameTh: 'Internet of Things',
        nameEn: 'IoT',
        icon: Wifi,
        color: 'from-green-500 to-emerald-500',
        readingTime: 7,
        questions: 20,
        description: 'MQTT, CoAP, Edge Computing, Smart Home'
    },
    {
        slug: 'blockchain',
        nameTh: 'Blockchain และ Cryptocurrencies',
        nameEn: 'Blockchain',
        icon: LinkIcon,
        color: 'from-purple-500 to-violet-500',
        readingTime: 7,
        questions: 20,
        description: 'PoW, PoS, Smart Contracts, DeFi, NFT'
    },
    {
        slug: 'quantum',
        nameTh: 'Quantum Computing',
        nameEn: 'Quantum Computing',
        icon: Cpu,
        color: 'from-pink-500 to-rose-500',
        readingTime: 6,
        questions: 20,
        description: 'Qubit, Superposition, Entanglement, Shor, Grover'
    },
    {
        slug: 'wireless',
        nameTh: 'Wireless Network',
        nameEn: 'Wireless Network',
        icon: Radio,
        color: 'from-amber-500 to-orange-500',
        readingTime: 6,
        questions: 20,
        description: 'WiFi 802.11, WPA2/WPA3, CSMA/CA, Bluetooth'
    },
    {
        slug: '5g',
        nameTh: '5G Technology',
        nameEn: '5G Technology',
        icon: Zap,
        color: 'from-red-500 to-pink-500',
        readingTime: 6,
        questions: 20,
        description: 'eMBB, URLLC, mMTC, mmWave, Network Slicing'
    },
    {
        slug: 'ai',
        nameTh: 'AI (Artificial Intelligence)',
        nameEn: 'Artificial Intelligence',
        icon: Brain,
        color: 'from-indigo-500 to-purple-500',
        readingTime: 7,
        questions: 20,
        description: 'ML, DL, CNN, RNN, Transformer, NLP'
    }
]

export default function TopicsPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>กลับหน้าแรก</span>
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">เทคโนโลยีแห่งอนาคต</h1>
                            <p className="text-slate-500">รวมบทเรียน AI, Big Data, Blockchain, IoT และ 5G</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                        <div className="text-3xl font-bold text-slate-900 mb-1">7</div>
                        <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">หัวข้อทั้งหมด</div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                        <div className="text-3xl font-bold text-primary-600 mb-1">140</div>
                        <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">ข้อสอบรวม</div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                        <div className="text-3xl font-bold text-emerald-600 mb-1">45m</div>
                        <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">เวลาโดยประมาณ</div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary-200 transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">ดูความคืบหน้า</div>
                    </div>
                </div>

                {/* Topics Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {topicsData.map((topic, index) => (
                        <Link
                            key={topic.slug}
                            href={`/topics/${topic.slug}`}
                            className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300 relative overflow-hidden"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <topic.icon className="w-24 h-24 transform rotate-12" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-white shadow-md`}>
                                        <topic.icon className="w-6 h-6" />
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>

                                <h2 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-primary-600 transition-colors">
                                    {topic.nameEn}
                                </h2>
                                <h3 className="text-sm text-slate-500 mb-3 font-medium">
                                    {topic.nameTh}
                                </h3>

                                <p className="text-sm text-slate-400 mb-6 line-clamp-2 h-10">
                                    {topic.description}
                                </p>

                                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 pt-4 border-t border-slate-100">
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4 text-slate-400" />
                                        {topic.readingTime} นาที
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <BookOpen className="w-4 h-4 text-slate-400" />
                                        {topic.questions} ข้อ
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    )
}

