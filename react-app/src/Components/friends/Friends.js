import React from 'react'
import './Friends.css'
import { NavLink} from 'react-router-dom/cjs/react-router-dom.min'

const Friends = ({friends}) => {
  return (
    <NavLink className='link'style={{textDecoration:'none'}} to={`/profile/${friends.userId}`}>
      <li className="sidebarFriend">
        <img src={friends?.userUrl} alt="" className="sidebarFriendImg" />
        <span className="sidebarFriendName">{`${friends?.firstName} ${friends?.lastName}`}</span>
      </li>
    </NavLink>
  )
}

export default Friends
