import React from 'react'
import '../Styles/Navbar.css'
import { Link, useLocation } from 'react-router-dom'

const withoutSidebarRoutes = ['/login'];

const logout = () => {
  localStorage.removeItem('authToken');
  navigate('/login');
};


function Navbar(){

  const {pathname} = useLocation();
  if (withoutSidebarRoutes.some((item) => pathname.includes(item))) return null;

  return (
    
    <header className='header'>
        
        <Link className="logo" to="/">FoodBooking</Link>

        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/restaurants">Restaurants</Link>
            <Link to="/reviews">Reviews</Link> 
            {/* <Link to="/reg-restaraunts">RestaurantRegistration</Link> */}
            <Link to="/login">Logout</Link>
        </nav>
       
    </header>
  )
}

export default Navbar
