import AccountInfo from "@/components/AccountInfo";
import { Skeleton } from "@/components/ui/skeleton";
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
        setTimeout(() => {
            toast.error("Please sign in to view accounts 🚫")
        }, 2000)
        return (
            <div className="flex items-center justify-center mt-10">
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            </div>
        )
    }
    // if (!accounts || accounts?.length === 0) {
    //     return <span>Loading Accounts...or try creating one</span>
    // }
    if (!user.accounts || user.accounts?.length === 0) {
        setTimeout(() => {
            toast.error("No accounts found! Create one 🚫")
        }, 2000)
        return (
            <div className="flex items-center justify-center mt-20 gap-10">
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[200px] w-[400px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[200px] w-[400px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[200px] w-[400px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-wrap gap-20 mx-10 my-10 items-center justify-center">
            {user.accounts.map(account => (
                <AccountInfo key={account._id} account={account} user={user} />
            ))}
        </div>
    );
}