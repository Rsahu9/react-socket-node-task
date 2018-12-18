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
    const auth = !!window.localStorage.getItem('isLoggedIn');
    return(
      <Router>
        <Switch>
          <PrivateRoute path='/chat' auth={auth} component={Chat} />
          <PrivateRoute path='/bot' auth={auth} component={Bot} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <PrivateRoute path='/' auth={auth} component={News} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;