import { Route, Routes } from "react-router";
import { Login } from "../components/Login/Login";

const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
  </Routes>
);

export default PublicRoutes;
