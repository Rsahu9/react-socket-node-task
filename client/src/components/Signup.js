import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { baseURL } from '../config';

class Signup extends React.Component {

  state = {
    username: '',
    email: '',
    password: '',
  } 

  handleSubmit = async () => {
    const { username, email, password } = this.state;

    const { data } = await axios.post(`${baseURL}/signup`, { username, email, password });
    
    window.localStorage.setItem('isLoggedIn', data.success);

    if (data.username && data.success) {
      window.localStorage.setItem('username', data.username);
      this.props.history.push('/');
    }
  }
  
  render(){
    return(
      <div className="container">
        <h3>Signup Page</h3>
        <form>
          <div className="form-group">
            <label htmlFor="sel1">Username</label>
            <input type="text" value={this.state.username} onChange={ (e) => this.setState({ username: e.target.value })} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <input type="email" value={this.state.email} onChange={ (e) => this.setState({ email: e.target.value })} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} className="form-control" />
          </div>
          <div>
            <button type="button" onClick={this.handleSubmit} className='btn btn-success'>Signup</button>
          </div>
          Already have an account? <Link to={'/login'}>Login</Link>
        </form>
      </div>
    );
  }
}

export default Signup;