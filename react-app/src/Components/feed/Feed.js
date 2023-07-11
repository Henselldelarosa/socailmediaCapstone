import React from 'react'

import { useSelector } from 'react-redux'

import './Feed.css'
import Share from '../share/Share'
import Post from '../posts/Post'
const Feed = () => {
  const posts = useSelector(state => Object.values(state.posts))

  return (
    <div className='feed'>

      <div className="feedWrapper">
        <Share/>

      {posts.reverse().map((p) => {
        return(
          <Post key={p.id} post={p}/>
        )
      })}
      </div>
    </div>
  )
}

export default Feed
