import React, { useState, useEffect } from 'react';
import styl from './NotiCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useNotificationWS } from '../../../../contexts/NotifWSContext.jsx'
import False from '../../assets/false.svg'


const NotiCardSent = ({request}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const { sendMessage: sendNotifMessage, isConnected, notif } = useNotificationWS();

  useEffect(() => {
    if (request.notif_type === 'GR') {
        const createdAt = new Date(request.created_at).getTime();
        const now = new Date().getTime();
        const initialTimeLeft = Math.max(0, 30 - Math.floor((now - createdAt) / 1000));
        setTimeLeft(initialTimeLeft);
    
        const timer = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
              clearInterval(timer);
              setIsVisible(false);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
    
        return () => clearInterval(timer);
    }
  }, []);

  useEffect(() => {
    if (notif && notif.id === request.id && notif.status !== 'pending') {
      setPopupMessage(`Request ${notif.status}`);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        setIsVisible(false);
      }, 1000);
    }
  }, [notif]);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const handleCancel = () => {
    if (isConnected) {
      sendNotifMessage({
        type: request.notif_type === 'FR' ? 'CANCEL_FR' : 'CANCEL_GR',
        to_user_id: request.to_user.id,
        game_type: request.game_type
      });
    }
    setIsVisible(false);
  };
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <div className={styl.notiCard}>
        <div className={styl.userimage}>
            {request.to_user.avatar ? (
                <img src={request.to_user.avatar} alt={request.to_user.username} className="contact-avatar" />
            ) : (
                <div className="contact-avatar default-avatar">
                    <FontAwesomeIcon icon={faUser} />
                </div>
            )}
        </div>
        <div className={styl.Sender}>
            <p>
                {request.notif_type === 'FR' ? (
                    `Friend request sent to ${request.to_user.username}`
                ) : (
                    `Game invitation (${request.game_type}) sent to ${request.to_user.username}`
                )}
                <span className={styl.timeLeft}> {timeLeft}s</span>
            </p>
        </div>
        <div className={styl.Icon}>
            <button onClick={handleCancel}>
                <img src={False}></img>
            </button>
        </div>
        {showPopup && <div className={styl.popup}>{popupMessage}</div>}
    </div>
  )
}

export default NotiCardSent