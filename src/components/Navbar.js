import React from 'react'
import { Link } from 'react-router-dom'
import { removeAuth } from '../actions'
import { connect } from 'react-redux'


function Navbar(props) {
  return (
    <nav>
      <ul>
        <li><Link to="/"><h1>Card Creator</h1></Link></li>
        <li><Link to="/new"><p>Create game</p></Link></li>
        <li><Link to="/join"><p>Join game</p></Link></li>
      </ul>
      <ul>
        {!props.auth.isAuth ? <>
          <li><Link to="/log-in"><p>log in</p></Link></li>
          <li><Link to="/sign-up"><p>Sign up</p></Link></li>
        </> : <>
            <li><Link to='/' onClick={() => props.removeAuth()}><p>log out</p></Link></li>
          </>}
      </ul>
    </nav>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = () => {
  return {
    removeAuth
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(Navbar)
