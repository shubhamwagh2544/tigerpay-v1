import BACKEND_URL from "@/global";
import { UserType } from "@/types/UserType";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {

    const [user, setUser] = useState<UserType>();

    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("Please sign in!")
                return;
            }
            const response = await axios.get(`${BACKEND_URL}/api/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUser(response.data.user)
        }
        fetchUser();
    }, [user])

    return (
        <div>
            <div className="container mx-auto flex justify-center items-center py-10 mt-10">
                <div className="w-96">
                    <h1 className="text-3xl font-bold text-center">Profile</h1>
                    <div className="flex flex-col gap-4 mt-4">
                        <input
                            type="text"
                            value={user?.firstname}
                            name="firstname"
                            placeholder="Firstname"
                            className="p-3 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            value={user?.lastname}
                            name="lastname"
                            placeholder="Lastname"
                            className="p-3 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            value={user?.email}
                            name="email"
                            placeholder="Email"
                            className="p-3 border border-gray-300 rounded"

                        />
                        <input
                            type="password"
                            //value={user?.password}
                            name="password"
                            placeholder="Password"
                            className="p-3 border border-gray-300 rounded"
                        />
                        <button
                            type="submit"
                            className="bg-purple-700 text-white p-3 rounded"
                        >
                            Update Profile
                        </button>
                    </div>
                    <div>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
