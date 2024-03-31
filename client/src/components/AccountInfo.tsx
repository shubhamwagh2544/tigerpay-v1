import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import BACKEND_URL from "@/global";
import { AccountType } from "@/types/AccountType";
import { UserType } from "@/types/UserType";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
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
    const [amount, setAmount] = useState<number>(0)

    function submitQuery(query: string) {
        if (!query) {
            toast.error('Please write down your query! 🚫')
            return;
        }
        toast.success(`Query submitted 🎉 We will get back to you soon! 🚀`)
        // Send query to backend
    }

    async function handlePayment() {
        if (amount === 0) {
            toast.error('Please enter amount to add! 🚫')
            return;
        }
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                toast.error('Please sign in to add money to account 🚫')
                return;
            }
            const response = await axios.post(`${BACKEND_URL}/api/account/add-money`, {
                amount: amount,
                currency: account.currency.toUpperCase()
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    ContentType: 'application/json'
                }
            })
            initPayment(response.data.order)
        }
        catch (error) {
            console.log(error)
            toast.error('Failed to add money to account 🚫')
        }
    }

    function initPayment(order: any) {
        var options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID as string,
            amount: order.amount,
            currency: order.currency,
            name: 'TigerPay',
            description: 'Add money to account',
            image: 'https://github.com/shadcn.png',
            order_id: order.id,
            handler: async function (response: any) {
                const res = await axios.post(`${BACKEND_URL}/api/account/verify-payment`, {
                    paymentId: response.razorpay_payment_id,
                    orderId: response.razorpay_order_id
                });
                if (res.status === 200) {
                    toast.success('Money added to account successfully 🎉');
                    // Update account balance
                    account.balance += amount;
                    updateAccount();
                    setAmount(0);
                    navigate(`/view-profile`)

                    return;
                }
                toast.error('Failed to add money to account 🚫');
            },
            prefill: {
                name: user.firstname + ' ' + user.lastname,
                email: user.email,
                contact: '+919999999999'
            },
            notes: {
                address: 'Razorpay Corporate Office'
            },
            theme: {
                color: '#3399cc'
            },
            //callback_url: 'https://www.example.com/payment-callback'
        };
        // @ts-ignore
        var rzp1 = new window.Razorpay(options);
        rzp1.open();

        rzp1.on('payment.failed', function () {
            toast.error('Payment failed 🚫');
            navigate(`/view-profile`)
        })
    }

    async function updateAccount() {
        const newAccount = {
            _id: account?._id,
            userId: account?.userId,
            accountName: account?.accountName,
            accountNumber: account?.accountNumber,
            type: account?.type,
            currency: account?.currency,
            status: account?.status,
            balance: account?.balance,
            createdAt: account?.createdAt,
            updatedAt: new Date()
        }
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${BACKEND_URL}/api/account/${account._id}`, newAccount, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            console.log(response.data)
            // if (response.status === 200) {
            //     toast.success('Account updated successfully 🎉')
            // }
        }
        catch (error) {
            //toast.error('Failed to update account 😔')
            console.log(error)
        }
    }

    return (
        <Card className="min-w-[500px]">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl text-purple-700">{account.accountName}</CardTitle>
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
                        <span className="text-green-500">{account.balance}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Account Creation Date</span>
                        <span>{creationDate}</span>
                    </div>
                </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex items-center justify-between mt-5 gap-5">
                <Input
                    placeholder="Enter amount to add"
                    className="py-5 w-[300px]"
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                />
                <Button
                    onClick={handlePayment}
                    className="bg-green-500 hover:bg-green-600 w-[150px] py-5"
                >
                    Add Money
                </Button>
            </CardFooter>
            <Separator />
            <CardFooter className="flex items-center justify-between mt-5 gap-5">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="secondary"
                            className="py-5 w-[150px]"
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
                    //onClick={handlePayment}
                    className="bg-blue-500 hover:bg-blue-600 w-[150px] py-5"
                >
                    View Transactions
                </Button>
                <Button
                    onClick={() => navigate(`/manage-account/${account._id}`)}
                    className="bg-purple-700 hover:bg-purple-800 w-[150px] py-5"
                >
                    Manage Account
                </Button>
            </CardFooter>
        </Card>
    )
}
