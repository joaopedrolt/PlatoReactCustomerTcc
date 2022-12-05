import '../css/dashboard.css'
import { NavigateFunction } from 'react-router-dom';

type Navigate = {
    navigate: NavigateFunction;
}

const DashBoard = ({ navigate }: Navigate) => {

    const HandleExit = () => {
        navigate('/');
    }

    const HandleIssueOrderPage = () => {
        navigate('/cliente/emitirpedido');
    }

    const HandleMyOrdersPage = () => {
        navigate('/cliente/pedidos');
    }

    const HandleContact = () => {
        alert('Contato para Ajustes: plato@plato.com');
    }

    return (
        <div className="mid-section-container dahsboard-mid">
            <div className="mobile-dashboard-buttons">
                <button className="button-100 button-yellow" onClick={HandleIssueOrderPage}>Emitir Pedido</button>
                <button className="button-100 button-green" onClick={HandleMyOrdersPage}>Acopanhar Pedidos</button>
                <button className="button-100 button-blue" onClick={HandleContact}>Contato</button>
                <button className="button-100 button-red" onClick={HandleExit}>Sair</button>
            </div>
        </div>
    )
}

export default DashBoard;