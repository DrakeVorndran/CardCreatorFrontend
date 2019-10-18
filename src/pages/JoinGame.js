import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'


const joinRoom = (e, updateCreated) => {
  e.preventDefault()
  updateCreated(true)

}

function JoinGame() {
  const [lobbyName, updateLobbyName] = useState('')
  const [created, updateCreated] = useState(false)
  return (
    <div className='container'>
      {created && <Redirect to={`/play/${lobbyName}`} />}
      <h1>Create a game</h1>
      <form>
        <div className='input-group'>
          <input type='text' placeholder='clever name' value={lobbyName} onChange={(e) => updateLobbyName(e.target.value)} />
          <label>Lobby Name</label>
        </div>
        <div className='input-group'>
          <button onClick={(e) => joinRoom(e, updateCreated)}>Create!</button>
        </div>
      </form>
    </div>
  )
}

export default JoinGame