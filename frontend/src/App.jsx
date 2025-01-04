import RegRestaraunts from './Pages/RegRestaraunts'
import Home from './Pages/Home'
import Login from './Auntification/Login'
import Restaurants from './Pages/Restaurants'
import {Routes, Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Profile from './Pages/Profile'
import Reviews from './Pages/Reviews'

function App() {
  
  const result = "заебись"

  return (
    <>
    
    <Navbar />
    <Routes>
      <Route path='/'                 element = {<Home />} />
      <Route path='/profile'          element = {<Profile />} />
      <Route path='/reg-restaraunts'  element = {<RegRestaraunts />} />  
      <Route path='/login'            element = {<Login />} />  
      <Route path='/restaurants'      element = {<Restaurants />} />
      <Route path='/reviews'          element = {<Reviews />} />
    </Routes> 
    
    </>
  )
}

export default App
