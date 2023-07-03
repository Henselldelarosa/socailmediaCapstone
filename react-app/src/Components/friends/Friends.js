import React from 'react'
import './Friends.css'

const Friends = ({friends}) => {
  return (
    <div>
      <li className="sidebarFriend">
        <img src={friends?.userUrl} alt="" className="sidebarFriendImg" />
        <span className="sidebarFriendName">{`${friends?.firstName} ${friends?.lastName}`}</span>
      </li>
    </div>
  )
}

export default Friends
