import React from 'react'
import { Avatar } from '@mui/material'
function PostCard({post,postUrl,dateCreated,user}) {
  return (
    <div className='post_container'>
      {user}
      <p className='post_info'>{post}</p>
      <img className='postUrl_info' src={postUrl}/>
      <div className='created_info'>{dateCreated}</div>
    </div>
  )
}

export default PostCard
