import { createContext, useContext, useState, useEffect } from "react";
import { isSessionUuidSet, getSessionUuid } from "./session";
import { getGuestSession } from "./api";

const GuestSessionContext = createContext();

export const GuestSessionProvider = ({ children }) => {
    const [guestSession, setGuestSessionContext] = useState(null);

    useEffect(() => {
        const sessionIsSet = isSessionUuidSet();
        const sessionUuid = getSessionUuid();

        if (sessionIsSet) {
            getGuestSession(sessionUuid).then(setGuestSessionContext);
        } 
    
    }, [])

    return (
        <GuestSessionContext.Provider value={{ guestSession, setGuestSessionContext }}>
            {children}
        </GuestSessionContext.Provider>
    );
}
export const useGuestSession = () => useContext(GuestSessionContext);

export default GuestSessionContext;