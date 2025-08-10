import { createContext, useState } from "react";
export const AppContext = createContext()

const AppContextProvider = (props) => {
    const[user,setUser]=useState(true);
    const values = {
        user, setUser
        }
        return (
            <AppContext.Provider value={values}>
                {props.children}
            </AppContext.Provider>
        )
}

export { AppContextProvider };
