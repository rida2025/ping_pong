import React, { useContext, useEffect } from 'react';
import Sidebar from '../components/Sidebar'
import './Home.Module.css'
import { AuthContext } from '../UserContext/Context';

import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

export default async function Home() {
  const { user, fetchUserWithToken } = useContext(AuthContext);
  useEffect(async () => {
    const cookie = Cookies.get('token');
    if (cookie) {
      if (user) {
        return <Outlet />;
      } else {
        fetchUserWithToken();
      }
    } else {
      console.log("go login");
      return <Navigate to="/login" />;
    }
  }, [user]);

  return (
    <>
      <div>This is the home page</div>
    </>
  );
}
