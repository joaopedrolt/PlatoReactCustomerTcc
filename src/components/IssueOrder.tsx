import { useContext, useState } from "react";

import "../css/issueorder.css";

import { IMaskInput } from "react-imask";
import { NavigateFunction } from "react-router-dom";
import Customer from "../api/Customer.api";
import { OrderAdd } from "../types/Order";
import { UserContext } from "../contexts/ContextUser";

type Navigate = {
    navigate: NavigateFunction;
}

const IssueOrder = ({ navigate }: Navigate) => {

    const [inputDesc, setInputDesc] = useState('');
    const [inputWeight, setInputWeight] = useState(0);
    const [inputNumIn, setInputNumIn] = useState('');
    const [inputNumOut, setInputNumOut] = useState('');
    const [inputAddressIn, setInputAddressIn] = useState('');
    const [inputAddressOut, setInputAddressOut] = useState('');
    const [cepIn, setCepIn] = useState('');
    const [cepOut, setCepOut] = useState('');
    const [budget, setBudget] = useState(false);
    const [budgetValue, setBudgetValue] = useState(0);

    const api = new Customer();

    const { customer } = useContext(UserContext);

    const HandleCepAddressIn = async (value: any) => {
        const address = await api.getAddress(value);
        if (address.address != 'undefined, undefined, undefined') {
            setCepIn(value);
            setInputAddressIn(address.address);
        } else {
            alert('Insira um Cep de retirada valido');
            setInputAddressIn('');
            setInputNumIn('');
        }
    }

    const HandleCepAddressOut = async (value: any) => {
        const address = await api.getAddress(value);
        if (address.address != 'undefined, undefined, undefined') {
            setInputAddressOut(address.address);
            setCepOut(value);
        } else {
            alert('Insira um Cep de entrega valido');
            setInputAddressOut('');
            setInputNumOut('');
        }
    }

    const HandleClickBudget = async () => {

        if (isNaN(inputWeight) || inputWeight == 0) {
            alert('Insira o Peso corretamente!');
        } else if (inputDesc == '' || inputNumIn == '' || inputNumOut == '' || inputAddressIn == '' || inputAddressOut == '') {
            alert('Preencha todos os campos!');
        } else {

            const budgetResponse = await api.getBudget(cepIn, cepOut, inputWeight)
            if (budgetResponse != '') {
                setBudgetValue(parseFloat(budgetResponse))
            } else {
                setBudgetValue(0.00)
            }

            setBudget(true);

        }
    }

    const HandleClickIssue = async () => {

        const { cnpj } = customer;

        if (isNaN(inputWeight) || inputWeight == 0) {
            alert('Insira o Peso corretamente!');
        } else if (inputDesc == '' || inputNumIn == '' || inputNumOut == '' || inputAddressIn == '' || inputAddressOut == '') {
            alert('Preencha todos os campos!');
        } else {
            alert('Pedido emitido com sucesso! Por favor aguarde aprovação');

            const getCustomer = await api.getCutomerByCnpj({ cnpj })

            const newCustomer: OrderAdd = {
                desc: inputDesc,
                weight: inputWeight,
                addressin: inputAddressIn + ', n: ' + inputNumIn,
                cepin: cepIn,
                addressout: inputAddressOut + ', n: ' + inputNumOut,
                cepout: cepOut,
                customer: getCustomer
            }
            api.postNewOrder(newCustomer);

            navigate('/cliente/dashboard');
        }
    }

    return (
        <div className="orders-mobile-container">
            <h1 className="orders-title">Emitir Pedido</h1>
            <div className="orders-container">
                <div className="order">
                    <div className="row">
                        <div className="field" id="desc-field">
                            <span>Descrição</span>
                            <input value={inputDesc} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputDesc(e.target.value) }} type='text' className="content-field"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="weith-field">
                            <span>Peso (Kg)</span>
                            <input value={inputWeight} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputWeight(parseFloat(e.target.value)) }} type='number' className="content-field"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="cep-in">
                            <span>Cep - Retirada</span>
                            <IMaskInput onComplete={(value) => { HandleCepAddressIn(value) }} mask="00000-000" />
                        </div>
                        <div className="field" id="cep-out">
                            <span>Cep - Entrega</span>
                            <IMaskInput onComplete={(value) => { HandleCepAddressOut(value) }} mask="00000-000" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="address-out-field">
                            <span>Endereço de Retirada</span>
                            <input readOnly value={inputAddressIn} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputAddressIn(e.target.value) }} className="content-field"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="address-in-field">
                            <span>Número do Endereço de Retirada</span>
                            <input value={inputNumIn} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputNumIn(e.target.value) }} className="content-field"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="address-in-field">
                            <span>Endereço de Entrega</span>
                            <input readOnly value={inputAddressOut} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputAddressOut(e.target.value) }} className="content-field"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="address-in-field">
                            <span>Número Endereço de Entrega</span>
                            <input value={inputNumOut} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputNumOut(e.target.value) }} className="content-field"></input>
                        </div>
                    </div>
                    {budget &&
                        <div className="row">
                            <div className="field budget" id="address-in-field">
                                <h4>Valor Total</h4>
                                <div className="content-field">{budgetValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="button-mobile-container">
                {!budget && <button onClick={HandleClickBudget} className="button-mobile button-green">Gerar Orçamento</button>}
                {budget && <button onClick={HandleClickIssue} className="button-mobile">Emitir Pedido</button>}
            </div>
        </div>
    );
}

export default IssueOrder;