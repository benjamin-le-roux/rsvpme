import { createContext, useContext, useState, useEffect } from "react";
import { isSessionUuidSet, getSessionUuid, setSessionUuid } from "./session";
import { getGuestSession } from "./api";

const GuestSessionContext = createContext();

export const GuestSessionProvider = ({ children }) => {
    const [guestSession, setGuestSession] = useState(null);

    useEffect(() => {
        const sessionIsSet = isSessionUuidSet();
        const sessionUuid = getSessionUuid();

        if (sessionIsSet) {
            getGuestSession(sessionUuid).then(setGuestSession);
        } 
    
    }, [])

    return (
        <GuestSessionContext.Provider value={{ guestSession, setGuestSession }}>
            {children}
        </GuestSessionContext.Provider>
    );
}
export const useGuestSession = () => useContext(GuestSessionContext);

export default GuestSessionContext;