import React,{ Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import News from './components/News';
import Chat from './components/Chat';
import Bot from './components/Bot';

class Routes extends Component {  
  render() {
    return(
      <Router>
        <Switch>
          <Route path='/chat' component={Chat} />
          <Route path='/bot' component={Bot} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/' component={News} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;