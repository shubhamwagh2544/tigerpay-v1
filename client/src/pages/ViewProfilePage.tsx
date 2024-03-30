import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BACKEND_URL from "@/global";
import { UserType } from "@/types/UserType";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function ViewProfilePage() {

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
    }, [])

    return (
        <div className="container flex gap-10 flex-row py-20 items-center justify-center">
            <Card className="w-[700px]">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{`${user?.firstname} ${user?.lastname}'s Profile`}</CardTitle>
                    <span className="mx-auto">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </span>
                    <CardDescription>{`Hola, ${user?.firstname}`}</CardDescription>
                </CardHeader>
                <Separator />
                <CardContent>
                    <div className="mt-5">
                        <div className="flex justify-between my-2">
                            <span>Firstname</span>
                            <span>{user?.firstname}</span>
                        </div>
                        <div className="flex justify-between my-2">
                            <span>Lastname</span>
                            <span>{user?.lastname}</span>
                        </div>
                        <div className="flex justify-between my-2 mb-0">
                            <span>Email</span>
                            <span>{user?.email}</span>
                        </div>
                    </div>
                </CardContent>
                <Separator />
                <CardFooter>
                    <div className="w-[700px]">
                        <div className="flex justify-between my-2 mt-5">
                            <span>Total Accounts</span>
                            <span>{user?.accounts?.length || 0}</span>
                        </div>
                        <div className="flex justify-between my-2">
                            <span>Total Transactions</span>
                            <span>{0}</span>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div >
    )
}