import { useContext } from "react";
import { AuthContext } from '../context/AuthContext.jsx';
import { Navigate, Outlet,  } from "react-router-dom";

const GuestLayout = () => {
    const { user } = useContext(AuthContext);
    
    return !user ? <Outlet />: <Navigate to="/" />
}

export default GuestLayout