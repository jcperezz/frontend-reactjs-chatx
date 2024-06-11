import { createContext, useState } from "react";

export const Context = createContext()

export const AppContext = ({ children }) => {
    const [user, setUser] = useState({})

    return (
        <Context.Provider value={{ user }}>
            {children}
        </Context.Provider>
    )
}