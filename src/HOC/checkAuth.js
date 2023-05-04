import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';



export function isTokenValid(token) {
  const decodedToken = JSON.parse(window.atob(token.split('.')[1])); // decode the token payload

  if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
    return false; // if the token has an expiration time and it has already expired, return false
  }

  return true; // otherwise, the token is valid
}



export const checkAuth = (Component) => {
  const token = localStorage.getItem("accessToken");
  return (props) => {
    const navigate = useNavigate()

    useEffect(() => {
      if (!token || !isTokenValid(token)) {
        navigate('/login');
      }
    });

    if (token && isTokenValid(token)) {
      return <Component {...props} />;
    } else {
      return null
    }
  }
}


