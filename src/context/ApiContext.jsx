import { createContext, useState } from "react";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [value, setValue] = useState({ age: 27, isOnline: true});

    return (
        <ApiContext.Provider value={{ value, setValue }}>
            {children}
        </ApiContext.Provider>
    )
}





