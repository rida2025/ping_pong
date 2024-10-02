import axios from "axios";
// import styl from "./login.module.css";
import { useContext, useEffect, useState } from "react";
import "./test.css";
import { AuthContext } from "../UserContext/Context";
import { useLocation, useNavigate } from "react-router-dom";
// import { authContext } from "../Context/Context";

import Cookies from 'js-cookie';
// const Login = () => {
const PongParadise = () => {
  const backgroundimage = '/img/loginbg.jpg'; // For public assets
  const logo = '/img/42logo.png'; // For public assets
  const {url , auth_intra42 , user} = useContext(AuthContext);
  const location = useLocation();
  // const navigate = useNavigate();
  // const myCookie = Cookies.get('token');
  useEffect(() => {
    console.log("before", user);
    if ((!user)) {
      
      console.log("after", user);
         auth_intra42();
    }

  }, [user]);

  return (
    <div
      className="pong-paradise-container"
      style={{ backgroundImage: `url(${backgroundimage})` }}
    >
      <div className="pong-paradise-card">
        <h1 className="pong-paradise-title">Welcome to Pong Paradise!</h1>
        <p className="pong-paradise-description">
          Experience the thrill of classic gaming with a modern twist.
          <br />
          Join players worldwide in fast-paced matches, tournaments and
          challenges. <br />
          Ready to dominate the Pong arena? Let&apos;s play!
        </p>
        <div className="pong-paradise-logo">
          <a href={url}>
            {/* <img src="/img/42logo.png" alt="pong paradise" /> */}
            <img src={logo} alt="pong paradise" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PongParadise;
