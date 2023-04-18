import { Avatar } from '@mui/material'
import React from 'react'
import './IndividualUser.css'
function IndividualUser({
  id,
  firstName,
  lastName,
  email,
  userUrl
}) {
  return (
      <center>
    <div className='user_container'>
      <div className='userInfo'>

      <Avatar src={userUrl}/>
      <h2>{firstName} {lastName}</h2>

      </div>

      <h3>{email}</h3>

    </div>
      </center>
  )
}

export default IndividualUser
