import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GuestSessionProvider } from './context'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Rsvp from './pages/Rsvp'


function App() {

  return (
    <GuestSessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/rsvp/*' element={<Rsvp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GuestSessionProvider>
  )
}

export default App
