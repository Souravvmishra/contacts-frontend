import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';



export function isTokenValid(token) {
  if (token === null){
    return false;
  }
  const decodedToken = JSON.parse(window.atob(token.split('.')[1])); // decode the token payload

  if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
    return false; // if the token has an expiration time and it has already expired, return false
  }

  return true; // otherwise, the token is valid
}



const CheckAuth = (props) => {
  const {Component} = props
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate()

  useEffect(()=> {
    if (!isTokenValid(token)) {
      navigate("/login")
  }
})

  return (
    <div>
      <Component />
    </div>
  )
}

export default CheckAuth


 