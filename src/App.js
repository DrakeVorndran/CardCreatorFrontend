import React from 'react';
import './App.css';
import './theme.css'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import NewGame from './pages/NewGame'
import JoinGame from './pages/JoinGame'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
// import LogOut from './pages/LogOut'

const store = createStore(reducers)

function App() {
  return (
    <Provider store={store} >
      <Router>
        <div className="App">
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
          <div className='global-container'>
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route path='/new' component={NewGame}></Route>
            <Route path='/join' component={JoinGame}></Route>
            <Route path='/log-in' component={LogIn}></Route>
            <Route path='/sign-up' component={SignUp}></Route>
            {/* <Route path='/log-out' component={LogOut}></Route> */}
          </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
