import { useEffect, useState } from "react";
import { getGuestsList } from "../api";
import './../css/Guests.css'

const GuestListItem = ({guest}) => {
    return (
        <tr className="guests-table-row">
            <td>{guest.id}</td>
            <td>{guest.email}</td>
            <td>{guest.attending}</td>
            <td>{guest.companions}</td>
            <td><button>UPDATE</button></td>
        </tr>
    )
}

const Guests = () => {
    const [ guests, setGuests ] = useState([]);

    useEffect(() => {
        getGuestsList().then((guestsList) => {
            setGuests(guestsList)
        })
    }, [])

    if (guests.length > 0) {
        return (<>
            <div className="guests-container">
                <table className="guests-table">
                    <thead>
                        <tr className="guests-table-header">
                            <th>ID</th>
                            <th>Email</th>
                            <th>Attending</th>
                            <th>Companions</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        guests.map((guest) => {
                            return <GuestListItem key={guest.id} guest={guest}></GuestListItem>
                        })
                    }
                    </tbody>
                </table>
            </div>
        </>)
    }
}

export default Guests