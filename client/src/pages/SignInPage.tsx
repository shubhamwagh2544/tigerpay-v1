import React, { useState } from "react";
import axios from "axios";
import BACKEND_URL from "../global.ts";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SignInPage() {

    const [state, setState] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    async function handleSubmit() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/user/signin`, state, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (response.status === 200) {
                toast.success(`Hola, ${response.data.user.firstname} ${response.data.user.lastname} !`)
            }
            
            const { token } = response.data
            localStorage.setItem('token', token)

            navigate("/profile")
        }
        catch (error: any) {
            if (error.response.status === 404) {
                toast.success("Account not found! Please sign up!")
            }
            else {
                toast.error("Something went wrong!")
            }
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
                    <div className="flex flex-col gap-4 mt-4">
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
                    </div>
                    <div className="text-center mt-5">
                        <span className="text-sm">
                            Don't Have an Account ?
                            <Link to="/signup" className="text-blue-500"> Sign Up</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
} 