import styl from "./Profile.module.css"
import UserData from "./components/userData/userData"
import History from "./components/History/History";
import axios from 'axios';
import { useState, useEffect } from "react";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [id, setId] = useState(1);

  const ismyprofil = 1
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://10.13.2.11:8000/api/users/${id}/`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData(id);
  }, [id]);


  const handleFriendClick = (friend) => {
    setId(friend.id);
    setSelectedFriend(friend);
  };

  return (
    <div className={styl.profile}>
      <div className={styl.content}>
        {/* head */}
        <div className={styl.head}><h1>PROFILE</h1></div>


        {userData ? (
        <>
          <UserData userData={userData} ismyprofil={ismyprofil}/>
          <History onFriendClick={handleFriendClick} id={id} ismyprofil={ismyprofil}/>
        </>
        ) : (
          <div className={styl.loading}>
            <h1 >loading</h1>
            <div className={styl.pointContainer}>
              <div className={styl.point}></div>
              <div className={styl.point}></div>
              <div className={styl.point}></div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;
