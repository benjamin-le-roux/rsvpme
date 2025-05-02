import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Rsvp from './pages/Rsvp'
import Guests from './pages/Guests'


function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/rsvp/*' element={<Rsvp />} />
            <Route path='/guests/' element={<Guests />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
