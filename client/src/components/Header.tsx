import { Link, useNavigate } from "react-router-dom";
import AccountDropdown from "./AccountDropdown";
import ProfileDropdown from "./ProfileDropdown";
import { Button } from "./ui/button";

export default function Header() {

    const navigate = useNavigate()
    const token = localStorage.getItem('token')

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
                    TigerPay <span className="text-sm">made with ❤️</span>
                </Link>
                {
                    token ? (
                        <div>
                            <div className="flex gap-5">
                                <Button
                                    variant={"outline"}
                                    onClick={() => {
                                        navigate("/users")
                                    }}
                                >
                                    Friends
                                </Button>
                                <Button
                                    variant={"outline"}
                                    onClick={() => {
                                        navigate("/dashboard")
                                    }}
                                >
                                    Dashboard
                                </Button>
                                <AccountDropdown />
                                <ProfileDropdown />
                                <Button
                                    className="hover:bg-red-500"
                                    onClick={() => {
                                        localStorage.removeItem('token')
                                        navigate("/")
                                    }}
                                >
                                    Sign Out
                                </Button>
                            </div>
                        </div>

                    ) : (
                        <div className="flex gap-5">
                            <Button
                                variant="outline"
                                onClick={() => navigate("/about")}
                            >
                                About
                            </Button>
                            <Button
                                className="hover:bg-green-500 hover:text-black"
                                onClick={handleLogin}
                            >
                                Sign In
                            </Button>
                        </div>
                    )
                }
            </div>
        </div >
    )
}