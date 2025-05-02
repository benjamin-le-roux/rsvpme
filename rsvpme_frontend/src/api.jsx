import { API_BASE_URL } from "./config"

export async function getGuest(guestId) {
    const response = await fetch(API_BASE_URL + `/guests/${guestId}/`)
    if (!response.ok) throw new Error('Failed to fetch guest data')
    return response.json()
}

export async function getGuestsList () {
    const response = await fetch(API_BASE_URL + '/guests/')
    if (!response.ok) throw new Error('Failed to retrieve guests list')
    return response.json()
}

export async function searchGuest(nameSearch) {
    const response = await fetch(API_BASE_URL + '/guests/?name=' + nameSearch)
    if (!response.ok) throw new Error('Failed to fetch guest search data')
    return response.json()
}

export async function updateGuest(guestId, updates) {
    return await fetch(API_BASE_URL + `/guests/${guestId}/`,
        {
            method: "PATCH",
            body: JSON.stringify(updates),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
    ).then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to update guest(${guestId})`, response)
        }

        return response.json()

    })
}
