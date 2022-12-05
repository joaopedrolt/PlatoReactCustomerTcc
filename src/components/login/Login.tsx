import FormContent from "./FormContent";
import "../../css/login.css"
import { NavigateFunction } from "react-router-dom";

type Navigate = {
    navigate: NavigateFunction;
}

const Login = ({ navigate }: Navigate) => {

    localStorage.clear();

    return (
        <section id="login-screen">
            <div className="login-area">
                <div className="login-area--top">
                    <div className="logo"></div>
                </div>
                <div className="login-area--bottom">
                    <FormContent navigate={navigate} />
                </div>
            </div>
        </section>
    )

}

export default Login;