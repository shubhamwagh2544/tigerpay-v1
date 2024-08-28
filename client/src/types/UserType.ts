import { AccountType } from './AccountType';

export type UserType = {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    accounts?: AccountType[];
};
