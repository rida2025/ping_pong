import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx';
import Profile from './pages/Profile.jsx';
import Setting from './pages/Setting.jsx';
import Home from './pages/Home.jsx';
import Game from './pages/Game.jsx';
import Chat from './pages/Chat.jsx';
import Achievement from './pages/Achievement.jsx';
import Notifaction from './pages/Notifaction.jsx';
import None from './pages/None.jsx';
import './App.module.css'

function App() {
  return (
      <BrowserRouter>
      <div className="container">
        <Sidebar />
        <div className="main-content">
          <h1>hello</h1>
          <Routes>
            <Route path="/"element={<Home />}/>
            <Route path="/game"element={<Game />}/>
            <Route path="/chat"element={<Chat />}/>
            <Route path="/profile"element={<Profile />}/>
            <Route path="/setting"element={<Setting />}/>
            <Route path="/achivement"element={<Achievement />}/>
            <Route path="/notification"element={<Notifaction />}/>
            <Route path="/*"element={<None />}/>
          </Routes>
        </div>
      </div>
      </BrowserRouter>
  );
}

export default App
