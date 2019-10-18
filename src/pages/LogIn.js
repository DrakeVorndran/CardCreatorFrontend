import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { addAuth, removeAuth } from '../actions'
import { connect } from 'react-redux'

const auth = (e, updateHasCookie, body, addAuth) => {
  e.preventDefault()
  fetch('http://localhost:4000/users/login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(json => {
    addAuth()
    localStorage.setItem("cardCreatorToken", json.token)
    updateHasCookie(true)
  })
}

function LogIn(props) {
  const [username, updateUsername] = useState('')
  const [password, updatePassword] = useState('')
  const [hasCookie, updateHasCookie] = useState(false)
  return (
    <div className='container'>
      {hasCookie && <Redirect to='/'/>}
      <h1>Log In</h1>
      <form>
        <div className='input-group'>
          <input type='text' value={username} placeholder='CreativeUsername99' onChange={(e) => updateUsername(e.target.value)}></input>
          <label>Username</label>
        </div>
        <div className='input-group'>
          <input type='password' value={password} placeholder='$uper$ecur3' onChange={(e) => updatePassword(e.target.value)}></input>
          <label>Password</label>
        </div>
        <div className='input-group'>
          <button onClick={(e) => auth(e, updateHasCookie, { username, password }, props.addAuth)}>Log In</button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = () => {
  return {
    addAuth,
    removeAuth
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(LogIn)