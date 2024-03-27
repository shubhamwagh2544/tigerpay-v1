export default function Footer() {
    return (
        <div className="bg-purple-700 py-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <span className="text-3xl text-white tracking-tighter font-bold">
                    TigerPay &copy; 2024
                </span>
                <span className="text-white font-bold tracking-tighter flex gap-4">
                    <span>
                        Privay Policy
                    </span>
                    <span>
                        Terms of Service
                    </span>
                </span>
            </div>
        </div>
    )
}