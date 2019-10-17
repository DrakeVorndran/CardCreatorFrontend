import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/"><h1>Card Creator</h1></Link></li>
        <li><Link to="/new"><p>Create game</p></Link></li>
        <li><Link to="/join"><p>Join game</p></Link></li>
      </ul>
      <ul>
        <li><Link to="/log-in"><p>log in</p></Link></li>
        <li><Link to="/sign-up"><p>Sign up</p></Link></li>
        <li><Link to="/log-out"><p>log out</p></Link></li>
      </ul>
    </nav>
  )
}

export default Navbar