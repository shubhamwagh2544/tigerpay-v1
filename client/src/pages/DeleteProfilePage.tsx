import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import BACKEND_URL from "@/global";
import { UserType } from "@/types/UserType";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function DeleteProfilePage() {

    const [user, setUser] = useState<UserType>();
    const navigate = useNavigate()
    const [checkbox, setCheckbox] = useState(false)

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

    async function deleteAccount() {
        if (!checkbox) {
            toast.error("Please accept terms and conditions 🚫")
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${BACKEND_URL}/api/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                toast.success(`Sayonara!, ${user?.firstname} ${user?.lastname} 💔`)
                localStorage.clear()
                navigate("/")
            }
        }
        catch (error: any) {
            toast.error("Error deleting account!")
        }
    }

    return (
        <div className="container flex gap-10 flex-row py-20 items-center justify-center">
            <Card className="w-[700px]">
                <CardHeader>
                    <CardTitle>Delete Profile</CardTitle>
                    <CardDescription>Are you sure to delete all your data from our servers...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" onCheckedChange={() => setCheckbox(!checkbox)} />
                            <Label htmlFor="terms">Accept terms and conditions</Label>
                        </div>
                    </div>
                </CardContent>
                <Separator />
                <CardFooter>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                className="hover:bg-red-700 py-5 mt-5"
                            >
                                Delete Account ⚠️
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={deleteAccount}
                                    className="bg-red-700 text-white hover:bg-red-800"
                                >
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
        </div>
    )
}