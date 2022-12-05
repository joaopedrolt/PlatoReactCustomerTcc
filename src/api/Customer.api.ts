import { CustomerAdd, CustomerLogin, CustomerLoginResponse } from "../types/Customer";
import { Order, OrderAdd } from "../types/Order";
import { Customer as CustomerType } from "../types/Customer";

import Api from "./ApiClass";

class Customer extends Api {
    constructor() {
        super()
    }

    private baseApiPath = super.getBase();

    async addCustomer(customer: CustomerAdd) {
        const response = await fetch(this.baseApiPath + 'customers/add', {
            method: 'POST',
            body: JSON.stringify(customer),
            headers: { 'Content-Type': 'application/json' }
        })
        return await response.json();
    }

    async checkCredentials(user: CustomerLogin): Promise<CustomerLoginResponse> {
        const response = await fetch(this.baseApiPath + 'customers/check', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Private-Network': 'true'
            }
        })
        return await response.json();
    }

    async getAddress(cep: string) {
        const response = await fetch(this.baseApiPath + 'customers/address/' + cep);
        return response.json();
    }

    async getCutomerByCnpj(cnpj: { cnpj: string }): Promise<CustomerType> {
        const response = await fetch(this.baseApiPath + 'customers/cnpj', {
            method: 'POST',
            body: JSON.stringify(cnpj),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Private-Network': 'true'
            }
        })
        return await response.json();
    }

    async postNewOrder(order: OrderAdd) {
        await fetch(this.baseApiPath + 'orders/add', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    async getOrdersId(cnpj: string): Promise<string[]> {
        const response = await fetch(this.baseApiPath + 'customers/order/cnpj', {
            method: 'POST',
            body: JSON.stringify({ cnpj }),
            headers: { 'Content-Type': 'application/json' }
        })
        return response.json();
    }

    async getOrders(cnpj: string): Promise<Order[]> {
        const response = await fetch(this.baseApiPath + 'orders/cnpj', {
            method: 'POST',
            body: JSON.stringify({ cnpj }),
            headers: { 'Content-Type': 'application/json' }
        })
        return response.json();
    }

    async getBudget(cepIn: string, cepOut: string, weight: number): Promise<string> {
        const response = await fetch(this.baseApiPath + `orders/price?cepin=${cepIn}&cepout=${cepOut}&weight=${weight}`);
        return response.json();
    }

    async updateOrderDesc(orderUpdateInfo: { orderId: string, statusDesc: string }) {
        await fetch(this.baseApiPath + 'orders/updatedesc', {
            method: 'POST',
            body: JSON.stringify(orderUpdateInfo),
            headers: { 'Content-Type': 'application/json' }
        })
    }

}

export default Customer;