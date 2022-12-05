import React, { createContext, useEffect, useState } from "react";
import { CustomerContext } from "../types/Customer";

type UserContextType = {
    customer: CustomerContext;
    setCustomer?: React.Dispatch<React.SetStateAction<CustomerContext>>;
}

export const UserContext = createContext<UserContextType>({
    customer: {
        name: '',
        cnpj: ''
    }
});

type Props = {
    children: React.ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }: Props) => {

    const [customer, setCustomer] = useState<CustomerContext>({
        name: '',
        cnpj: ''
    });

    function getUser() {
        const userInfo = localStorage.getItem("user_info");

        if (userInfo) {
            const info = JSON.parse(userInfo);
            setCustomer({
                name: info.name,
                cnpj: info.cnpj
            })
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <UserContext.Provider value={{ customer, setCustomer }}>{children}</UserContext.Provider>
    );
}