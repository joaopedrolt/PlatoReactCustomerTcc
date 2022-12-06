import { useState } from "react";
import { IMaskInput } from "react-imask";
import { NavigateFunction } from "react-router-dom";
import Customer from "../../api/Customer.api";

import '../../css/signup.css'
import { CustomerAdd } from "../../types/Customer";

type Navigate = {
    navigate: NavigateFunction;
}

const SignUp = ({ navigate }: Navigate) => {

    const [inputNome, setInputNome] = useState('');
    const [inputCnpj, setInputCnpj] = useState('');
    const [inputNum, setInputNum] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputSenha, setInputSenha] = useState('');

    const api = new Customer();

    const HandleReturnLogin = () => {
        navigate('/');
    }

    const HandleCnpj = (value: any) => {
        setInputCnpj(value);

    }

    const HandleNumber = (value: any) => {
        setInputNum(value);
    }

    const HandleSignup = async () => {

        const customerValidation = {
            email: inputEmail,
            cnpj: inputCnpj
        }

        const validation = await api.customerEmailCnpj(customerValidation);

        console.log('test: ', validation);

        if (!validation) {
            alert('Não foi possivel verificar os dados!');
        } else if (validation) {
            if (!validation.cnpj && !validation.email) {
                alert('Cnpj e Email já utilizados!');
            } else if (!validation.cnpj) {
                alert('Cnpj já utilizado!');
            } else if (!validation.email) {
                alert('Email já utilizado!');
            } else {
                if (inputNome == '' || inputCnpj.length != 18 || inputNum.length != 15 || inputEmail == '' || inputSenha == '') {
                    alert('Insira os dados corretamente!');
                } else {
                    const newCustomer: CustomerAdd = {
                        name: inputNome,
                        cnpj: inputCnpj,
                        numero: inputNum,
                        email: inputEmail,
                        password: inputSenha
                    }
                    await api.addCustomer(newCustomer);
                    alert('Cadastrado com Sucesso!');
                    navigate('/');
                }
            }
        }

    }

    return (
        <section id="login-screen">
            <div className="login-area">
                <div className="login-area--top">
                    <div className="logo logo-signup"></div>
                </div>
                <div className="send-order-container">
                    <h1 className="orders-title">Cadastro</h1>
                    <div className="orders-container">
                        <div className="order">
                            <div className="row">
                                <div className="field" id="desc-field">
                                    <span>Nome da Empresa</span>
                                    <input value={inputNome} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputNome(e.target.value) }} type='text' className="content-field"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field" id="weith-field">
                                    <span>CNPJ</span>
                                    <IMaskInput onAccept={(value) => { HandleCnpj(value) }} /* onComplete={} */ mask="00.000.000/0000-00" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="field" id="weith-field">
                                    <span>Número</span>
                                    <IMaskInput onAccept={(value) => { HandleNumber(value) }} mask="(00) 00000-0000" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="field" id="address-out-field">
                                    <span>E-mail</span>
                                    <input value={inputEmail} type='email' onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputEmail(e.target.value) }} className="content-field"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field" id="address-in-field">
                                    <span>Senha</span>
                                    <input value={inputSenha} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputSenha(e.target.value) }} className="content-field"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p onClick={HandleReturnLogin} className="return-login">Já possui uma conta? Clique aqui</p>
                    <button onClick={HandleSignup} className="button-submit-signup">Criar Cadastro</button>
                </div>
            </div>
        </section>
    );
}

export default SignUp;