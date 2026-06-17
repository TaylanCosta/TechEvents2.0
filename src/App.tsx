import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Events from './components/Events'
import EventDetails from './pages/EventDetails'
import Profile from './pages/Profile'
import EventSearch from './pages/EventSearch'
import Login from './pages/Login'
import About from './pages/About'
import Register from './pages/Register'
import CreateEvent from './pages/CreateEvent'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Events />
              </>
            } />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/events" element={<EventSearch />} />
          <Route path="/create-event" element={<CreateEvent />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App