import AccountInfo from "@/components/AccountInfo";
import BACKEND_URL from "@/global";
import { UserType } from "@/types/UserType";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function ViewAccountsPage() {
    const [user, setUser] = useState<UserType>();

    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("Please sign in to view accounts 🚫")
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
    }, [])

    if (!user) {
        return <span>Loading...</span>
    }
    if (!user.accounts || user.accounts?.length === 0) {
        return <span>Loading Accounts...or try creating one</span>
    }

    return (
        <div>
            {user.accounts.map(account => (
                <AccountInfo key={account._id} account={account} />
            ))}
        </div>
    );
}