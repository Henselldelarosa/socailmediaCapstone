import React from 'react'

// style
import './Sidebar.css'

// icon
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Avatar } from '@mui/material';

// components
import MenuLink from '../menuLink/MenuLink'
import Friends from '../friends/Friends'
const Sidebar = ({user}) => {
  console.log(user)
  return (
    <div className='sidebar'>

      <div className="sidebarWrapper">
        <MenuLink Icon={<Avatar src={user?.userUrl}/>} text={user?.firstName}/>
        <MenuLink Icon={<Brightness4Icon/>} text={'Theme'}/>
        <MenuLink Icon={<ExitToAppIcon/>} text='Logout'/>


        <hr className="sidebarHr" />

        <ul className="sidebarFriendList">
          <h3 className="followers">Followers</h3>
          {user?.followers.map((f) => {
            return(
              <Friends key={f.id} friends={f}/>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
