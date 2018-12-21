import React,{ Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import News from './components/News';
import Chat from './components/Chat';
import Bot from './components/Bot';
import { PrivateRoute } from './PrivateRoutes';

class Routes extends Component {
  render() {
    return(
      <Router>
        <Switch>
          <PrivateRoute path='/chat' component={Chat} />
          <PrivateRoute path='/bot' component={Bot} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <PrivateRoute exact path='/' component={News} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;