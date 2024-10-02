// import {useEffect, useState } from "react";
// import "./sidebar.css";
// import { Link, useNavigate, } from "react-router-dom";
// import imgprofil from "/icons/profile.png"
// import imgnotif from  "/icons/notification.png"
// import imggame from "/icons/game.png"
// import imgchat from "/icons/chat.png"
// import imgsetting from "/icons/setting.png"
// import imglogo from "/icons/logo6.png"
// import imglogout from "/icons/logout.png";
// import axios from "axios";

// function Sidebar()  {
//   const navigate = useNavigate();
//   const [pathname, setPathname] = useState(window.location.pathname);
//   const [icons] = useState([
//     {
//       id: 1,
//       titel: "profil",
//       urlImg: imgprofil,
//       url: "/profil",
//     },
//     {
//       id:2,
//       titel: "notification",
//       urlImg:imgnotif,
//       url: "/notification",
//     },
//     {
//       id:3,
//       titel: "game",
//       urlImg: imggame,
//       url: "/game",
//     },
//     {
//       id :4,
//       titel: "chat",
//       urlImg: imgchat,
//       url: "/chat",
//     },
//     {
//       id:5,
//       titel: "setting",
//       urlImg:imgsetting,
//       url: "/setting",
//     },
//   ]);

//   const [active, setActive] = useState("");

//   useEffect(() => {
//     const handlePopstate = () => {
//       setPathname(window.location.pathname);
//     };

//     window.addEventListener('popstate', handlePopstate);

//     return () => {
//       window.removeEventListener('popstate', handlePopstate);
//     };
//   }, []);

//   useEffect(() => {
//   }, [active, pathname]);

//   const handleLogout = async () => {
//     try {

//       await axios.get('http://10.13.1.12:8000/api/logout', {
//         withCredentials: true,
//       }).then((res) => {
//         console.log(res);
//         localStorage.clear();
//         navigate('/login');
//       }).catch((err) => {
//         console.log(err);
//       });
//     } catch (error) {
//         console.error('Logout error:', error);
//     }
// };

//   return (
//     <div className="Sidebar">
//       <div className="logo">
//       <Link to="/home">
//         <img src={imglogo} alt="" />
//         </Link>
//       </div>
//       <div className="icc" >
//       {icons.map(
//         (val,id) => (
//           <div
//           onClick={() => setActive(val.url)}
//           className={ `allicon ${val.url === window.location.pathname  ? "active" : ""}`}
//           key={id}>
//           <Link to={val.url}>
//             <img src={val.urlImg}alt=""/>
//             </Link>
//           </div>
//         )

//       )}
//       </div>

//         <div className="logout">
//           <img  onClick={handleLogout} src={imglogout}alt="" />
//         </div>
//       </div>
//   );
// }

// export default Sidebar;

import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaComment,
  FaBell,
  FaGamepad,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "./sidebar.css";

const Sidebar = ({ avatarUrl, nickname }) => {
  return (
    <nav className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <img src={avatarUrl} alt="User Avatar" className="sidebar-avatar" />
          <h2 className="sidebar-nickname">{nickname}</h2>
        </div>
        <ul className="sidebar-menu">
          <SidebarItem to="/profile" icon={<FaUser />} label="Profile" />
          <SidebarItem to="/chat" icon={<FaComment />} label="Chat" />
          <SidebarItem
            to="/notifications"
            icon={<FaBell />}
            label="Notifications"
          />
          <SidebarItem to="/games" icon={<FaGamepad />} label="Games" />
          <SidebarItem to="/settings" icon={<FaCog />} label="Settings" />
        </ul>
        <SidebarItem
          to="/logout"
          icon={<FaSignOutAlt />}
          label="Logout"
          className="sidebar-logout"
        />
      </div>
    </nav>
  );
};

const SidebarItem = ({ to, icon, label, className = "" }) => {
  return (
    <li className={`sidebar-item ${className}`}>
      <NavLink
        to={to}
        className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
      >
        <span className="sidebar-icon">{icon}</span>
        {label}
      </NavLink>
    </li>
  );
};

export default Sidebar;
