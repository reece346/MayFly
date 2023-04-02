import { child } from "firebase/database";
import { useState, createContext } from "react";

export const UIContext = createContext();

export default function UIHandler ({children, currentScreen, setCurrentScreen}) {
    
    return (
        <UIContext.Provider value= {{
            currentScreen,
            setCurrentScreen
        }}>
            {children}
        </UIContext.Provider>
    );
}