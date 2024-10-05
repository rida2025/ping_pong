import { useContext } from "react";
import { AuthContext } from "./UserContext/Context";
import { Navigate, Outlet } from "react-router-dom";



const protectedRoutes = () => {
    const {islogin} = useContext(AuthContext);
    if (islogin)
        return <Outlet />;
    return <Navigate to="/login" />; 
}

export default protectedRoutes;