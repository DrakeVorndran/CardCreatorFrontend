import React, { useState } from 'react'

const auth = (e) => {
  e.preventDefault()
  console.log("Do Auth Stuff")
}

function LogIn() {
  const [username, updateUsername] = useState('')
  const [password, updatePassword] = useState('')
  return (
    <div className='container'>
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
          <button onClick={(e) => auth(e)}>Log In</button>
        </div>
      </form>
    </div>
  )
}

export default LogIn