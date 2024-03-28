import Balance from "@/components/Balance";
import BACKEND_URL from "@/global";
import { UserType } from "@/types/UserType";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DashboardPage() {
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
            <Balance />
        </div>
    );
}