import Sidebar from "./components/SideBar/Sidebar";
import style from './App.module.css';
import { Outlet } from "react-router-dom";
import { NotificationWebSocketProvider } from "./contexts/NotifWSContext.jsx";
import { LocationProvider } from "./contexts/LocationContext.jsx";

const Layout = () => {
    return (
        <div className={style.EntirePage}>
            <NotificationWebSocketProvider>
                <LocationProvider>
                    <Sidebar />
                    <Outlet />
                </LocationProvider>
            </NotificationWebSocketProvider>
        </div>
    );
};

export default Layout;
