export type Customer = {
    _id: string,
    name: string;
    cnpj: string;
    numero: string;
    email: string;
    password: string;
    orders?: string[],
    __v?: any
}

export type CustomerAdd = {
    name: string;
    cnpj: string;
    numero: string;
    email: string;
    password: string;
}

export type CustomerLogin = {
    email: string;
    password: string;
}

export type CustomerLoginResponse = {
    customer?: {
        name: string,
        cnpj: string
    },
    logged: boolean
}

export type CustomerContext = {
    name: string,
    cnpj: string
}

export type CustomerEmailCnpj = {
    email: boolean,
    cnpj: boolean
}

export type CustomerEmailCnpjString = {
    email: string;
    cnpj: string;
}