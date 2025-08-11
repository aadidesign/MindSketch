import { createContext, useState } from "react";
export const AppContext = createContext()

const AppContextProvider = (props) => {
    const[user,setUser]=useState(null);
    const[showLogin,setShowLogin]=useState(false);
    
    const values = {
        user, setUser, showLogin, setShowLogin
        }

        return (
            <AppContext.Provider value={values}>
                {props.children}
            </AppContext.Provider>
        )
}

export { AppContextProvider };
