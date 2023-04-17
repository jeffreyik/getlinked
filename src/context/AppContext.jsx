import { createContext, useState } from "react";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [username, setUsername] = useState(null)
    const [users, setUsers] = useState({
        data: null,
        loading: false
    })

    return (
        <AppContext.Provider value={{username, setUsername, setUsers, users}}>
            {children}
        </AppContext.Provider>
    )
}