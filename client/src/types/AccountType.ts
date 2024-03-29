export type AccountType = {
    _id: string;
    userId: string;
    accountName: string;
    accountNumber: string;
    type: string;
    currency: string;
    status: string;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
}