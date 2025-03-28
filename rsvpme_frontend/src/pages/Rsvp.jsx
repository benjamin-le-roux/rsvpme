import './../css/Rsvp.css'
import { useEffect, useState, useContext } from 'react';
import { createSessionFromGuestId } from '../session';
import { getGuest, searchGuest, createGuestSession } from '../api';
import GuestSessionContext from '../context';

const RsvpSearch = () => {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [isLoading, setIsLoading] = useState(false)

    const { guestSession, setGuestSession } = useContext(GuestSessionContext);

    const searchNames = async () => {
        if (!searchPhrase || isLoading) return

        setIsLoading(true)
        setSearchResults([])
        try {
            await searchGuest(searchPhrase).then((results) => {
                setSearchResults(results)
            })
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }
    }

    const updateAndSetSession = (guest_id) => {
        createSessionFromGuestId(guest_id).then((session_obj) => {
            
            console.log('About to set session context:', session_obj)
            setGuestSession(session_obj)

            console.log('Guest session:', guestSession)
        })
    }


    return (<>
        <div className='search-bar'>
            <input
                type="text"
                className='search-input'
                placeholder='Search Name'
                value={searchPhrase}
                onChange={(e) => setSearchPhrase(e.target.value)}
            />
            <button onClick={searchNames} disabled={isLoading} className='search-button'>
                {isLoading ? 'Loading...' : 'Search'}
            </button>
        </div>
        <div className='search-res-container'>
        {
            searchResults.map(result => (
                <div key={result.id} className='search-res-item'>
                    <div className='search-res-row-1'>
                        <p className='search-res-name'>{result.name}</p>
                    </div>
                    <div className='search-res-row-2'>
                        <p className={"search-res-att " + (result.attending ? 'y' : 'n')}>{result.attending ? 'JOINING' : 'NOT JOINING' }</p>
                        <button className='search-res-item-button' onClick={() => updateAndSetSession(result.id)}>This is me</button>
                    </div>
                </div>
            ))
        }
        </div>
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
    
    const { guestSession, setGuestSession } = useContext(GuestSessionContext);

    return (
        <div className="rsvp-main">
        
            <div className='rsvp-block'>
                {guestSession ? <RsvpStatus guest={guestSession.guest} /> : <RsvpSearch />}
            </div>

        </div>
    )
}

export default Rsvp