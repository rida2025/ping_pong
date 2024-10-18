// import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/SideBar/Sidebar.jsx';
import Games from './components/Game/Game.jsx';

import PingPongGames from './components/Game/components/PingGame/PingGame.jsx';
import XOGames from './components/Game/components/TicTac/TicTac.jsx';

import Home from './components/Home/Home.jsx';
import Chat from './Chat/Chat.jsx';
import Profile from './components/Profile/Profile.jsx';
import Setting from './components/Setting/Setting.jsx';
import Notificationz from './components/Notification/Notification.jsx';
import None from './components/None/None.jsx';
import LocalGame from './ponggame/localpong/LocalGame.jsx';
import LocalTeamGame from './ponggame/teampong/LocalTeamGame.jsx';
import OnlineGame from './ponggame/onlinepong/OnlineGame.jsx';
import Tournament from './ponggame/Tournamentpong/Tournament.jsx';
// import AuthProvider from './UserContext/Context.jsx';
import style from './App.module.css';
import Login from './Login/intra/Login.jsx';
// import { AuthContext } from './UserContext/Context.jsx';
// import ProtectedRoutes from './protectedRoutes.jsx';
import FriendGame from './ponggame/friendpong/FriendGame.jsx';

import { NotificationWebSocketProvider } from './contexts/NotifWSContext.jsx';
import Layout from './Layout.jsx';

function App() {

  return (
    // <BrowserRouter>

      <div className={style.EntirePage}>
        <div className={style.MainContent}>
          <Routes>
          <Route path="/" element={<Layout />}>
              {/* <Route path="home" element={<NotificationWebSocketProvider><Home /></NotificationWebSocketProvider>} />
              <Route path="games" element={<NotificationWebSocketProvider><Games /></NotificationWebSocketProvider>} />
              <Route path="pingpong-games" element={<NotificationWebSocketProvider><PingPongGames /></NotificationWebSocketProvider>} />
              <Route path="xo-games" element={<NotificationWebSocketProvider><XOGames /></NotificationWebSocketProvider>} />
              <Route path="games/localpong" element={<NotificationWebSocketProvider><LocalGame /></NotificationWebSocketProvider>} />
              <Route path="games/localteampong" element={<NotificationWebSocketProvider><LocalTeamGame /></NotificationWebSocketProvider>} />
              <Route path="games/onlinepong" element={<NotificationWebSocketProvider><OnlineGame /></NotificationWebSocketProvider>} />
              <Route path="games/tournament" element={<NotificationWebSocketProvider><Tournament /></NotificationWebSocketProvider>} />
              <Route path="chat" element={<NotificationWebSocketProvider><Chat /></NotificationWebSocketProvider>} />
              <Route path="profile" element={<NotificationWebSocketProvider><Profile /></NotificationWebSocketProvider>} />
              <Route path="setting" element={<NotificationWebSocketProvider><Setting /></NotificationWebSocketProvider>} />
              <Route path="notification" element={<NotificationWebSocketProvider><Notificationz /></NotificationWebSocketProvider>} /> */}
              <Route path="home" element={<Home />} />
              <Route path="games" element={<Games />} />
              <Route path="pingpong-games" element={<PingPongGames />} />
              <Route path="xo-games" element={<XOGames />} />
              <Route path="games/localpong" element={<LocalGame />} />
              <Route path="/friend-game" element={<FriendGame />} />
              <Route path="games/localteampong" element={<LocalTeamGame />} />
              <Route path="games/onlinepong" element={<OnlineGame />} />
              <Route path="games/tournament" element={<Tournament />} />
              <Route path="chat" element={<Chat />} />
              <Route path="profile" element={<Profile />} />
              <Route path="setting" element={<Setting />} />
              <Route path="notification" element={<Notificationz />} />
            </Route>
            <Route path="/*" element={<None />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
     // </BrowserRouter>
  );
}

export default App;
