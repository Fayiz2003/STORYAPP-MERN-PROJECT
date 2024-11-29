import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Stories from './pages/Stories'
import Dashboard from './pages/Dashboard'
import { Route, Routes,Navigate } from 'react-router-dom'
import View from './pages/View'
import { tokenAuthContext } from './contexts/AuthContext'
import { useContext } from 'react'
import Favourites from './pages/Favourites'
import Forgotpassword from './pages/Forgotpassword'
import Confirmpassword from './pages/Confirmpassword'

function App() {
  const { isAuthorised } = useContext(tokenAuthContext)

  const isUser = sessionStorage.getItem("user") 
    ? JSON.parse(sessionStorage.getItem("user")).role === "user"
    : false;

    const isAdmin = sessionStorage.getItem("user") 
    ? JSON.parse(sessionStorage.getItem("user")).role === "admin"
    : false;

  return (
    <>
      {
        isAuthorised && isUser && 
        <Header />
      }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />        
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/stories' element={isAuthorised?<Stories />:<Navigate to={'/login'}/>} />
        <Route path='/profile' element={isAuthorised?<Profile />:<Navigate to={'/login'}/>} />
        <Route path='/story/:storyId' element={isAuthorised?<View />:<Navigate to={'/login'}/>} />
        <Route path='/favourites' element={isAuthorised?<Favourites />:<Navigate to={'/login'}/>} />
        <Route path='/forgotpassword' element={<Forgotpassword />} />
        <Route path='/confirmpassword' element={<Confirmpassword />} />
      </Routes>
      {
        !isAdmin &&
        <Footer/>
      }
      
     
    </>
  )
}

export default App;
