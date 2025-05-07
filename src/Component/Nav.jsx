import React from 'react'
import './Nav.scss'
import { Link } from 'react-router-dom'


function Nav({ setSearch }) {
  return (
    <nav className='nav'>
      <Link to={'/'}>
        <div>Home</div>
        </Link>
        <div>Product Details</div>
        <Link to={'/Cart'}>
        <div>Cart</div>
        </Link>
        <div>
      <input className=' input' 
      type="Search"
      placeholder='Search fore,brand,product...'
      onChange={(e) => setSearch(e.target.value)}
         
        />
      </div>
    </nav>
    
  )
}

export default Nav
