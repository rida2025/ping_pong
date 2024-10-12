import React, { useEffect, useState } from "react";
import styl from "./History.module.css";
import CardFriend from "./components/CardFriend/CardFriend";
import CardBlocked from "./components/CardBlocked/CardBlocked";
import CardMatch from "./components/CardMatch/CardMatch";
import { IoIosArrowForward } from "react-icons/io";
import Add from '../../assets/Add.svg'
import Chat from '../../assets/Chat.svg'
import Block from '../../assets/Block.svg'
import Settings from "./components/Settings/Settings";
import axios from "axios";

const History = ({ onFriendClick, id, ismyprofil} ) => {
  const [activeSection, setActiveSection] = useState("matchhistory");
  const [friend, setFriends] = useState([]);
  const [userBlocked, setUserBlocked] = useState([]);
  const [isGame2Visible, setIsGame2Visible] = useState(false);
  const [currentGame, setCurrentGame] = useState("Ping Pong");
  const [isIconRotated, setIsIconRotated] = useState(false);

  const fetchUserFriends = async (userId) => {
    try {
      const response = await axios.get(`http://10.13.2.11:8000/api/users/${userId}/user_friends/`);
      setFriends(response.data);
      console.log('Fetched friends:', response.data);
    }
    catch {
      console.error("Error fetching user friends")
    }
  };

  useEffect(() => {
    fetchUserFriends();
  },[])

  const fetchUserBlocked = async (userId) => {
    try {
      const response = await axios.get(`http://10.13.2.11:8000/api/users/${userId}/user_blocked_friends/`);
      setUserBlocked(response.data);
    }
    catch {
      console.error("Error fetching user blocked friends")
    }
  };

  useEffect(() => {
    fetchUserFriends(id);
    fetchUserBlocked(id);
  },[id])

  const handleClick = (section) => {
    setActiveSection(section)
  }

  const handleGameChange = () => {
    setCurrentGame(currentGame === "Ping Pong" ? "Tic Tac Toe" : "Ping Pong");
    setIsGame2Visible(false);
    setIsIconRotated(false);
  }

  const handleToggleGame2 = () => {
    setIsGame2Visible(!isGame2Visible);
    setIsIconRotated(!isIconRotated);
  };



  return (
    <div className={styl.last}>
      <div className={styl.Title}>
        <div className={styl.button}>
          <button
            onClick={() => handleClick("matchhistory")}
            className={`${styl.Button} ${activeSection === "matchhistory" ? styl.Clicked : ""}`}
          >
            MATCH HISTORY
          </button>
        </div>
        <div className={styl.button}>
          <button
            onClick={() => handleClick("friends")}
            className={`${styl.Button} ${activeSection === "friends" ? styl.Clicked : ""}`}
          >
            FRIENDS
          </button>
        </div>
        {ismyprofil !== 1 ? (
          <div className={styl.button}>
            <button
              onClick={() => handleClick("blocked")}
              className={`${styl.Button} ${activeSection === "blocked" ? styl.Clicked : ""}`}
            >
              BLOCKED
            </button>
          </div>
        ) : (
          null
        )}
      </div>
      <div className={styl.cont}>
        {activeSection === "matchhistory" && (
          <div className={styl.cont} style={{flexDirection: 'column'}}>
            <div className={styl.choiseGame}>
              <button onClick={handleToggleGame2} >
                <IoIosArrowForward  className={`${styl.icon} ${isIconRotated ? styl.rotated : ""}`}/>
              </button>
              <div className={styl.gameName}>
                <p >{currentGame}</p>
              </div>
            </div>
            {isGame2Visible && (
              <div className={styl.game2}>
                <button onClick={handleGameChange}>
                  <p>{currentGame === "Ping Pong" ? "Tic Tac Toe" : "Ping Pong"}</p>
                </button>
              </div>
            )}
            <div className={styl.matchHistory}>
              <CardMatch />
            </div>
          </div>
        )}
        {activeSection === "friends" && (
          <div className={styl.friends}>
            {friend.map((friend) => (
              <CardFriend key={friend.id} friend={friend} onClick={onFriendClick}/>
            ))}
          </div>
        )}
        {activeSection === "blocked" && (
          <div className={styl.block}>
            {userBlocked.map((userBlocked) => (
              <CardBlocked key={userBlocked.id} userBlocked={userBlocked}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
