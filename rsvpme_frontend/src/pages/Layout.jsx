import { Outlet, Link } from 'react-router-dom'
import './../css/Layout.css'

const Layout = () => (
    <>
        <div className='nav-bar-container'>
                <div className='nav-bar'>
                    <div>
                        <h1>RSVPME</h1>
                    </div>
                    <div>
                        <Link className='nav-button' to="/">HOME</ Link>
                        <Link className='nav-button' to="/info">RSVP</ Link>
                    </div>
                </div>
            </div>
        <div className='image-container'>
        </div>

        <Outlet />
    </>

)

export default Layout;