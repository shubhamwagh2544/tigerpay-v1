import React, { useState } from "react";
import axios from "axios";
import BACKEND_URL from "../global.ts";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {

    const [state, setState] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState("")
    const navigate = useNavigate()

    async function handleSubmit() {
        const response = await axios.post(`${BACKEND_URL}/api/signin`, state, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.data.error) {
            setError(response.data.error)
        }
        else {
            localStorage.setItem("token", response.data.token)
            navigate('/profile')
        }
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setState({
            ...state,
            [name]: value
        })
    }

    return (
        <div>
            <div className="container mx-auto flex justify-center items-center h-screen py-10">
                <div className="w-96">
                    <h1 className="text-3xl font-bold text-center">Sign In</h1>
                    <form className="flex flex-col gap-4 mt-4">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            className="p-3 border border-gray-300 rounded"
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="p-3 border border-gray-300 rounded"
                            onChange={handleInputChange}
                        />
                        <button
                            type="submit"
                            className="bg-purple-700 text-white p-3 rounded"
                            onClick={handleSubmit}
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
} 