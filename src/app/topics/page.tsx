
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
        <div className="min-h-screen bg-black text-slate-200">
            {/* Header - Dark Theme */}
            <div className="relative overflow-hidden bg-black pt-24 pb-32">
                {/* Spotlight Effect */}
                <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
                    <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-white/20 via-white/5 to-transparent rounded-full blur-3xl transform -rotate-12" />
                </div>
                {/* Particles/Dust Effect */}
                <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>กลับหน้าแรก</span>
                    </Link>

                    <div className="text-center md:text-left relative">
                        {/* Typography Composition */}
                        <div className="relative inline-block">
                            <span className="font-script text-4xl md:text-5xl text-white block opacity-90 transform -rotate-6 translate-y-4 -translate-x-4 z-10 relative drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                                Future
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 uppercase leading-none">
                                TECHNOLOGY
                            </h1>
                        </div>
                        <p className="text-lg text-slate-400 mt-6 max-w-xl font-light tracking-wide">
                            สำรวจโลกแห่งเทคโนโลยีอนาคต AI, Big Data, Blockchain และ IoT
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content - Pull up to overlap */}
            <main className="max-w-6xl mx-auto px-4 py-8 -mt-20 relative z-20">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                        <div className="text-3xl font-bold text-white mb-1">7</div>
                        <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">หัวข้อทั้งหมด</div>
                    </div>
                    <div className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                        <div className="text-3xl font-bold text-primary-400 mb-1">140</div>
                        <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">ข้อสอบรวม</div>
                    </div>
                    <div className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                        <div className="text-3xl font-bold text-emerald-400 mb-1">45m</div>
                        <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">เวลาโดยประมาณ</div>
                    </div>
                    <div className="glass-panel hover:bg-white/10 transition-colors cursor-pointer rounded-2xl p-4 flex flex-col items-center justify-center text-center group">
                        <div className="w-10 h-10 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">ดูความคืบหน้า</div>
                    </div>
                </div>

                {/* Topics Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {topicsData.map((topic, index) => (
                        <Link
                            key={topic.slug}
                            href={`/topics/${topic.slug}`}
                            className="glass-card group p-8 rounded-3xl block"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <topic.icon className="w-24 h-24 transform rotate-12 text-white" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-white shadow-lg`}>
                                        <topic.icon className="w-7 h-7" />
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-primary-500 group-hover:text-white transition-all">
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                                    {topic.nameEn}
                                </h2>
                                <h3 className="text-sm text-slate-400 mb-4 font-normal font-thai opacity-80">
                                    {topic.nameTh}
                                </h3>

                                <p className="text-sm text-slate-500 mb-6 line-clamp-2 h-10 leading-relaxed font-light">
                                    {topic.description}
                                </p>

                                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 pt-4 border-t border-white/10 uppercase tracking-wider">
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="w-3 h-3" />
                                        {topic.readingTime} MINS
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <BookOpen className="w-3 h-3" />
                                        {topic.questions} QUESTS
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

