import { Avatar } from '@mui/material'
import React from 'react'
import './SingleUser.scss'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'

const SingleUser = ({
  id,
  firstName,
  lastName,
  email,
  userUrl,
  address,
  country,
  followers,
  following,
  phoneNumber,
  relationship
}) => {

  if(!address){
    address = 'N/A'
  }

  if(relationship === 'N/A'){
    relationship = 'Single'
  }

  return (
    <center>
      <NavLink className='link' to={`/profile/${id}`}>

    <div className='user_container'>
      <div className='userInfo'>

      <Avatar src={userUrl}/>
      <h2>{firstName} {lastName}</h2>

      </div>

      <h3>{email}</h3>

      <div className="singleUserInfo">
      <h5 className='singleUserInfo__address'> <p className='singleUserInfo__text'>Address:</p> {address} </h5>
      <h5 className='singleUserInfo__country'> <p className='singleUserInfo__text'>Country:</p> {country}</h5>
      <h5 className='singleUserInfo__followers'>  <p className='singleUserInfo__text'>Followers:</p> {followers.length}</h5>
      <h5 className='singleUserInfo__following'>  <p className='singleUserInfo__text'>Following:</p> {following.length}</h5>
      <h5 className='singleUserInfo__phoneNumber'><p className='singleUserInfo__text'>Phone Number:</p> {phoneNumber}</h5>
      <h5 className='singleUserInfo__relationship'><p className='singleUserInfo__text'>Relationship:</p> {relationship}</h5>
      </div>

    </div>
      </NavLink>
      </center>
  )
}

export default SingleUser
