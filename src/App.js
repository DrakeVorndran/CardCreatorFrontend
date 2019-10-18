import React from 'react';
import './App.css';
import './theme.css'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import NewGame from './pages/NewGame'
import JoinGame from './pages/JoinGame'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Game from './pages/Game'
import Navbar from './components/Navbar'




const store = createStore(reducers)

function App() {
  return (
    <Provider store={store} >
      <Router>
        <div className="App">
          <Navbar/>
          <div className='global-container'>
            <Switch>
              <Route exact path='/' component={Home}></Route>
              <Route path='/new' component={NewGame}></Route>
              <Route path='/join' component={JoinGame}></Route>
              <Route path='/log-in' component={LogIn}></Route>
              <Route path='/sign-up' component={SignUp}></Route>
              <Route path='/play/:lobbyId' component={Game}></Route>
              {/* <Route path='/log-out' component={LogOut}></Route> */}
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}



export default App

