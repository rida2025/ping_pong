import styl from './NotiCard.module.css'
import userImage from '../../assets/nouahidi.jpeg'
import True from '../../assets/true.svg'
import False from '../../assets/false.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useNotificationWS } from '../../../../contexts/NotifWSContext.jsx'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const NotiCard = ({request}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState(30)
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const { sendMessage: sendNotifMessage, isConnected, notif } = useNotificationWS();
  const navigate = useNavigate();

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

  const handleAccept = () => {
    if (isConnected) {
      console.log('Connected');
      sendNotifMessage({
        type: request.notif_type === 'FR' ? 'ACCEPT_FR' : 'ACCEPT_GR',
        from_user_id: request.from_user.id,
        game_type: request.game_type
      });
      console.log('move to the game page');
      const game_key = `${request.from_user.username}vs${request.to_user.username}`;
      navigate('/friend-game', { state: { game_key } });
    } else {
      console.log('Not connected');
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    if (isConnected) {
      sendNotifMessage({
        type: request.notif_type === 'FR' ? 'DECLINE_FR' : 'DECLINE_GR',
        from_user_id: request.from_user.id,
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
            {request.from_user.avatar ? (
                <img src={request.from_user.avatar} alt={request.from_user.username} className="contact-avatar" />
            ) : (
                <div className="contact-avatar default-avatar">
                    <FontAwesomeIcon icon={faUser} />
                </div>
            )}
        </div>
        <div className={styl.Sender}>
            <p >
                {request.from_user.username}
                {request.notif_type === 'FR' ? (
                    ' sent you a friend request'
                ) : (
                    ' invited you to play ' + request.game_type
                )}
                <span className={styl.timeLeft}> {timeLeft}s</span>
            </p>
        </div>
        <div className={styl.Icon}>
            <button onClick={handleAccept}>
                <img src={True}></img>
            </button>
            <button onClick={handleDecline}>
                <img src={False}></img>
            </button>
        </div>
    </div>
  )
}

export default NotiCard
