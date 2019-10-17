import React, { Component } from 'react'
import openSocket from "socket.io-client"
import decode from "jwt-decode"

class Game extends Component {
  constructor(props) {
    super(props)
    // let { lobbyId } = useParams()

    this.state = {
      user: {},
      messages: [],
      messageValue: '',
      lobbyId: this.props.match.params.lobbyId,
    }
  }
  componentDidMount() {
    this.socket = openSocket("http://localhost:4000")
    if (localStorage.getItem("cardCreatorToken")) {
      this.setState({ user: decode(localStorage.getItem("cardCreatorToken")) })
      this.joinLobby()
    }

    this.socket.on("message sent", data => {
      const messages = this.state.messages
      messages.push(`${data.author}: ${data.message}`)
      this.setState({ messages })
    })
  }

  joinLobby() {
    this.socket.emit('join lobby', this.state.lobbyId)
  }

  sendMessage(e) {
    e.preventDefault()
    this.socket.emit('new message', { message: this.state.messageValue, author: this.state.user.username}, this.state.lobbyId)
    this.setState({ messageValue: '' })
  }

  render() {
    return (
      <div className='container'>
        <h1>Chat</h1>
        <ul>
          {this.state.messages.map((message) => <li>{message}</li>)}
        </ul>
        <form onSubmit={(e) => this.sendMessage(e)}>
          <div className='input-group'>
            <input type='text' placeholder='enter a message' value={this.state.messageValue} onChange={(e) => this.setState({ messageValue: e.target.value })} />
          </div>
        </form>
      </div>
    )
  }
}

export default Game