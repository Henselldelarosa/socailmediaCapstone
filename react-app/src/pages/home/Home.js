import React from 'react'

import './Home.css'

import Sidebar from '../../Components/sidebar/Sidebar'
import Feed from '../../Components/feed/Feed'
import Rightbar from '../../Components/rightbar/Rightbar'

import Login from '../login/Login'
import { useSelector } from 'react-redux'
const Home = ({sessionUser}) => {


  let content;

  if (sessionUser){
    content = (
      <div className='home'>
      <div className="homeContainer">
        <Sidebar sessionUser={sessionUser}/>
        <Feed/>
        <Rightbar/>
      </div>
    </div>
    )
  }else{
    content = (
      <Login/>
    )
  }

  return  (content)

}

export default Home
