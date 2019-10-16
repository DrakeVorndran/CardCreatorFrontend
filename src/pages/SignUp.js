import React, { useState } from 'react'

const auth = (e) => {
  e.preventDefault()
  console.log("Do Auth Stuff")
}

function SignUp() {
  const [username, updateUsername] = useState('')
  const [password, updatePassword] = useState('')
  const [repeat, updateRepeat] = useState('')
  return (
    <div className='container'>
      <h1>Sign Up</h1>
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
          <input type='password' value={repeat} placeholder='$uper$ecur3' onChange={(e) => updateRepeat(e.target.value)}></input>
          <label>Repeat Password</label>
        </div>
        <div className='input-group'>
          <button onClick={(e) => auth(e)}>Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp