import { Navigate } from 'react-router-dom'

type Props = {
    children: JSX.Element;
}

export const RequireAuth = ({ children }: Props) => {

    const userToken = localStorage.getItem("user_info");

    let isAuth = false;

    if (userToken) {
        const token = JSON.parse(userToken);
        if(token.logged == true){
            isAuth = true;
        }
    } 

    if (!isAuth) {
        return <Navigate to={'/'}></Navigate>;
    }

    return children;
};