/* import { useContext } from "react";
import { UserContext } from "../contexts/ContextUser";  */
import { useContext } from "react";
import { UserContext } from "../contexts/ContextUser";
import PageController from "./PageController";

type Page = {
    page: JSX.Element;
}

export const Frame = ({ page }: Page) => {

    const { customer } = useContext(UserContext);

    /* console.log(customer); */
    
    return (
        <div className="mobile-behavior">
            <div className="menu-mobile-container">
                <div className="menu-perfil menu-perfil-mobile">
                    <div className="avatar cliente"></div>
                    <h3 className="title-frame">{customer.name}</h3>
                    <p className="subtitle-frame">{customer.cnpj}</p>
                </div>
            </div>
            <PageController page={page} />
        </div>
    )
}