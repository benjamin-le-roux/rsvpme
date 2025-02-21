import { Outlet, Link } from 'react-router-dom'
import './../css/Layout.css'

const Layout = () => (
    <>
        {/* <img src="/src/resources/bg.jpg" class="bg-img" /> */}
        <div className='nav-bar-container'>
                <div className='nav-bar'>
                    <div>
                        <h1>RSVPME</h1>
                    </div>
                    <div>
                        <Link className='nav-button' to="/">Home</ Link>
                        <Link className='nav-button' to="/info">Info</ Link>
                    </div>
                </div>
            </div>
        <div className='image-container'>
        </div>

        <Outlet />
    </>

)

export default Layout;