import React from 'react'
import '../App.css'
import { NavLink } from 'react-router-dom'
import MovieStock from '../assets/MovieStock.png'

const Header = () => {
  return (<div className="header">
            <img src={MovieStock} alt=""/>
            <NavLink to="/" className='nav'>HOME PAGE</NavLink>
            <NavLink to="/popular" className='nav'>POPULAR MOVIES</NavLink>
        </div>)
}

export default Header
