import Cookies from 'js-cookie'
import { SESSION_KEY } from './config'

//Cookie expires after 600 days
export const setSessionUuid = (sessionUuid) => Cookies.set(SESSION_KEY, sessionUuid, {expires: 600})

export const getSessionUuid = () => Cookies.get(SESSION_KEY);

export const isSessionUuidSet = () => !!getSessionUuid();

export const clearSessionUuid = () => Cookies.remove(SESSION_KEY);