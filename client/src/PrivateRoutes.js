import React from 'react';
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {

  const auth = !!window.localStorage.getItem('isLoggedIn');
  
  return(
    <Route
      {...rest}
      render = {(props) => auth
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login' }} />}
    />
  )
}