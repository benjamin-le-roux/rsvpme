import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Rsvp from './pages/Rsvp'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='rsvp' element={<Rsvp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
