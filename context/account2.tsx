/*
React context that it's used for 
passing the wallet details to the leaves of the app 
instead of making the whole app as a client
*/

import React, { useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';

export type TAccount = {
    address: string;
}

export const TAccountDefault = {
    address: "",
}

interface AccountContextProps {
    account: TAccount;
    setAccount: Dispatch<SetStateAction<TAccount>>;
}

export const AccountContext = React.createContext({
    account: TAccountDefault,
    setAccount: (x: TAccount)=>{},
} as AccountContextProps);

interface AccountProviderProps {
    children: React.ReactNode;
}

export const AccountProvider = ({ children }: AccountProviderProps) => {
    const [account, setAccount] = useState<TAccount>(TAccountDefault);

    return (
        <AccountContext.Provider
            value={{
                account,
                setAccount
            }}
        >
            {children}
        </AccountContext.Provider>
    )
}