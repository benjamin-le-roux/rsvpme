import { Outlet, Link } from 'react-router-dom'

const Layout = () => (
    <>
        <nav className='Header'>
            <div>
                <h1>RSVPME</h1>
            </div>
            <div>
                <Link className='button' to="/">Home</ Link>
                <Link className='button' to="/info">Info</ Link>
            </div>
        </nav>

        <Outlet />
    </>

)

export default Layout;