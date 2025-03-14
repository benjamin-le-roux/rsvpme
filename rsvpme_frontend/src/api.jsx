import { API_BASE_URL } from "./config"

export async function getGuestSession(sessionUuid) {
    const response = await fetch(API_BASE_URL + `/sessions/${sessionUuid}/`)
    if (!response.ok) throw new Error('Failed to fetch guest data')
    return response.json()
}

export async function getGuest() {
    const response = await fetch(API_BASE_URL + `/sessions/07ad803b-2962-4bef-88ab-c996113aa70b/`)
    // const response = await fetch(API_BASE_URL + `/guests/1/`)
    if (!response.ok) throw new Error('Failed to fetch guest data')
    return response.json()
}
// export async function getGuest(guestId) {
//     const response = await fetch(API_BASE_URL + `/guests/${guestId}`)
//     if (!response.ok) throw new Error('Failed to fetch guest data')
//     return response.json()
// }