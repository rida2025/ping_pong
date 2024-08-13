import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.Module.css'; // Correct file name

function Sidebar() {
    return (
        <div className="side-nav">
            <div className="user"><Link to="/profile">
                <img src="assets/icons/user.svg" className="user-img" alt="User Icon" />
                <div>
                    <h2>Mohammed Reda</h2>
                    <p>redaeljirari@gmail.com</p>
                </div>
                </Link>
            </div>
            <ul>
                <li><Link to="/home"><img src="assets/icons/home.svg"/><p>Home</p></Link></li>
                <li><Link to="/chat"><img src="assets/icons/chat.svg"/><p>Chat</p></Link></li>
                <li><Link to="/game"><img src="assets/icons/logo.svg"/><p>Game</p></Link></li>
                <li><Link to="/achievement"><img src="assets/icons/achievement.svg"/><p>Achievement</p></Link></li>
                <li><Link to="/notification"><img src="assets/icons/notification.svg"/><p>Notification</p></Link></li>
            </ul>
            <ul>
                <li><Link to="/setting"><img src="assets/icons/setting.svg" alt="Settings Icon"/><p>Settings</p></Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;
