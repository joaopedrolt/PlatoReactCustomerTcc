import { useContext, useEffect, useState } from "react";
import { Navigate, NavigateFunction } from "react-router-dom";
import Customer from "../api/Customer.api";
import { UserContext } from "../contexts/ContextUser";
import { Order } from "../types/Order";

type Navigate = {
    navigate: NavigateFunction;
}

const Orders = ({ navigate }: Navigate) => {

    const [orders, setOrders] = useState<Order[]>([]);
    const [hasUser, setHasUser] = useState(false);

    const { customer } = useContext(UserContext);
    const { cnpj } = customer;

    const api = new Customer();

    async function Get() {
        try {

            const orders: Order[] = await api.getOrders(cnpj);
            if (orders.length > 0) {
                setOrders(orders)
                setHasUser(true);
            } else {
                setOrders([]);
                setHasUser(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        Get();
    }, [])

    const HandlePayment = async (_id: string) => {
        await api.updateOrderDesc({ orderId: _id, statusDesc: 'Alocar Recursos' });
        alert('Pagamento realizado com sucesso!')
        navigate('/cliente/dashboard')
    }

    const HandleDelete = async (_id: string) => {
        await api.deleteOrder(_id);
        alert('Pedido removido com sucesso!')
        navigate('/cliente/dashboard')
    }

    return (
        <div className="orders-mobile-container">
            {hasUser &&
                <>
                    <h1 className="orders-title">Meus Pedidos</h1>
                    {orders.map((order, key) => (
                        <div key={key} className="orders-container orders-spacing">
                            <div className="order">
                                <div className="row">
                                    <div className="field mobile-field" id="desc-field">
                                        <span className="desc-field-mobile">Descrição</span>
                                        <div className="content-field mobile-field">{order.desc}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field mobile-field" id="id-field">
                                        <span className="desc-field-mobile">Peso</span>
                                        <div className="content-field mobile-field">{order.weight} Kg</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field mobile-field" id="address-in-field">
                                        <span className="desc-field-mobile">Distancia</span>
                                        <div className="content-field mobile-field">{order.distance}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field mobile-field" id="address-in-field">
                                        <span className="desc-field-mobile">Endereço de Retirada</span>
                                        <div className="content-field mobile-field">{order.addressin}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field mobile-field" id="cep-in">
                                        <span className="desc-field-mobile">Cep - Retirada</span>
                                        <div className="content-field mobile-field">{order.cepin}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field mobile-field" id="address-out-field">
                                        <span className="desc-field-mobile">Endereço de Entrega</span>
                                        <div className="content-field mobile-field">{order.addressout}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field mobile-field" id="cep-in">
                                        <span className="desc-field-mobile">Cep - Entrega</span>
                                        <div className="content-field mobile-field">{order.cepout}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field mobile-field" id="status-field">
                                        <span className="desc-field-mobile">Status</span>
                                        <div className="content-field mobile-field">{order.statusdesc}</div>
                                    </div>
                                </div>
                                {order.statusdesc == 'Aguardando Pagamento' ?
                                    <div className="button-mobile-container">
                                        <button onClick={() => { HandlePayment(order._id) }} className="button-mobile button-green payment-button">Simular Pagamento</button>
                                    </div> : <></>
                                }
                                {order.statusdesc == 'Pedido Rejeitado - Entre em contado para mais informações' ?
                                    <div className="button-mobile-container">
                                        <button onClick={() => { HandleDelete(order._id) }} className="button-mobile button-red payment-button">Remover Pedido</button>
                                    </div> : <></>
                                }
                            </div>
                        </div>
                    ))}
                </>
            }
            {!hasUser &&
                <>
                    <h1 className="orders-title">Sem Pedidos</h1>
                    <h3 className="orders-title">Nenhum Pedido Emitido ou Aprovado</h3>
                </>
            }
        </div>
    )
}

export default Orders;