import axios from "axios";
// import styl from "./login.module.css";
import { useContext, useEffect, useState } from "react";
import style from "./Login.module.css";
import { AuthContext } from "../UserContext/Context";
// import { useLocation, useNavigate } from "react-router-dom";
// import { authContext } from "../Context/Context";

// import Cookies from 'js-cookie';
// const Login = () => {
const PongParadise = () => {
  const {url , auth_intra42 } = useContext(AuthContext);
  // const location = useLocation();
  // const navigate = useNavigate();
  // const myCookie = Cookies.get('token');
  useEffect(() => {
        auth_intra42();
    }
    , []);
    // Using a boolean for isSignUp state
  const [isSignUp, setIsSignUp] = useState(false);

  // Toggle function to switch between Login and Signup
  const handleToggle = () => {
    setIsSignUp((prev) => !prev); // Toggle state
  };

  return (
    <div className={style.usercard}>
      {/* Conditional rendering for Login or Signup */}
      {isSignUp ? (
        <div className={style.signupbox}>
          <form className={style.signupform} name="signup" action="">
            <input
              type="text"
              name="username"
              className={style.username}
              placeholder="username"
            />
            <input
              type="email"
              name="email"
              className={style.email}
              placeholder="email"
            />
            <input
              type="password"
              name="password"
              className={style.password}
              placeholder="password"
            />
            <input
              type="password"
              name="confirm-password"
              className={style.confirmpassword}
              placeholder="confirm-password"
            />
            <input type="submit" name="signup" value="Signup" className={style.signup} />
          </form>
          <div className={style.footer}>
            <span>or </span>
            <a className={style.togglelink} href="#" onClick={handleToggle}> Login</a>
          </div>
        </div>
      ) : (
        <div className={style.loginbox}>
          <form className={style.loginform} name="login" action="">
            <input
              type="text"
              name="username"
              className={style.username}
              placeholder="username"
            />
            <input
              type="password"
              name="password"
              className={style.password}
              placeholder="password"
            />
            <input type="submit" name="login" value="Login" className={style.login} />
          </form>
          <div className={style.or}></div>
          <a href={url} className={style.loginwithintra}>
            {/* <span className={style.icon}><img src="/img/42logo.png" alt="" /></span> */}
            Login with Intra 42
          </a>
          <a href="#" className={style.loginwithgoogle}>
            {/* <span className={style.iconfafagoogleplus}></span> */}
            Login with Google
          </a>
          <div className={style.footer}>
            <span>or </span>
            <a className={style.togglelink} href="#" onClick={handleToggle}> Sign Up</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PongParadise;
