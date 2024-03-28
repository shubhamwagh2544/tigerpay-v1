import { Link, useNavigate } from "react-router-dom";


export default function Header() {

    const navigate = useNavigate()

    function handleLogin() {
        navigate("/signin")
    }

    return (
        <div className="bg-purple-700 py-6">
            <div className="container mx-auto flex justify-between items-center">
                <Link
                    to="/"
                    className="text-3xl font-bold tracking-tight text-white"
                >
                    TigerPay
                </Link>
                <button
                    className="text-lg font-semibold tracking-tighter bg-purple-700 text-white"
                    onClick={handleLogin}
                >
                    Sign In
                </button>
            </div>
        </div>
    )
}