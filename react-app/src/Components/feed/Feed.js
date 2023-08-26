import React, {useEffect} from 'react'

import { useSelector } from 'react-redux'

import './Feed.scss'
import Share from '../share/Share'
import Post from '../posts/Post'
import Replies from '../replies/Replies'
const Feed = () => {
  const posts = useSelector(state => Object.values(state.posts))
  const replies = useSelector(state => Object.values(state.replies))

  return (
    <div className='feed'>

      <div className="feedWrapper">
        <Share/>

      {posts.reverse().map((post) => {
        return(
          <div key={post.id}>
            <Post
            id={post.id}
            userId={post?.userId}
            post={post?.post}
            postUrl={post?.postUrl}
            userUrl={post?.user.userUrl}
            firstName={post?.user.firstName}
            lastName={post?.user.lastName}
            dateCreated={post?.dateCreated}
            />
          </div>
          )
      })}
      </div>
    </div>
  )
}

export default Feed
