import AccountInfo from "@/components/AccountInfo";
import BACKEND_URL from "@/global";
import { UserType } from "@/types/UserType";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function ViewAccountsPage() {
    const [user, setUser] = useState<UserType>();
    //const [accounts, setAccounts] = useState<AccountType[]>([]);

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

    // useEffect(() => {
    //     async function fetchUserAccounts() {
    //         const token = localStorage.getItem('token');
    //         if (!token) {
    //             toast.error("Please sign in to view accounts 🚫")
    //             return;
    //         }
    //         const response = await axios.get(`${BACKEND_URL}/api/account/${user?._id}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })
    //         setAccounts(response.data.accounts)
    //     }
    //     fetchUserAccounts();
    // }, [])

    if (!user) {
        return <span>Loading...</span>
    }
    // if (!accounts || accounts?.length === 0) {
    //     return <span>Loading Accounts...or try creating one</span>
    // }
    if (!user.accounts || user.accounts?.length === 0) {
        return <span>Loading Accounts...or try creating one</span>
    }

    return (
        <div className="flex flex-wrap gap-20 mx-10 my-10 items-center justify-center">
            {user.accounts.map(account => (
                <AccountInfo key={account._id} account={account} user={user} />
            ))}
        </div>
    );
}