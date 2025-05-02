import { Outlet, Link } from 'react-router-dom'
import './../css/Layout.css'

const Layout = () => {
    return (<>
        <div className='nav-bar-container'>
            <div className='nav-bar'>
                <Link className='nav-button' to="/">HOME</ Link>
                <h1 className='nav-title'>RSVPME</h1>
                <Link className='nav-button' to="/rsvp">RSVP</ Link>
            </div>
        </div>
        <div className="page-container">
            <Outlet />
        </div>
    </>)
}

export default Layout;