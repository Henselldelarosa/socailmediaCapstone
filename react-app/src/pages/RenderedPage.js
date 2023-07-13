import React from 'react'
import { useSelector } from 'react-redux'
import Home from './home/Home';
import Login from './login/Login';

const RenderedPage = ({sessionUser}) => {
  // const user = useSelector(state => state.session.user)
  let content;

  if (sessionUser){
    content = (
      <Home sessionUser = {sessionUser}/>
    )
  }else{
    content = (
      <Login/>
    )
  }
  return content
}

export default RenderedPage
