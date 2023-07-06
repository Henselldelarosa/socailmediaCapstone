import React from 'react'

import './Rightbar.css'
import RightbarProfile from '../rightbarProfile/RightbarProfile'
import RightbarHome from '../rightbarHome/RightbarHome'
const Rightbar = ({profile}) => {
  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {profile? <RightbarProfile/> : <RightbarHome/>}
      </div>
    </div>
  )
}

export default Rightbar
