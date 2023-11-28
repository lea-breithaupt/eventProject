import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Routes, Route, createRoutesFromElements } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import CreateUserAccountPage from './pages/CreateUserAccountPage'
import UserProfilePage from './pages/UserProfilePage'
import EventPage from './pages/EventPage'
import LoginForm from './components/LoginForm'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/create-user-account' element={<CreateUserAccountPage />} />
        <Route 
          path='/user-profile/:userId' 
          element={<UserProfilePage />} 
          />
        <Route path='/event-page/:eventId' element={<EventPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
