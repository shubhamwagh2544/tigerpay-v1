import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BACKEND_URL from '@/global';
import { AccountType } from '@/types/AccountType';
import { UserType } from '@/types/UserType';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function ManageAccountPage() {
    const [user, setUser] = useState<UserType>();
    const [account, setAccount] = useState<AccountType>();
    const params = useParams();
    const id = params.id as string;

    const [name, setName] = useState<string>('');
    const [accountType, setAccountType] = useState<string>('');
    const [currency, setCurrency] = useState<string>('');

    const [checkbox, setCheckbox] = useState(false);
    const navigate = useNavigate();

    function onSelectName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }
    function onSelectAccountType(value: string) {
        setAccountType(value);
    }
    function onSelectCurrency(value: string) {
        setCurrency(value);
    }

    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please sign in to view accounts 🚫');
                return;
            }
            const response = await axios.get(`${BACKEND_URL}/api/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // set user
            setUser(response.data.user);
        }
        fetchUser();
    }, []);

    useEffect(() => {
        async function fetchAccount() {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please sign in to view accounts 🚫');
                return;
            }
            const response = await axios.get(`${BACKEND_URL}/api/account/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // set account
            setAccount(response.data.account);
        }
        fetchAccount();
    }, [id]);

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
        );
    }
    if (!user.accounts || user.accounts?.length === 0) {
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
        );
    }

    async function updateAccount() {
        const newAccount = {
            _id: account?._id,
            userId: account?.userId,
            accountName: name || account?.accountName,
            accountNumber: account?.accountNumber,
            type: accountType || account?.type,
            currency: currency || account?.currency,
            status: account?.status,
            balance: account?.balance,
            createdAt: account?.createdAt,
            updatedAt: new Date(),
        };
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${BACKEND_URL}/api/account/${id}`, newAccount, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                toast.success('Account updated successfully 🎉');
            }
        } catch (error) {
            toast.error('Failed to update account 😔');
        }
    }
    async function deleteAccount() {
        if (!checkbox) {
            toast.error('Please accept terms and conditions 🚫');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${BACKEND_URL}/api/account/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                toast.success(`Account deleted successfully 🎉`);
                navigate('/view-accounts');
            }
        } catch (error: any) {
            toast.error('Error deleting account 🚫');
        }
    }
    function checkIfAccountHasBalance() {
        return account?.balance !== 0;
    }

    return (
        <div className="flex items-center justify-center my-10">
            <Tabs defaultValue="update-account" className="min-w-[700px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="update-account">Update Account</TabsTrigger>
                    <TabsTrigger value="delete-password">Delete Account</TabsTrigger>
                </TabsList>
                <TabsContent value="update-account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Update Account</CardTitle>
                            <CardDescription>
                                Make changes to your account here. Click save when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="Name of your account"
                                            defaultValue={account?.accountName}
                                            onChange={onSelectName}
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="account-type">Account</Label>
                                        <Select defaultValue={account?.type} onValueChange={onSelectAccountType}>
                                            <SelectTrigger id="account-type">
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
                                        <Select defaultValue={account?.currency} onValueChange={onSelectCurrency}>
                                            <SelectTrigger id="currency">
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
                        <CardFooter>
                            <Button
                                className="bg-purple-700 text-white py-5 hover:bg-purple-800"
                                onClick={updateAccount}
                            >
                                Update Account
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="delete-password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Delete Account</CardTitle>
                            <CardDescription>
                                Make sure you want to delete your account. This action cannot be reversed.
                            </CardDescription>
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Button variant="outline" className="text-orange-600 font-semibold">
                                        READ ME
                                    </Button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                    <div className="flex justify-between">
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-semibold text-orange-600">Warning</h4>
                                            <p className="text-sm text-yellow-500">
                                                Account with non-zero balance cannot be deleted.
                                            </p>
                                            <p className="text-sm">
                                                Make sure you transfer all the money to another account before deleting
                                                this account.
                                            </p>
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="terms"
                                        onCheckedChange={() => setCheckbox(true)}
                                        disabled={checkIfAccountHasBalance()}
                                    />
                                    <Label htmlFor="terms">Accept terms and conditions</Label>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="bg-red-700 text-white py-5 hover:bg-red-800"
                                onClick={deleteAccount}
                                disabled={checkIfAccountHasBalance()}
                            >
                                Delete Account
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
