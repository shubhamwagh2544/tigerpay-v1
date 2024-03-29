import { AccountType } from "@/types/AccountType";

type Props = {
    account: AccountType
}

export default function AccountInfo({account}: Props) {
    return (
        <div>
            <h3>{account.accountName}</h3>
            <p>{account.balance}</p>
        </div>
    )
}