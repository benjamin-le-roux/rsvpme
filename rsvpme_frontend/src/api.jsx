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

export async function createGuestSession(guestId) {
    return await fetch(API_BASE_URL + '/sessions/',
        {
            method: "POST",
            body: JSON.stringify({
                'guest_id': guestId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
    ).then((response) => {
        if (!response.ok) {
            throw new Error('Failed to create Guest Session from ID')
        }

        return response.json().then(responseDataPromised => {
            return responseDataPromised
        })
    })
}

export async function searchGuest(nameSearch) {
    const response = await fetch(API_BASE_URL + '/guests/?name=' + nameSearch)
    if (!response.ok) throw new Error('Failed to fetch guest search data')
    return response.json()
}