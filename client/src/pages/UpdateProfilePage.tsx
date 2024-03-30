import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import BACKEND_URL from "@/global";
import { UserType } from "@/types/UserType";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UpdateProfilePage() {

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
    }, [])

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
                toast.success("Profile updated successfully ✅")
            }
        }
        catch (error: any) {
            toast.error("Error updating profile ❌")
        }
    }

    if (!user) {
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

    return (
        <div className="flex items-center justify-center mt-10">
            <Card className="w-[700px]">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{`${user.firstname}'s Profile 😎`}</CardTitle>
                    <CardDescription>{`Profile Details`}</CardDescription>
                </CardHeader>
                <Separator />
                <CardContent>
                    <div className="w-[500px] mx-auto space-y-5 mt-10 mb-5">
                        <Input
                            className="py-5"
                            type="text"
                            placeholder="Firstname"
                            defaultValue={user.firstname}
                            onChange={handleInputChange}
                        />
                        <Input
                            className="py-5"
                            type="text"
                            placeholder="Lastname"
                            defaultValue={user.lastname}
                            onChange={handleInputChange}
                        />
                        <Input
                            className="py-5"
                            type="email"
                            placeholder="Email"
                            defaultValue={user.email}
                            onChange={handleInputChange}
                        />
                        <Input
                            className="py-5"
                            type="password"
                            placeholder="Password"
                            onChange={handleInputChange}
                        />
                    </div>
                </CardContent>
                <Separator />
                <CardFooter>
                    <div className="flex items-center justify-center w-[700px] mt-7">
                        <Button
                            onClick={handleSubmit}
                            className="bg-purple-700 hover:bg-purple-800 py-5 w-[200px]"
                        >
                            Update Profile
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
