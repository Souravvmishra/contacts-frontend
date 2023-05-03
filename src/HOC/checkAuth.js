import { Link, useNavigate } from "react-router-dom";
import React from 'react'


function isTokenValid(token) {
  const decodedToken = JSON.parse(window.atob(token.split('.')[1])); // decode the token payload

  if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
    return false; // if the token has an expiration time and it has already expired, return false
  }

  return true; // otherwise, the token is valid
}



export const checkAuth = (Component) => {
  return (props) => {
    const token = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    if (token && isTokenValid(token)) {
      return <Component {...props} />;
    } else {
      return <>
      <Link to={"/login"}>Go To Login </Link>
      </>
    }
  }
}

 