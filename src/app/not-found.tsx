export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="text-center">
                <div className="text-8xl font-bold text-primary-500 mb-4">404</div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">ไม่พบหน้าที่ต้องการ</h1>
                <p className="text-slate-500 mb-8">หน้าที่คุณกำลังค้นหาอาจถูกย้ายหรือลบไปแล้ว</p>
                <a
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                >
                    ← กลับหน้าแรก
                </a>
            </div>
        </div>
    )
}
