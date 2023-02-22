import React from 'react'
import { Avatar } from '@mui/material'
import './PostCard.css'
function PostCard({userUrl,firstName,lastName,post,postUrl,dateCreated}) {
  return (
    <div className='post'>
        <div className='post_top'>
          <Avatar className='post_avatar' src={userUrl}/>

          <div className='post_topInfo'>
            <h3>{firstName} {lastName}</h3>
            <p>{dateCreated}</p>
          </div>
      </div>

      <div className='post_bottom'>
        <p>{post}</p>
      </div>

      <div className='post_img'>
        <img src={postUrl} alt=''/>
      </div>
    </div>
  )
}

export default PostCard
