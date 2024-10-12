import React from 'react';
import styl from './CardFriend.module.css';

const CardFriend = ({ friend, onClick }) => {
  return (
    <div className={styl.friends}>
      <div className={styl.CardFriend}>
        <div className={styl.card}>
          <div className={styl.First}></div>
          <div className={styl.Last}>
            <p id={styl.p2}>My Friend</p>
          </div>
        </div>
        <div className={styl.User}>
          <div className={styl.image}>
            <img src={'http://10.13.2.11:8000'+friend.friend.image} alt={friend.friend.name} />
            <div className={styl.online}></div>
          </div>
          <button onClick={() => onClick(friend.friend)}>
            <p>{friend.friend.name.toUpperCase()}</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardFriend;
