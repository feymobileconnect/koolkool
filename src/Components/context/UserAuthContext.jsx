import { createContext, useContext, useState, useEffect } from "react";

const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const getSession = () => {
    return JSON.parse(localStorage.getItem("session"));
  };

  const setSessionInLocalStorage = (token) => {
    localStorage.setItem("session", JSON.stringify(token));
    // เพิ่มการตั้งค่า userId ใน localStorage
    localStorage.setItem("userId", token.user.userId); // ตรวจสอบที่นี่
    return true;
  };
  

  const auth = getSession();
  console.log("Current session:", auth);

  const [session, setSession] = useState(auth || { user: null, token: null });

  const setAuth = (token) => {
    setSession(token);
    setSessionInLocalStorage(token);
  };

  useEffect(() => {
    const auth = getSession();
    if (auth) {
      setSession(auth);
    }
  }, []);

  const { user, token } = session;

  return (
    <UserAuthContext.Provider value={{ user, token, setAuth, setSessionInLocalStorage }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};
