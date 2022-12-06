import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import DashBoard from "../components/DashBoard";
import { Frame } from "../components/Frame";
import IssueOrder from "../components/IssueOrder";
import Login from "../components/login/Login";
import SignUp from "../components/login/SignUp";
import Orders from "../components/Orders";
import '../css/default.css'
import { RequireAuth } from "../RequireAuth";

const MainRoutes = () => {

  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<Login navigate={navigate}></Login>} />
        <Route path="/cadastro" element={<SignUp navigate={navigate}></SignUp>} />

        <Route path="/cliente/dashboard" element={
          <RequireAuth>
            <Frame page={<DashBoard navigate={navigate}></DashBoard>}></Frame>
          </RequireAuth>
        } />
        <Route path="/cliente/emitirpedido" element={
          <RequireAuth>
            <Frame page={<IssueOrder navigate={navigate}></IssueOrder>}></Frame>
          </RequireAuth>
        } />
        <Route path="/cliente/pedidos" element={
          <RequireAuth>
            <Frame page={<Orders navigate={navigate}></Orders>}></Frame>
          </RequireAuth>
        } />
        
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  )
}

export default MainRoutes;
