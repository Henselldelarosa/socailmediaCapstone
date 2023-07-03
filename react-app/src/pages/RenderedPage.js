import React from 'react'
import { useSelector } from 'react-redux'
import Home from './home/Home';
import Login from './login/Login';

const RenderedPage = ({user}) => {
  // const user = useSelector(state => state.session.user)
  let content;

  if (user){
    content = (
      <Home user = {user}/>
    )
  }else{
    content = (
      <Login/>
    )
  }
  return content
}

export default RenderedPage
