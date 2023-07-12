import React from 'react'

import './Home.css'

import Sidebar from '../../Components/sidebar/Sidebar'
import Feed from '../../Components/feed/Feed'
import Rightbar from '../../Components/rightbar/Rightbar'

import Login from '../login/Login'
const Home = ({user}) => {

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
