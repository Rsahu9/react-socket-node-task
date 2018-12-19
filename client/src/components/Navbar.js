import React from 'react';

const Navbar = (props) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed">
    <span className="navbar-brand text-white">Welcome</span>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/chat">Chat with friends</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/bot">Chat with a bot</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">News Portal</a>
        </li>
        <li className="nav-item dropdown">
          <span className="nav-link dropdown-toggle" data-toggle="dropdown">Online Users</span>
          <div className="dropdown-menu">
            { props.online && props.online.map((value, index) => <span className="dropdown-item" key={index}>{value}</span> )}
          </div>
        </li>
      </ul>
      <form className='form-inline my-2 my-lg-0'>
        <button onClick={props.logout} className="btn btn-outline-danger my-2 my-sm-0" type="submit">Logout</button>
      </form>
    </div>
  </nav>
);

export default Navbar;