import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import openSocket from "socket.io-client"
import decode from "jwt-decode"

const socket = openSocket("http://localhost:4000")

const createGame = (e, updateCreated, lobbyName) => {
  if (localStorage.getItem("cardCreatorToken")) {
    const info = decode(localStorage.getItem("cardCreatorToken"))
    socket.emit('create lobby', lobbyName, info._id)
    updateCreated(true)
  }
  e.preventDefault()
}

function NewGame() {
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
          <button onClick={(e) => createGame(e, updateCreated, lobbyName)}>Create!</button>
        </div>
      </form>
    </div>
  )
}

export default NewGame