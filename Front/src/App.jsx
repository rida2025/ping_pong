import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx';
import Profile from './pages/Profile.jsx';
import Setting from './pages/Setting.jsx';
import Home from './pages/Home.jsx';
import Chat from './pages/Chat.jsx';
import Achievement from './pages/Achievement.jsx';
import Notificationz from './pages/Notification.jsx';
import None from './pages/None.jsx';
import style from './App.module.css'
import Game from './pages/Game.jsx'
import LocalGame from './pages/LocalGame.jsx'
import LocalTeamGame from './pages/LocalTeamGame.jsx'
import OnlineGame from './pages/OnlineGame.jsx'
import Tournament from './pages/Tournament.jsx'
import { useState, useEffect } from 'react';

function App() {
  
  return (
      <BrowserRouter>
      <div className={style.EntirePage}>
        <div>
          <Sidebar/>
        </div>
        <div className={style.MainContent}>
          <Routes>
            <Route path="/"element={<Home/>}/>
            <Route path="/game"element={<Game />}/>
            <Route path="/localpong"element={<LocalGame />}/>
            <Route path="/localteampong"element={<LocalTeamGame />}/>
            <Route path="/onlinepong"element={<OnlineGame />}/>
            <Route path="/tournament"element={<Tournament />}/>
            <Route path="/chat"element={<Chat/>}/>
            <Route path="/profile"element={<Profile/>}/>
            <Route path="/setting"element={<Setting/>}/>
            <Route path="/achievement"element={<Achievement/>}/>
            <Route path="/notification"element={<Notificationz/>}/>
            <Route path="*"element={<None/>}/>
          </Routes>
        </div>
       </div>
      </BrowserRouter>
  );
}

export default App
