import { Route, Routes, useNavigate } from "react-router-dom";
import DashBoard from "../components/DashBoard";
import { Frame } from "../components/Frame";
import IssueOrder from "../components/IssueOrder";
import Login from "../components/login/Login";
import SignUp from "../components/login/SignUp";
import Orders from "../components/Orders";
import '../css/default.css'

const MainRoutes = () => {

  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<Login navigate={navigate}></Login>} />
        <Route path="/cadastro" element={<SignUp navigate={navigate}></SignUp>} />

        <Route path="/cliente/dashboard" element={
          <Frame page={<DashBoard navigate={navigate}></DashBoard>}></Frame>
        } />
        <Route path="/cliente/emitirpedido" element={
          <Frame page={<IssueOrder navigate={navigate}></IssueOrder>}></Frame>
        } />
        <Route path="/cliente/pedidos" element={
          <Frame page={<Orders navigate={navigate}></Orders>}></Frame>
        } />
      </Routes>
    </>
  )
}

export default MainRoutes;
