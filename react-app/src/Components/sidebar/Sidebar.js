import React from 'react'

// style
import './Sidebar.css'

// icon
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Avatar } from '@mui/material';
import { logout } from "../../store/session";

// components
import MenuLink from '../menuLink/MenuLink'
import Friends from '../friends/Friends'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
const Sidebar = ({user}) => {
  const dispatch = useDispatch()

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <div className='sidebar'>

      <div className="sidebarWrapper">
        <MenuLink
        Icon={<NavLink className='nameLink' to={`/profile/${user.id}`} ><Avatar src={user?.userUrl}/></NavLink>}
        text=
        {
        <NavLink
        style={{color:'black'}}
        className='link'
        to={`/profile/${user.id}`}>{user?.firstName}
        </NavLink>
        }
        />
        <MenuLink Icon={<Brightness4Icon/>} text={'Theme'}/>

        <button style={{border:'none'}} onClick={handleLogout}>
        <MenuLink Icon={<ExitToAppIcon/>} text='Logout'/>
        </button>


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
