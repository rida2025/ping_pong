import React, { useContext, useEffect } from 'react';
import Sidebar from '../components/Sidebar'
import './Home.Module.css'
import { AuthContext } from '../UserContext/Context';

import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

export default function Home() {
// const token = localStorage.getItem("token");
const {user} = useContext(AuthContext);

return (
       user ? (
        <Outlet />
    ) : <Navigate to="/login" />
);
}
