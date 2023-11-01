import { createContext,useState } from "react";

export const Context= createContext();


export const ContextProvider = ({children})=>{
    const [userInfo,setUserInfo] = useState({});
    const [todos,setTodos] = useState([]);
  return (
    <Context.Provider value={{userInfo,setUserInfo,todos,setTodos}}>
        {children}
    </Context.Provider>
  )
}