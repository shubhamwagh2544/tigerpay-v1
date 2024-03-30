import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AccountType } from "@/types/AccountType";
import { UserType } from "@/types/UserType";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";

type Props = {
    account: AccountType
    user: UserType
}

export default function AccountInfo({ user, account }: Props) {

    const creationDate = new Date(account.createdAt).toDateString()
    const [query, setQuery] = useState<string>('')
    const navigate = useNavigate()

    function submitQuery(query: string) {
        if (!query) {
            toast.error('Please write down your query! 🚫')
            return;
        }
        toast.success(`Query submitted 🎉 We will get back to you soon! 🚀`)
        // Send query to backend
    }

    return (
        <Card className="min-w-[500px]">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">{account.accountName}</CardTitle>
                <CardDescription>{`${account.type} account`}</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent>
                <div className="mt-10">
                    <div className="flex justify-between my-2">
                        <span>Account Holder Number</span>
                        <span>{`${user.firstname} ${user.lastname}`}</span>
                    </div>
                    <div className="flex justify-between my-2 mb-5">
                        <span>Account Holder's Email</span>
                        <span>{user.email}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between my-2 mt-5">
                        <span>Account Number</span>
                        <span>{account.accountNumber}</span>
                    </div>
                    <div className="flex justify-between my-2">
                        <span>Currency</span>
                        <span>{account.currency}</span>
                    </div>
                    <div className="flex justify-between my-2">
                        <span>Account Balance</span>
                        <span>{account.balance}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Account Creation Date</span>
                        <span>{creationDate}</span>
                    </div>
                </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex items-center justify-between mt-5">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="secondary"
                        >
                            Report Query
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Write down your query here...</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will take some time to process your query. Please be patient. We will get back to you soon.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        {/* <textarea
                            className="p-3 border border-gray-300 rounded w-full"
                            placeholder="Write down your query here..."
                        /> */}
                        <Textarea
                            placeholder="Write down your query here..."
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => submitQuery(query)}
                            >
                                Submit Query
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <Button
                    onClick={() => navigate(`/manage-account/${account._id}`)}
                    className="bg-purple-700 hover:bg-purple-800"
                >
                    Manage Account
                </Button>
            </CardFooter>
        </Card>
    )
}
