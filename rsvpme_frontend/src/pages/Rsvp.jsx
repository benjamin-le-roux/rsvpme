import './../css/Rsvp.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useNavigate, Routes, Route, Outlet, Link } from 'react-router-dom'
import { getGuest, searchGuest, updateGuest } from '../api';


const Rsvp = () => (
    <Routes>
        <Route path='/' element={<RsvpLayout/>}>
            <Route index element={<RsvpSearch />}/>
            <Route path="/guest/:id" element={<RsvpStatus />}/>
        </Route>
    </Routes>
)

const RsvpLayout = () => {
    return (
        <div className="rsvp-main">
            <div className='rsvp-block'>
                <Outlet/>
            </div>
        </div>
    )
}

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
        <div className={'search-res-container ' + (isLoading ? "loading" : "")}>
        {
            searchResults.map(result => (
                <div key={result.id} className='search-res-item'>
                    <div className='search-res-row-1'>
                        <p className='search-res-name'>{result.name}</p>
                    </div>
                    <div className='search-res-row-2'>
                        <p className={"search-res-att " + (result.attending ? 'y' : 'n')}>{result.attending ? 'JOINING' : 'NOT JOINING' }</p>
                        <Link className='search-res-item-button' to={"/rsvp/guest/" + result.id}>This is me</Link>
                    </div>
                </div>
            ))
        }
        </div>
    </>)
};

const RsvpStatus = () => {
    const navigate = useNavigate();
    const [guest, setGuest] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const updateGuestAndState = () => {
        updateGuest(
            guest.id,
            { 
                attending: !guest.attending
            }
        ).then(
            (updatedData) => setGuest(updatedData)
        )
    }

    let {id} = useParams();

    if (!id) {
        navigate("/rsvp");
    }


    useEffect(() => {
        try {
            getGuest(id).then((guestData) => setGuest(guestData))
        } catch (error) {
            console.log("Error getting guest", error)
        } finally {
            setIsLoading(false)
        }

    }, [])

    if (isLoading || !guest.id) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    } else {
        return (<>
            <div>
                <h1>Hello {guest.name}</h1>
                <span>Attending: {guest.attending ? "Yes" : "No"}</span>
                <p>Companions: {guest.companions}</p>
                <button className='rsvp-button' onClick={()=>updateGuestAndState()}>{guest.attending ? "Not Coming" : "I am coming"}</button>
                <Link className='' to="/rsvp">BACK TO SEARCH!</Link>
            </div>
        </>)
    }
}

export default Rsvp