import React,{useContext} from 'react'

// style
import './Sidebar.css'
import { DarkModeContext } from '../../context/darkMode/darkModeContext';

// icon
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Avatar } from '@mui/material';
import { logout } from "../../store/session";

// components
import MenuLink from '../menuLink/MenuLink'
import Friends from '../friends/Friends'
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { useDispatch } from 'react-redux';
const Sidebar = ({sessionUser}) => {
  const dispatch = useDispatch()

  const {send} = useContext(DarkModeContext)
  const history = useHistory()

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/login')
  };

  return (
    <div className='sidebar'>

      <div className="sidebarWrapper">
      <NavLink style={{textDecoration:'none', color:'black'}} className='nameLink' to={`/profile/${sessionUser?.id}`} >
        <MenuLink Icon={<Avatar src={sessionUser?.userUrl}/>}text={sessionUser?.firstName}></MenuLink>
      </NavLink>

      <span onClick={() => send({type:'TOGGLE'})}>
        <MenuLink Icon={<Brightness4Icon/>} text={'Theme'}/>
      </span>

        <button style={{border:'none', backgroundColor:'transparent'}} onClick={handleLogout}>
        <MenuLink style={{textDecoration:'none'}} Icon={<ExitToAppIcon/>} text='Logout'/>
        </button>


        <hr className="sidebarHr" />

        <ul className="sidebarFriendList">
          <h3 className="followers">Followers</h3>
          {sessionUser?.followers.map((f) => {
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
