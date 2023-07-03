import React, { useEffect, useState } from 'react'

import './Home.css'
import Navbar from '../../Components/navbar/Navbar'
import Sidebar from '../../Components/sidebar/Sidebar'
import Feed from '../../Components/feed/Feed'
import Rightbar from '../../Components/rightbar/Rightbar'
import { Redirect, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch } from 'react-redux'
import { authenticate } from '../../store/session'
import Login from '../login/Login'
const Home = ({user}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  let content;

  if (user){
    content = (
      <div className='home'>
      <div className="homeContainer">
        <Sidebar user={user}/>
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
