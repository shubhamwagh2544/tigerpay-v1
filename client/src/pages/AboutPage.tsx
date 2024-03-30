import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
    const navigate = useNavigate();
    return (
        <div className="bg-purple-700">
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white shadow-md rounded-lg p-8 max-w-[800px]">
                    <h1 className="text-3xl font-bold mb-4 tracking-tighter">About TigerPay</h1>
                    <p className="text-lg mb-6">
                        Welcome to our app! Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <h2 className="text-2xl font-bold mb-4 tracking-tighter">Features</h2>
                    <ul className="list-disc pl-6 mb-6">
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>Consectetur adipiscing elit</li>
                        <li>Sed do eiusmod tempor incididunt</li>
                        <li>Ut labore et dolore magna aliqua</li>
                    </ul>
                    <h2 className="text-2xl font-bold mb-4 tracking-tighter">Contact Me</h2>
                    <p className="text-lg mb-6">
                        If you have any questions or feedback, feel free to contact me at:
                        <a href="mailto:shubhamwagh2544@gmail.com"
                            className="text-purple-700 font-semibold ml-2 tracking-tighter hover:underline"
                        >
                            Shubham Here 👋
                        </a>
                    </p>
                    {/* <button
                        className="bg-purple-700 text-white p-3 rounded font-semibold tracking-tighter hover:bg-purple-800"
                        onClick={() => navigate("/")}
                    >
                        Go To HomePage
                    </button> */}
                    <Button
                        variant="default"
                        className="py-5 hover:bg-purple-700"
                        onClick={() => navigate("/")}
                    >
                        Go To HomePage
                    </Button>
                </div>
            </div>
        </div>
    )
}