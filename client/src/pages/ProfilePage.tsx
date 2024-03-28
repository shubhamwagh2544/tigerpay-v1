import BACKEND_URL from "@/global";
import { UserType } from "@/types/UserType";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {

    const [user, setUser] = useState<UserType>();
    const [state, setState] = useState({
        firstname: "",
        lastname: "",
        password: ""
    })

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

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setState({
            ...state,
            [name]: value
        })
    }

    async function handleSubmit() {
        let updatedUser: UserType = {
            _id: user?._id as string,
            firstname: state.firstname || user?.firstname as string,
            lastname: state.lastname || user?.lastname as string,
            password: state.password || user?.password as string,
            email: user?.email as string
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${BACKEND_URL}/api/user/profile`, updatedUser, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            if (response.status === 200) {
                toast.success("Profile updated successfully!")
            }
        }
        catch (error: any) {
            toast.error("Error updating profile!")
        }
    }

    return (
        <div>
            <div className="container mx-auto flex justify-center items-center py-10 mt-10">
                <div className="w-96">
                    <h1 className="text-3xl font-bold text-center">Profile</h1>
                    <div className="flex flex-col gap-4 mt-4">
                        <input
                            type="text"
                            defaultValue={user?.firstname}
                            name="firstname"
                            placeholder="Firstname"
                            className="p-3 border border-gray-300 rounded"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            defaultValue={user?.lastname}
                            name="lastname"
                            placeholder="Lastname"
                            className="p-3 border border-gray-300 rounded"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            defaultValue={user?.email}
                            disabled
                            name="email"
                            placeholder="Email"
                            className="p-3 border border-gray-300 rounded"
                        />
                        <input
                            type="password"
                            defaultValue={user?.password}
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
