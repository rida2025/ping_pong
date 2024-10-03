import React, { useContext, useEffect } from 'react';
import Sidebar from '../components/Sidebar'
import './Home.Module.css'
import { AuthContext } from '../UserContext/Context';

import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

export default function Home() {
const {user, auth_intra42} = useContext(AuthContext);
return (
    Cookies.get('token') ? (
      user ? (
        <Outlet />
      ) : auth_intra42()
    ) : <Navigate to="/login" />
  );
}
