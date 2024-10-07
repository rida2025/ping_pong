
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [url, setUrl] = useState("");
  const [islogin, setIslogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  async function auth_intra42() {
    const response = await axios.get("http://10.13.10.11:8000/api/auth_intra/");
    try {
      if (response.status === 200) {
        setUrl(response.data.url);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function Login() {
    try {
      const urlParams = new URLSearchParams(location.search);
      const error = urlParams.get("error");
      if (error) {navigate("/login");}
      const code = urlParams.get("code");
      if (code) {
        const params = new URLSearchParams();
        params.append("code", code);
        const res = await axios.post(`http://10.13.10.11:8000/api/login/`,params,{
          withCredentials: true
        });
        if (res.status === 200)
          {
          console.log("res.data:", res.data.user);
          setUser(res.data);
          setIslogin(true);
          console.log("i will send you to home");
          navigate("/home");
        } else {
          navigate("/login");
        }
      }
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  }

  useEffect(() => {
    Login();
  }
  , []);



  return (
    <AuthContext.Provider value={{ islogin,user,url, setUser , Login , auth_intra42}}>
      {children}
    </AuthContext.Provider>
  );
}
