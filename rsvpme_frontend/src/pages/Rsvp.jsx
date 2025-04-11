import './../css/Rsvp.css'
import { useEffect, useState, useContext } from 'react';
import { clearSessionUuid, createSessionFromGuestId, setSessionCookie } from '../session';
import { getGuest, searchGuest, createGuestSession } from '../api';
import GuestSessionContext from '../context';


import { useNavigate, Routes, Route, Outlet, Link } from 'react-router-dom'

const RsvpSearch = () => {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [isLoading, setIsLoading] = useState(false)

    const { guestSession, setGuestSessionContext } = useContext(GuestSessionContext);

    const navigate = useNavigate();

    useEffect(()=> {
        if (!isLoading && guestSession) {
            navigate('/rsvp/status')
        }
    }, [guestSession, navigate])

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

    const updateAndSetSession = (guestId) => {

        setIsLoading(true)

        createGuestSession(guestId).then(
            (response) => {
                console.log('Got response', response)
                if (response.session_id) {
                    console.log('Setting session: ' + response.session_id)
                    setSessionCookie(response.session_id)
                    setGuestSessionContext(response)


                    setIsLoading(false)

                    // return response
                } else {
                    throw new Error('Invalid session response');
                }
            }
        )

        // createSessionFromGuestId(guest_id).then((session_obj) => {

        //     console.log('About to set session context:', session_obj)

        //     setGuestSessionContext(session_obj)

        //     console.log('Guest session:', guestSession)

            


        //     return session_obj;
        // })

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
                        <button className='search-res-item-button' onClick={() => updateAndSetSession(result.id)}>This is me</button>
                    </div>
                </div>
            ))
        }
        </div>
    </>)
};

const RsvpStatus = () => {

    const { guestSession, setGuestSessionContext } = useContext(GuestSessionContext);

    console.log('Guest Session LOG in Status', guestSession)

    const navigate = useNavigate();

    if (!guestSession) {
        navigate('/rsvp/search')
        return
    }
    const clearAndSearch = () => {
        clearSessionUuid()
        setGuestSessionContext('')
    }

    if (!guestSession) {
        return (<>
            <h1>IS LOADING!!!!</h1>
        </>)
    }

    return (<>
        <div>
            <h2>RSVP'd</h2>
            <p>Hello {guestSession.name}</p>
            <span>Attending: {guestSession.attending ? "Yes" : "No"}</span>
            <p>Companions: {guestSession.companions}</p>
            <button>RSVP ME</button>
            <button onClick={clearAndSearch}>BACK TO SEARCH!</button>
        </div>
    </>)
}

const RsvpLayout = () => {
    
    // const { guestSession, setGuestSession } = useContext(GuestSessionContext);

    return (
        <div className="rsvp-main">
            <div className='rsvp-block'>
                <Outlet/>
            </div>
        </div>
    )
    // return (
    //     <div className="rsvp-main">
        
    //         <div className='rsvp-block'>
    //             {guestSession ? <RsvpStatus guest={guestSession.guest} /> : <RsvpSearch />}
    //         </div>

    //     </div>
    // )
}

const Rsvp = () => (
    // <BrowserRouter>
        <Routes>
            <Route path='/' element={<RsvpLayout/>}>
                <Route path="/status" element={<RsvpStatus />}/>
                <Route path="/search" index element={<RsvpSearch />}/>
            </Route>
        </Routes>
    // </BrowserRouter>
)

export default Rsvp