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
      cards: [{ image: '/cards/ace_of_hearts.svg', value: '1h' }, { image: '/cards/ace_of_clubs.svg', value: '1c' }],
      messageValue: '',
      lobbyId: this.props.match.params.lobbyId,
      players: [],
      selceted: NaN,
      discard: [],
    }
  }
  componentDidMount() {
    this.socket = openSocket("http://localhost:4000")
    if (localStorage.getItem("cardCreatorToken")) {
      const info = decode(localStorage.getItem("cardCreatorToken"))
      const { username, _id } = info
      this.setState({ user: { username, _id } })
      this.joinLobby({ username, _id })
      this.handleChat()
      this.handleDraw()
      this.handlePlayers()
      this.handleDiscard()
    }
  }

  joinLobby(user) {
    this.socket.emit('join lobby', this.state.lobbyId, user)
  }

  handleChat() {
    this.socket.on("message sent", data => {
      const messages = this.state.messages
      messages.push(<><b>{data.author}</b>: {data.message}</>)
      this.setState({ messages })
    })
  }

  handleDiscard() {
    this.socket.on('update discard', discard => {
      this.setState({discard})
    })
  }

  handlePlayers() {
    this.socket.on("add player", (players) => {
      this.setState({ players })
    })
  }

  handleDraw() {

    this.socket.on("card drawn", (cards) => {
      console.log("drew card")
      this.setState({ cards })
    })
  }

  sendMessage(e) {
    e.preventDefault()
    this.socket.emit('new message', { message: this.state.messageValue, author: this.state.user.username }, this.state.lobbyId)
    this.setState({ messageValue: '' })
  }

  drawCard() {
    this.socket.emit('draw card', this.state.lobbyId, this.state.user)
  }

  playCard() {
    if (!isNaN(this.state.selceted)) {
      const card = this.state.cards[this.state.selceted]
      this.socket.emit('play card', this.state.lobbyId, this.state.user, card)
    }
  }
  render() {
    return (
      <div className='game-screen'>
        <div className='players'>
          <h1>Players</h1>
          <ul>
            {this.state.players.map(player => <li key={player._id}>{player.username}</li>)}
          </ul>
        </div>
        <div className='play-area'>
          <div className='deck'>
            <h2>deck</h2>
            <img onClick={() => this.drawCard()} src='/cards/back.svg' alt='back' />
          </div>
          <div className='discard'>
            <h2>discard</h2>
            <img src={!this.state.discard[0] ? '/cards/placeholder.svg' : this.state.discard[0].image } onClick={() => this.playCard()} alt='placeholder' />
          </div>
        </div>
        <div className='chat'>
          <h1>Chat</h1>
          <form onSubmit={(e) => this.sendMessage(e)}>
            <div className='input-group'>
              <input type='text' placeholder='enter a message' value={this.state.messageValue} onChange={(e) => this.setState({ messageValue: e.target.value })} />
            </div>
          </form>
          <ul>
            {this.state.messages.map((message, i) => <li key={`${i}-${message}`}>{message}</li>)}
          </ul>
        </div>
        <div className='cards'>
          {this.state.cards.map((card, i) => <img onClick={() => this.setState({ selceted: i })} key={`${card.value}-${i}`} src={card.image} alt={card.value} className={i === this.state.selceted ? 'selected' : ''} />)}
        </div>
      </div>
    )
  }
}

export default Game