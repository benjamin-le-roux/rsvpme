import './../css/Rsvp.css'
import { useEffect, useState, useContext } from 'react';
import { isSessionUuidSet, getSessionUuid } from '../session';
import { getGuest, searchGuest } from '../api';
import GuestSessionContext from '../context';

const RsvpSearch = () => {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [isLoading, setIsLoading] = useState(false)

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
                <div className='search-res-item'>
                    <div className='search-res-row-1'>
                        <p>{result.attending ? 'JOINING' : 'NOT JOINING' }</p>
                    </div>
                    <div className='search-res-row-2'>
                        <p className='search-res-name'>{result.name}</p>
                        <button className='search-res-item-button'>This is me</button>
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
    
    const { guestSession } = useContext(GuestSessionContext);

    return (
        <div className="rsvp-main">
        
            <div className='rsvp-block'>
                {false ? <RsvpStatus guest={guestSession.guest} /> : <RsvpSearch />}
                {/* {guestSession ? <RsvpStatus guest={guestSession.guest} /> : <RsvpSearch />} */}
            </div>

        </div>
    )
}

export default Rsvp