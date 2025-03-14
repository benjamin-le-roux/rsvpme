import './../css/Rsvp.css'
import { useEffect, useState, useContext } from 'react';
import { isSessionUuidSet, getSessionUuid } from '../session';
import { getGuest } from '../api';
import GuestSessionContext from '../context';

const RsvpSearch = () => {

    

    return (<>
        
    </>)
};

const RsvpStatus = ({guest}) => {
    
    return (<>
        <h2>RSVP'd</h2>
        <p>Hello {guest.name}</p>
        <span>Attending: {guest.attending ? "Yes" : "No"}</span>
        <p>Companions: {guest.companions}</p>
        <button>RSVP ME</button>
    </>)
}

const Rsvp = () => {
    
    const { guestSession } = useContext(GuestSessionContext);

    return (
        <div className="rsvp-main">
        
            <div className='rsvp-block'>
                {guestSession ? <RsvpStatus guest={guestSession.guest} /> : <RsvpSearch />}
            </div>

        </div>
    )
}

export default Rsvp