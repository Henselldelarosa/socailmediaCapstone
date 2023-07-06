import React from 'react'
import './Following.css'

const Following = ({following}) => {
  return (
    <div className='following'>

      <li className="rightbarFriend">
        <div className="rightbarProfileContainer">
          <img
          src={following?.userUrl}
          alt=""
          className="rightbarProfileImg"
          />
          {/* <span className="rightbarOnline"></span> */}
        </div>
        <span className="rightbarUsername">{`${following.firstName}  ${following.lastName}`}</span>
      </li>
    </div>
  )
}

export default Following
