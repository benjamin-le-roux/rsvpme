import Cookies from 'js-cookie'
import { useContext } from 'react';
import { createGuestSession } from './api'
import { SESSION_KEY } from './config'
import GuestSessionContext from './context';

//Cookie expires after 600 days
export const setSessionCookie = (sessionUuid) => {
    Cookies.set(SESSION_KEY, sessionUuid, {expires: 600})
}

export const getSessionUuid = () => Cookies.get(SESSION_KEY);

export const isSessionUuidSet = () => !!getSessionUuid();

export const clearSessionUuid = () => Cookies.remove(SESSION_KEY)

export const  createSessionFromGuestId = async (guestId) => {
    console.log("I got this guest id: " + guestId)
    return createGuestSession(guestId).then(
        (response) => {
            console.log('Got response', response)
            if (response.session_id) {
                console.log('Setting session: ' + response.session_id)
                setSessionCookie(response.session_id)
                return response
            } else {
                throw new Error('Invalid session response');
            }
        }
    )
}