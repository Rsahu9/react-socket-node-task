import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../config';

class Login extends React.Component {

  state = {
    email: '',
    password: '',
  }

  handleSubmit = async () => {
    const { email, password } = this.state;

    const { data } = await axios.post(`${baseURL}/login`, { email, password });
    
    if (data.success && data.username) {
      window.localStorage.setItem('username', data.username);
      window.localStorage.setItem('isLoggedIn', data.success);
      this.props.history.push('/');
    }
  }
  
  render() {
    return(
      <div className="container">
        <h3>Login Page</h3>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <input type="email" onChange={ (e) => this.setState({ email: e.target.value })} className="form-control" id="email"/>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input type="password" onChange={(e) => this.setState({ password: e.target.value })} className="form-control" id="pwd"/>
          </div>
          <div>
            <button type="button" onClick={this.handleSubmit} className='btn btn-success'>Login</button>
          </div>
          Don't have an account? <Link to={'/signup'}>Signup</Link>
        </form>
      </div>
    );
  }
}

export default Login;