import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import BACKEND_URL from "@/global";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CreateAccountPage() {

    const [name, setName] = useState<string>('')
    const [accountType, setAccountType] = useState<string>('')
    const [currency, setCurrency] = useState<string>('')
    const navigate = useNavigate()

    function onSelectName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }
    function onSelectAccountType(value: string) {
        setAccountType(value)
    }
    function onSelectCurrency(value: string) {
        setCurrency(value)
    }

    async function handleCreateAccount() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/account`, {
                name,
                accountType,
                currency
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            })
            if (response.status === 201) {
                toast.success('Account created successfully 🎉')
            }
            navigate('/view-accounts')

        }
        catch (error) {
            toast.error('Failed to create account 😔')
        }
    }

    return (
        <div className="container flex gap-10 flex-row py-20 items-center justify-center">
            <Card className="w-[700px]">
                <CardHeader>
                    <CardTitle>Create Account</CardTitle>
                    <CardDescription>Create a new account for sending or receiving money</CardDescription>
                </CardHeader>
                <Separator />
                <CardContent>
                    <form className="mt-5">
                        <div className="grid w-full items-center gap-4 space-y-3">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Name of your account" onChange={onSelectName} className="py-5" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="account-type">Account</Label>
                                <Select onValueChange={onSelectAccountType}>
                                    <SelectTrigger className="py-5" id="account-type">
                                        <SelectValue placeholder="Select Account Type" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="savings">Savings</SelectItem>
                                        <SelectItem value="current">Current</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="currency">Currency</Label>
                                <Select onValueChange={onSelectCurrency}>
                                    <SelectTrigger className="py-5" id="currency">
                                        <SelectValue placeholder="Select Currency" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="inr">INR</SelectItem>
                                        <SelectItem value="usd">USD</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <Separator />
                <CardFooter>
                    <Button
                        className="bg-purple-700 text-white py-5 hover:bg-purple-800 mt-5"
                        onClick={handleCreateAccount}
                    >
                        Create Account
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}