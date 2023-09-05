import axios from "axios";
import { useState, createContext, useRef } from "react";
import { API } from "../backend";


const initialEditorData = {
  lang: "typescript",
  args: "",
  code: "",
};
const userDetails = {
  name: "",
  email: "",
  error: true
};

export const editorDetailsContext = createContext(null);
// export const loginState = createContext(null);

const defaultColorMode = () => {
  if (
    localStorage.getItem("mode") === "dark" ||
    localStorage.getItem("mode") === "light"
  ) {
    return localStorage.getItem("mode") === "dark" ? true : false;
  } else {
    let currentMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    localStorage.setItem("mode", currentMode ? "dark" : "light");
    return currentMode;
  }
};

const ContextProvider = ({ children }) => {
  //global state
  const [editorData, setEditorData] = useState(initialEditorData);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [collabIcons, setCollabIcons] = useState(null);
  const [darkMode, setDarkMode] = useState(defaultColorMode);
  const [loginState, setLoginState] = useState(userDetails);

  //global ref
  const darkToggleRef = useRef(null);
  const scroll = useRef(null);
  const drawings = useRef([]);


  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  if (!isLoggedIn) {
    const decodedJwt = parseJwt(sessionStorage.getItem('token')) || "";
    try {
      if (decodedJwt.exp * 1000 > Date.now()) {
        setIsLoggedIn(true)
      } else {
        if (localStorage.getItem('refreshtoken')) {
          axios
            .post(`${API}/auth/renewAccessToken`, {
              refreshToken: localStorage.getItem('refreshtoken')
            }, {
              headers: { Authorization: `Bearer ${localStorage.getItem('refreshtoken')}` },
              withCredentials: true
            })
            .then((resoponse) => {
              sessionStorage.setItem('token', resoponse.data.token)
              localStorage.setItem('refreshtoken', resoponse.data.refreshToken)
              setIsLoggedIn(true)
            })
            .catch((error) => {
              console.log(error)
              setIsLoggedIn(false)
              sessionStorage.removeItem('token',)
              localStorage.removeItem('refreshtoken')
              localStorage.removeItem('name')
            })

        }
        //
      }
    } catch (error) {
      setIsLoggedIn(false)
      sessionStorage.removeItem('token',)
      localStorage.removeItem('refreshtoken')
      localStorage.removeItem('name')
    }
  }

  return (
    <editorDetailsContext.Provider
      value={{
        editorData,
        setEditorData,
        isLoggedIn,
        setIsLoggedIn,
        collabIcons,
        setCollabIcons,
        darkToggleRef,
        darkMode,
        setDarkMode,
        loginState,
        setLoginState,
        scroll,
        drawings
      }}
    >
      {children}
    </editorDetailsContext.Provider>
  );
};

export default ContextProvider;
